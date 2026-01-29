import cors from "cors";
import express from "express";
import { salaryInputSchema } from "./schemas/salaryInput";
import { calculateNetSalary } from "./services/calculateNetSalary";

export const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/salary/calculate", (req, res) => {
  const parseResult = salaryInputSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input data",
      issues: parseResult.error.issues,
    });
  }

  const result = calculateNetSalary(parseResult.data);
  return res.status(200).json(result);
});
