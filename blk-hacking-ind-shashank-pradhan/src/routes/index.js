import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import { Router } from "express";
import { parseTransactionsHandler } from "../controllers/transaction.controller";
import { validateTransactionsHandler } from "../controllers/validator.controller";
import { filterTransactionsHandler } from "../controllers/filter.controller";
const returnsController = __require("../controllers/returns.controller");
const performanceController = __require("../controllers/performance.controller");
import { performanceHandler } from "../controllers/performance.controller";
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
//# sourceMappingURL=index.js.map