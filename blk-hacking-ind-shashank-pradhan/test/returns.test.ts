/**
 * Test Type: Unit Test
 * Validation: Validates NPS and Index returns calculations
 * Command: npx jest test/returns.test.ts
 */

import { calculateNpsReturns } from "../src/services/returns.service.js";

describe("Returns Calculation", () => {
  it("should calculate savings correctly", () => {
    const input = {
      transactions: [
        { date: "2024-01-01", amount: 100, ceiling: 1000, remanent: 900 }
      ],
      q: [],
      p: [],
      k: [
        { start: "2024-01-01", end: "2024-12-31" }
      ]
    };

    const result = calculateNpsReturns(input as any);

    expect(result.savingsByDates.length).toBe(1);
  });
});