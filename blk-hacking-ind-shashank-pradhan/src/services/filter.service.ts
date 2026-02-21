// services/filter.service.ts

import { Transaction } from "../models/transaction.js";
import { QPeriod, PPeriod, KPeriod } from "../models/period.js";
import { toMillis } from "../utils/time.js";

function lowerBound(arr: number[], target: number): number {
  let l = 0;
  let r = arr.length;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (arr[mid] < target) l = mid + 1;
    else r = mid;
  }
  return l;
}

function upperBound(arr: number[], target: number): number {
  let l = 0;
  let r = arr.length;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (arr[mid] <= target) l = mid + 1;
    else r = mid;
  }
  return l - 1;
}

export function applyTemporalRules(
  transactions: Transaction[],
  q: QPeriod[],
  p: PPeriod[],
  k: KPeriod[]
) {
  // ---- Normalize transactions ----
  const txs = transactions.map(tx => ({
    ...tx,
    time: toMillis(tx.date)
  }));

  txs.sort((a, b) => a.time - b.time);

  // ---- Normalize periods ----
  const qPeriods = q.map(qp => ({
    fixed: qp.fixed,
    start: toMillis(qp.start),
    end: toMillis(qp.end)
  }));

  const pPeriods = p.map(pp => ({
    extra: pp.extra,
    start: toMillis(pp.start),
    end: toMillis(pp.end)
  }));

  const kPeriods = k.map(kp => ({
    start: toMillis(kp.start),
    end: toMillis(kp.end)
  }));

  // ---- Sort Q by start DESC for latest-start priority ----
  qPeriods.sort((a, b) => b.start - a.start);

  // ---- Build P sweep events ----
  const pEvents: { time: number; delta: number }[] = [];

  for (const pp of pPeriods) {
    pEvents.push({ time: pp.start, delta: pp.extra });
    pEvents.push({ time: pp.end + 1, delta: -pp.extra });
  }

  pEvents.sort((a, b) => a.time - b.time);

  let eventIndex = 0;
  let currentExtra = 0;

  const remanents: number[] = [];

  // ---- Process transactions in sorted order ----
  for (const tx of txs) {
    const txTime = tx.time;

    // Apply P sweep
    while (
      eventIndex < pEvents.length &&
      pEvents[eventIndex].time <= txTime
    ) {
      currentExtra += pEvents[eventIndex].delta;
      eventIndex++;
    }

    // Apply Q override (latest start wins)
    let rem = tx.remanent;
    for (const qp of qPeriods) {
      if (txTime >= qp.start && txTime <= qp.end) {
        rem = qp.fixed;
        break;
      }
    }

    rem += currentExtra;
    remanents.push(rem);
  }

  // ---- Prefix sum for K grouping ----
  const prefix: number[] = new Array(remanents.length);
  prefix[0] = remanents[0] ?? 0;

  for (let i = 1; i < remanents.length; i++) {
    prefix[i] = prefix[i - 1] + remanents[i];
  }

  const times = txs.map(tx => tx.time);

  // ---- Compute K results using binary search ----
  const results = kPeriods.map(kp => {
    const left = lowerBound(times, kp.start);
    const right = upperBound(times, kp.end);

    if (left > right || left >= times.length || right < 0) {
      return {
        start: new Date(kp.start).toISOString(),
        end: new Date(kp.end).toISOString(),
        amount: 0
      };
    }

    const amount =
      prefix[right] - (left > 0 ? prefix[left - 1] : 0);

    return {
      start: new Date(kp.start).toISOString(),
      end: new Date(kp.end).toISOString(),
      amount
    };
  });

  return results;
}