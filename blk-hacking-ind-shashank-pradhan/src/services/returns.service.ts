import { ReturnsInput } from "../models/returns.js";
import { isWithinRange } from "../utils/date.js";
import {
  compoundInterest,
  adjustForInflation,
  calculateNpsTaxBenefit,
} from "../utils/finance.js";

export function calculateNpsReturns(input: ReturnsInput) {
  const { age, wage, inflation, transactions, q, p, k } = input;

  const annualIncome = wage * 12;
  const years = age < 60 ? 60 - age : 5;
  const rate = 0.0711;

  const updatedTransactions = transactions.map((tx) => {
    let remanent = tx.remanent;

    // Apply q (latest start wins)
    const matchingQ = q
      .filter((period) =>
        isWithinRange(tx.date, period.start, period.end)
      )
      .sort(
        (a, b) =>
          new Date(b.start).getTime() -
          new Date(a.start).getTime()
      );

    if (matchingQ.length > 0) {
      remanent = matchingQ[0].fixed ?? remanent;
    }

    // Apply p (add all)
    p.forEach((period) => {
      if (
        isWithinRange(tx.date, period.start, period.end)
      ) {
        remanent += period.extra ?? 0;
      }
    });

    return { ...tx, remanent };
  });

  const transactionsTotalAmount = updatedTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const transactionsTotalCeiling = updatedTransactions.reduce(
    (sum, t) => sum + t.ceiling,
    0
  );

  const savingsByDates = k.map((period) => {
    const total = updatedTransactions
      .filter((tx) =>
        isWithinRange(tx.date, period.start, period.end)
      )
      .reduce((sum, tx) => sum + tx.remanent, 0);

    const future = compoundInterest(total, rate, years);
    const real = adjustForInflation(
      future,
      inflation,
      years
    );

    const taxBenefit = calculateNpsTaxBenefit(
      total,
      annualIncome
    );

    return {
      start: period.start,
      end: period.end,
      amount: total,
      profits: Number((real - total).toFixed(2)),
      taxBenefit: Number(taxBenefit.toFixed(2)),
    };
  });

  return {
    transactionsTotalAmount,
    transactionsTotalCeiling,
    savingsByDates,
  };
}


export function calculateIndexReturns(input: ReturnsInput) {
  const { age, wage, inflation, transactions, q, p, k } = input;

  const years = age < 60 ? 60 - age : 5;
  const rate = 0.1449;

  const updatedTransactions = transactions.map((tx) => {
    let remanent = tx.remanent;

    // Apply q (latest start wins)
    const matchingQ = q
      .filter((period) =>
        isWithinRange(tx.date, period.start, period.end)
      )
      .sort(
        (a, b) =>
          new Date(b.start).getTime() -
          new Date(a.start).getTime()
      );

    if (matchingQ.length > 0) {
      remanent = matchingQ[0].fixed ?? remanent;
    }

    // Apply p (add all)
    p.forEach((period) => {
      if (
        isWithinRange(tx.date, period.start, period.end)
      ) {
        remanent += period.extra ?? 0;
      }
    });

    return { ...tx, remanent };
  });

  const transactionsTotalAmount = updatedTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const transactionsTotalCeiling = updatedTransactions.reduce(
    (sum, t) => sum + t.ceiling,
    0
  );

  const savingsByDates = k.map((period) => {
    const total = updatedTransactions
      .filter((tx) =>
        isWithinRange(tx.date, period.start, period.end)
      )
      .reduce((sum, tx) => sum + tx.remanent, 0);

    const future = compoundInterest(total, rate, years);
    const real = adjustForInflation(
      future,
      inflation,
      years
    );

    return {
      start: period.start,
      end: period.end,
      amount: total,
      profits: Number((real - total).toFixed(2)),
      taxBenefit: 0,
    };
  });

  return {
    transactionsTotalAmount,
    transactionsTotalCeiling,
    savingsByDates,
  };
}