// controllers/filter.controller.ts

import { Request, Response } from "express";
import { applyTemporalRules } from "../services/filter.service.js";

export function filterTransactionsHandler(req: Request, res: Response) {
  try {
    const { transactions, q = [], p = [], k = [] } = req.body;

    const result = applyTemporalRules(transactions, q, p, k);

    res.json({ savingsByDates: result });

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}