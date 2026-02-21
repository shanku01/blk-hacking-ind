/**
 * Test Type: Unit Test
 * Validation: Ensures invalid transactions are detected
 * Command: npx jest test/validator.test.ts
 */

import { validateTransactions } from "../src/services/validator.service.js";

describe("Transaction Validator", () => {
  it("should detect negative remanent", () => {
    const transactions = [
      {
        date: "2024-01-01",
        amount: 1200,
        ceiling: 1000,
        remanent: -200
      }
    ];

    const result = validateTransactions(1000, transactions);

    expect(result.invalidTransactions.length).toBeGreaterThan(0);
  });
});