import express from "express";
import routes from "./routes";
const app = express();
app.use(express.json());
app.use("/blackrock/challenge/v1", routes);
export default app;
//# sourceMappingURL=app.js.map