import { Request, Response } from "express";
import { validateTransactions } from "../services/validator.service.js";

export function validateTransactionsHandler(req: Request, res: Response) {
  try {
    const { wage, transactions } = req.body;

    const result = validateTransactions(wage, transactions);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}