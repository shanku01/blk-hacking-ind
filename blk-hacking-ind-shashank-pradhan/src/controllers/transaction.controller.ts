import { Request, Response } from "express";
import { parseTransactions } from "../services/transaction.service.js";

export function parseTransactionsHandler(req: Request, res: Response) {
  try {
    const { expenses } = req.body;

    const result = parseTransactions(expenses);

    const totals = result.reduce(
      (acc, tx) => {
        acc.totalAmount += tx.amount;
        acc.totalCeiling += tx.ceiling;
        acc.totalRemanent += tx.remanent;
        return acc;
      },
      { totalAmount: 0, totalCeiling: 0, totalRemanent: 0 }
    );

    res.json({
      transactions: result,
      ...totals,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
}