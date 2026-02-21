import { Request, Response } from "express";
import { calculateNpsReturns,calculateIndexReturns } from "../services/returns.service.js";

export function calculateNpsReturnsHandler(req: Request, res: Response) {
  try {
    const result = calculateNpsReturns(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export function calculateIndexReturnsHandler(
  req: Request,
  res: Response
) {
  try {
    const result = calculateIndexReturns(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}