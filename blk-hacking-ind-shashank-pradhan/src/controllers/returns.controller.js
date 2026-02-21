import { Request, Response } from "express";
import { calculateNpsReturns, calculateIndexReturns } from "../services/returns.service";
export function calculateNpsReturnsHandler(req, res) {
    try {
        const result = calculateNpsReturns(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export function calculateIndexReturnsHandler(req, res) {
    try {
        const result = calculateIndexReturns(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=returns.controller.js.map