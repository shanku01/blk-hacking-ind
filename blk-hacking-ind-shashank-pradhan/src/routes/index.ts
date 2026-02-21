import { Router } from "express";
import { parseTransactionsHandler } from "../controllers/transaction.controller.js";
import { validateTransactionsHandler } from "../controllers/validator.controller.js";
import { filterTransactionsHandler } from "../controllers/filter.controller.js";
import returnsController = require("../controllers/returns.controller.js");
import performanceController = require("../controllers/performance.controller.js");
import {performanceHandler} from "../controllers/performance.controller.js";

const router = Router();

router.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

router.post("/transactions/parse", parseTransactionsHandler);
router.post("/transactions/validate", validateTransactionsHandler);
router.post("/transactions/filter", filterTransactionsHandler);
router.post("/returns/calculate-nps", returnsController.calculateNpsReturnsHandler);
router.post("/returns/calculate-index", returnsController.calculateIndexReturnsHandler);
router.get("/performance", performanceHandler);

export default router;