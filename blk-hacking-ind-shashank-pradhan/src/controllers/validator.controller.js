import { Request, Response } from "express";
import { validateTransactions } from "../services/validator.service";
export function validateTransactionsHandler(req, res) {
    try {
        const { wage, transactions } = req.body;
        const result = validateTransactions(wage, transactions);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=validator.controller.js.map