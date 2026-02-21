/**
 * Test Type: Integration Test
 * Validation: Ensure /health endpoint returns 200 and status OK
 * Command: npm test
 */

import request from "supertest";
import app from "../src/app.js"; // make sure app is exported

describe("Health Endpoint - Integration Test", () => {
  it("GET /health should return status OK", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});