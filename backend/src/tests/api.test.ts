// API integration test for the salary endpoint.
import request from "supertest";
import { app } from "../app";

/**
 * Integration test for the salary calculation API.
 */

describe("POST /api/v1/salary/calculate", () => {
  it("returns calculation result with breakdown", async () => {
    // Send a valid request payload.
    const response = await request(app)
      .post("/api/v1/salary/calculate")
      .send({
        year: 2025,
        grossAmount: 5000,
        period: "monthly",
        taxClass: 1,
        federalState: "BE",
        churchMember: false,
        childrenCount: 0,
        annualAllowance: 0,
        healthInsuranceType: "statutory",
        healthInsuranceRate: 8.7,
        pensionRegion: "West",
      });

    // Expect the API to return a result with deductions.
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("net");
    expect(response.body).toHaveProperty("breakdown");
    expect(response.body.breakdown).toHaveProperty("incomeTax");
  });
});
