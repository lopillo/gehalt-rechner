import { z } from "zod";

/**
 * Legacy schema definitions kept for documentation and reference.
 * These mirror the current API contract used by the backend.
 */
export const SalaryInputSchema = z
  .object({
    year: z.number().int(),
    grossAmount: z.number().positive(),
    period: z.enum(["monthly", "yearly"]),
    taxClass: z.number().int().min(1).max(6),
    federalState: z.string(), // e.g. "BW", "BY", etc.
    churchMember: z.boolean(),
    childrenCount: z.number().int().min(0),
    healthInsuranceType: z.enum(["statutory", "private"]),
    healthInsuranceRate: z.number().optional(),
    pensionRegion: z.enum(["West", "East", "None"]),
  })
  .superRefine((values, ctx) => {
    if (values.healthInsuranceType === "private" && !values.healthInsuranceRate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Private health insurance requires a rate percentage.",
        path: ["healthInsuranceRate"],
      });
    }
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
    solidarityTax: z.number(),
    healthInsurance: z.number(),
    pensionInsurance: z.number(),
    unemploymentInsurance: z.number(),
    nursingCareInsurance: z.number(),
  }),
});

export type SalaryResult = z.infer<typeof SalaryResultSchema>;
