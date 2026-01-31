// Zod schema definitions for input/output validation.
import { z } from "zod";

/**
 * Validates incoming salary calculator payloads.
 * Enforces required fields and basic constraints for API safety.
 */
// Base schema for the incoming salary request payload.
export const salaryInputSchema = z.object({
  year: z.number().int().min(2000).max(2100),
  grossAmount: z.number().positive(),
  period: z.enum(["monthly", "yearly"]),
  taxClass: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
  federalState: z.enum([
    "BW",
    "BY",
    "BE",
    "BB",
    "HB",
    "HH",
    "HE",
    "MV",
    "NI",
    "NW",
    "RP",
    "SL",
    "SN",
    "ST",
    "SH",
    "TH",
  ]),
  churchMember: z.boolean(),
  childrenCount: z.number().int().min(0),
  annualAllowance: z.number().min(0).optional(),
  healthInsuranceType: z.enum(["statutory", "private"]),
  healthInsuranceRate: z.number().min(0).max(20).optional(),
  pensionRegion: z.enum(["West", "East", "None"]),
  // Add extra validation that depends on multiple fields.
}).superRefine((values, ctx) => {
  if (values.healthInsuranceType === "private" && !values.healthInsuranceRate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Private health insurance requires a rate percentage.",
      path: ["healthInsuranceRate"],
    });
  }
});

// TypeScript type inferred from the input schema.
export type SalaryInput = z.infer<typeof salaryInputSchema>;

/**
 * Shape of the result returned to the frontend.
 */
// Schema for the response object returned to the client.
export const SalaryResultSchema = z.object({
  net: z.number(),
  breakdown: z.object({
    incomeTax: z.number(),
    churchTax: z.number(),
    solidarityTax: z.number(),
    healthInsurance: z.number(),
    pensionInsurance: z.number(),
    unemploymentInsurance: z.number(),
    nursingCareInsurance: z.number(),
  }),
});

// TypeScript type inferred from the result schema.
export type SalaryResult = z.infer<typeof SalaryResultSchema>;
