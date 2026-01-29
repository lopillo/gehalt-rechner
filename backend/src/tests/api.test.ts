import request from "supertest";
import { app } from "../app";

describe("POST /api/v1/salary/calculate", () => {
  it("returns calculation result with breakdown", async () => {
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
        healthInsuranceRate: 7.3,
        pensionRegion: "West",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("net");
    expect(response.body).toHaveProperty("breakdown");
    expect(response.body.breakdown).toHaveProperty("incomeTax");
  });
});
