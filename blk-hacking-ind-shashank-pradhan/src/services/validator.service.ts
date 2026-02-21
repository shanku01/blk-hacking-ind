import { Transaction } from "../models/transaction.js";
import { InvalidTransaction } from "../models/validator.js";
import { isValidTimestamp } from "../utils/date.js";

export function validateTransactions(
  wage: number,
  transactions: Transaction[]
) {
  if (!Array.isArray(transactions)) {
    throw new Error("transactions must be an array");
  }

  if (typeof wage !== "number" || wage <= 0) {
    throw new Error("Invalid wage value");
  }

  const valid: Transaction[] = [];
  const invalid: InvalidTransaction[] = [];
  const seenDates = new Set<string>();

  for (const tx of transactions) {
    const errors: string[] = [];

    if (!tx || typeof tx !== "object") {
      continue;
    }

    if (seenDates.has(tx.date)) {
      errors.push("Duplicate transaction timestamp");
    } else {
      seenDates.add(tx.date);
    }

    if (!isValidTimestamp(tx.date)) {
      errors.push("Invalid timestamp format");
    }

    if (
      typeof tx.amount !== "number" ||
      typeof tx.ceiling !== "number" ||
      typeof tx.remanent !== "number"
    ) {
      errors.push("Invalid numeric fields");
    }

    if (tx.ceiling < tx.amount) {
      errors.push("Ceiling cannot be less than amount");
    }

    if (tx.remanent !== tx.ceiling - tx.amount) {
      errors.push("Invalid remanent calculation");
    }

    if (tx.remanent < 0 || tx.remanent > 100) {
      errors.push("Remanent must be between 0 and 100");
    }

    if (errors.length > 0) {
      invalid.push({ ...tx, message: errors.join(", ") });
    } else {
      valid.push(tx);
    }
  }

  return { valid, invalid };
}