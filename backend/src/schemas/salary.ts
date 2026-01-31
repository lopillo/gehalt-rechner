import { z } from "zod";
import { salaryInputSchema } from "./salaryInput";

/**
 * Re-export the centralized salary input schema for documentation and usage.
 */
export { salaryInputSchema };
export type SalaryInput = z.infer<typeof salaryInputSchema>;

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
