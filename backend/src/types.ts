/**
 * Shared backend types for the salary calculator.
 * These types define the API contract used by the backend services.
 */
// Defines whether the salary is monthly or yearly.
export type SalaryPeriod = "monthly" | "yearly";

// Defines the pension region used for insurance rules.
export type PensionRegion = "West" | "East" | "None";

// Short codes for German federal states.
export type FederalState =
  | "BW"
  | "BY"
  | "BE"
  | "BB"
  | "HB"
  | "HH"
  | "HE"
  | "MV"
  | "NI"
  | "NW"
  | "RP"
  | "SL"
  | "SN"
  | "ST"
  | "SH"
  | "TH";

// Payload sent from the frontend for the calculation.
export interface SalaryInput {
  year: number;
  grossAmount: number;
  period: SalaryPeriod;
  taxClass: 1 | 2 | 3 | 4 | 5 | 6;
  federalState: FederalState;
  churchMember: boolean;
  childrenCount: number;
  annualAllowance?: number | undefined;
  healthInsuranceType: "statutory" | "private";
  healthInsuranceRate?: number | undefined;
  pensionRegion: PensionRegion;
}

// Detailed monthly/yearly deduction values.
export interface SalaryBreakdown {
  incomeTax: number;
  churchTax: number;
  solidarityTax: number;
  healthInsurance: number;
  pensionInsurance: number;
  unemploymentInsurance: number;
  nursingCareInsurance: number;
}

// Response object returned by the backend calculator.
export interface SalaryResult {
  net: number;
  breakdown: SalaryBreakdown;
}
