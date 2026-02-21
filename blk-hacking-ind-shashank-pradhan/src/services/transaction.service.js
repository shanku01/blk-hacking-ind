import { ExpenseInput, Transaction } from "../models/transaction";
import { calculateCeiling, calculateRemanent } from "../utils/math";
import { isValidTimestamp } from "../utils/date";
export function parseTransactions(expenses) {
    if (!Array.isArray(expenses)) {
        throw new Error("Input must be an array of expenses");
    }
    const seenDates = new Set();
    return expenses.map((expense) => {
        const { date, amount } = expense;
        // Validate date format
        if (!isValidTimestamp(date)) {
            throw new Error(`Invalid timestamp format: ${date}`);
        }
        // Unique timestamp check
        if (seenDates.has(date)) {
            throw new Error(`Duplicate timestamp found: ${date}`);
        }
        seenDates.add(date);
        // Validate amount
        if (typeof amount !== "number" || amount < 0 || amount >= 500000) {
            throw new Error(`Invalid amount: ${amount}`);
        }
        const ceiling = calculateCeiling(amount);
        const remanent = calculateRemanent(amount);
        return {
            date,
            amount,
            ceiling,
            remanent,
        };
    });
}
//# sourceMappingURL=transaction.service.js.map