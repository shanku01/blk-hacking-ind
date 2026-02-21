/**
 * Test Type: Unit Test
 * Validation: Applies q, p, k temporal rules correctly
 * Command: npx jest test/filter.test.ts
 */

import { applyTemporalRules } from "../src/services/filter.service.js";

describe("Temporal Filter Rules", () => {
  it("should apply q override and p addition", () => {
    const transactions = [
      {
        date: "2024-01-01",
        remanent: 500
      }
    ];

    const q = [
      { start: "2024-01-01", end: "2024-12-31", fixed: 300 }
    ];

    const p = [
      { start: "2024-01-01", end: "2024-12-31", extra: 100 }
    ];

    const k = [
      { start: "2024-01-01", end: "2024-12-31" }
    ];

    const result = applyTemporalRules(transactions as any, q as any, p as any, k as any);

    expect(result[0].amount).toBe(400); // 300 + 100
  });
});