/**
 * Test Type: Integration Test
 * Validation: Ensures performance endpoint responds with metrics
 * Command: npx jest test/performance.test.ts
 */

import request from "supertest";
import app from "../src/app.js";

describe("Performance Endpoint", () => {
  it("should return time, memory and threads", async () => {
    const res = await request(app).get("/performance");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("time");
    expect(res.body).toHaveProperty("memory");
    expect(res.body).toHaveProperty("threads");
  });
});