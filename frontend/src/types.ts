/**
 * Shared frontend types for the salary calculator UI.
 */
// Defines whether the salary is monthly or yearly.
export type SalaryPeriod = "monthly" | "yearly";
// Region for pension calculations.
export type PensionRegion = "West" | "East" | "None";
// Insurance type selected by the user.
export type HealthInsuranceType = "statutory" | "private";
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

// Payload the frontend sends to the backend.
export interface SalaryInput {
  year: number;
  grossAmount: number;
  period: SalaryPeriod;
  taxClass: 1 | 2 | 3 | 4 | 5 | 6;
  federalState: FederalState;
  churchMember: boolean;
  childrenCount: number;
  annualAllowance?: number;
  healthInsuranceType: HealthInsuranceType;
  healthInsuranceRate?: number;
  pensionRegion: PensionRegion;
}

// Detailed deduction values returned from the backend.
export interface SalaryBreakdown {
  incomeTax: number;
  churchTax: number;
  solidarityTax: number;
  healthInsurance: number;
  pensionInsurance: number;
  unemploymentInsurance: number;
  nursingCareInsurance: number;
}

// Result object displayed in the UI.
export interface SalaryResult {
  net: number;
  breakdown: SalaryBreakdown;
}
