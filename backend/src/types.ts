/**
 * Shared backend types for the salary calculator.
 * These types define the API contract used by the backend services.
 */
export type SalaryPeriod = "monthly" | "yearly";

export type PensionRegion = "West" | "East" | "None";

export type HealthInsuranceType = "statutory" | "private";

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

export interface SalaryInput {
  year: number;
  grossAmount: number;
  period: SalaryPeriod;
  taxClass: 1 | 2 | 3 | 4 | 5 | 6;
  federalState: FederalState;
  churchMember: boolean;
  childrenCount: number;
  annualAllowance?: number | undefined;
  healthInsuranceType: HealthInsuranceType;
  healthInsuranceRate?: number | undefined;
  pensionRegion: PensionRegion;
}

export interface SalaryBreakdown {
  incomeTax: number;
  churchTax: number;
  solidarityTax: number;
  healthInsurance: number;
  pensionInsurance: number;
  unemploymentInsurance: number;
  nursingCareInsurance: number;
}

export interface SalaryResult {
  net: number;
  breakdown: SalaryBreakdown;
}
