import { z } from "zod";

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
  healthInsuranceRate: z.number().min(0).max(20),
  pensionRegion: z.enum(["West", "East", "None"]),
});

export type SalaryInputSchema = z.infer<typeof salaryInputSchema>;
