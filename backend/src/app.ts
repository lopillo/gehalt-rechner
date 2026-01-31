import cors from "cors";
import express from "express";
import { salaryInputSchema } from "./schemas/salaryInput";
import { calculateNetSalary } from "./services/calculateNetSalary";

export const app = express();

// Basic middleware to allow requests and read JSON bodies.
app.use(cors());
app.use(express.json());

// Main endpoint: validate input, calculate salary, and return the result.
app.post("/api/v1/salary/calculate", (req, res) => {
  const parseResult = salaryInputSchema.safeParse(req.body);

  if (!parseResult.success) {
    // If validation fails, send a 400 with details to help the client.
    return res.status(400).json({
      message: "Invalid input data",
      issues: parseResult.error.issues,
    });
  }

  // Run the simplified salary calculation and return the numbers.
  const result = calculateNetSalary(parseResult.data);
  return res.status(200).json(result);
});

// Health endpoint for uptime checks and e2e test bootstrapping.
app.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});
