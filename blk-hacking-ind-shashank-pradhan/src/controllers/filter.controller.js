// controllers/filter.controller.ts
import { Request, Response } from "express";
import { applyTemporalRules } from "../services/filter.service";
export function filterTransactionsHandler(req, res) {
    try {
        const { transactions, q = [], p = [], k = [] } = req.body;
        const result = applyTemporalRules(transactions, q, p, k);
        res.json({ savingsByDates: result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=filter.controller.js.map