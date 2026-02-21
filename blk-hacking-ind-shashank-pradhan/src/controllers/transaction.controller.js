import { Request, Response } from "express";
import { parseTransactions } from "../services/transaction.service";
export function parseTransactionsHandler(req, res) {
    try {
        const { expenses } = req.body;
        const result = parseTransactions(expenses);
        const totals = result.reduce((acc, tx) => {
            acc.totalAmount += tx.amount;
            acc.totalCeiling += tx.ceiling;
            acc.totalRemanent += tx.remanent;
            return acc;
        }, { totalAmount: 0, totalCeiling: 0, totalRemanent: 0 });
        res.json({
            transactions: result,
            ...totals,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}
//# sourceMappingURL=transaction.controller.js.map