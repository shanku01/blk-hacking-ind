/**
 * Test Type: Integration Test
 * Validation: Validates parsing of transactions and remanent calculation
 * Command: npx jest test/transactions.test.ts
 */

import request from "supertest";
import app from "../src/app.js";

describe("Transactions Parse", () => {
  it("should parse transactions correctly", async () => {
    const payload = {
      wage: 1000,
      expenses: [
        { date: "2024-01-01", amount: 200 }
      ]
    };

    const res = await request(app)
      .post("/transactions/parse")
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.transactions.length).toBe(1);
    expect(res.body.transactions[0].remanent).toBe(800);
  });
});