// src/schemas/salary.ts
import { z } from "zod";

/**
 * Shape of the data coming from the frontend form.
 */
export const SalaryInputSchema = z.object({
  year: z.number().int(),
  grossAmount: z.number().positive(),
  period: z.enum(["monthly", "yearly"]),
  taxClass: z.number().int().min(1).max(6),
  federalState: z.string(),              // e.g. "BW", "BY", etc.
  churchMember: z.boolean(),
  childrenCount: z.number().int().min(0),
  healthInsuranceRate: z.number(),       // e.g. 0.146
  pensionRegion: z.enum(["West", "East", "None"])
});

export type SalaryInput = z.infer<typeof SalaryInputSchema>;

/**
 * Shape of the result returned to the frontend.
 */
export const SalaryResultSchema = z.object({
  net: z.number(),
  breakdown: z.object({
    incomeTax: z.number(),
    churchTax: z.number(),
    solidaritySurcharge: z.number(),
    healthInsurance: z.number(),
    pensionInsurance: z.number(),
    unemploymentInsurance: z.number(),
    nursingCareInsurance: z.number()
  })
});

export type SalaryResult = z.infer<typeof SalaryResultSchema>;
