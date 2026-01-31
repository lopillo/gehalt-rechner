// Core calculation logic for net salary and deductions.
import { SalaryInput, SalaryResult } from "../types";

/**
 * Salary calculation utilities and rules for the backend service.
 * The logic aims to mimic German payroll rules but remains simplified.
 */

// Fixed values and rates used in the simplified model.
const STATUTORY_HEALTH_RATE = 8.7;
const STANDARD_EMPLOYEE_ALLOWANCE = 1230;
const STANDARD_SPECIAL_EXPENSE_ALLOWANCE = 36;
const SINGLE_PARENT_ALLOWANCE = 4260;
const NURSING_CARE_BASE_RATE = 1.7;
const NURSING_CARE_CHILDLESS_SURCHARGE = 0.35;
const UNEMPLOYMENT_RATE = 1.3;
const PENSION_RATE = 9.3;
const SOLIDARITY_RATE = 0.055;

// Tax bracket configuration for a specific year.
type TaxYearConfig = {
  basicAllowance: number;
  bracketEnd1: number;
  bracketEnd2: number;
  bracketEnd3: number;
  zone1Factor: number;
  zone1Offset: number;
  zone2Factor: number;
  zone2Offset: number;
  zone2OffsetValue: number;
  zone3Factor: number;
  zone3Offset: number;
  solidarityFreeLimit: number;
  contributionCapHealth: number;
  contributionCapPensionWest: number;
  contributionCapPensionEast: number;
};

// Lookup table for yearly tax configuration.
const taxYearConfig: Record<number, TaxYearConfig> = {
  2025: {
    basicAllowance: 11604,
    bracketEnd1: 17005,
    bracketEnd2: 66760,
    bracketEnd3: 277825,
    zone1Factor: 979.18,
    zone1Offset: 1400,
    zone2Factor: 192.59,
    zone2Offset: 2397,
    zone2OffsetValue: 1025.38,
    zone3Factor: 0.42,
    zone3Offset: 10602.13,
    solidarityFreeLimit: 18130,
    contributionCapHealth: 62100,
    contributionCapPensionWest: 90600,
    contributionCapPensionEast: 89400,
  },
};

// Pick the config for the requested year or fall back to 2025.
const getTaxConfig = (year: number): TaxYearConfig => {
  const fallbackConfig =
    taxYearConfig[2025] ?? (() => {
      throw new Error("Missing tax configuration for 2025.");
    })();
  return taxYearConfig[year] ?? fallbackConfig;
};

// Round to two decimal places for currency output.
const roundCurrency = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

// Tax class settings used for income tax adjustments.
const taxClassConfig: Record<
  SalaryInput["taxClass"],
  { allowanceAdjustment: number; multiplier: number; useSplitting: boolean }
> = {
  1: { allowanceAdjustment: 0, multiplier: 1, useSplitting: false },
  2: {
    allowanceAdjustment: SINGLE_PARENT_ALLOWANCE,
    multiplier: 1,
    useSplitting: false,
  },
  3: { allowanceAdjustment: 0, multiplier: 1, useSplitting: true },
  4: { allowanceAdjustment: 0, multiplier: 1, useSplitting: false },
  5: { allowanceAdjustment: 0, multiplier: 1.3, useSplitting: false },
  6: { allowanceAdjustment: 0, multiplier: 1.35, useSplitting: false },
};

/**
 * Returns the church tax rate based on the selected federal state.
 * BY and BW use 8%, all other states use 9%.
 */
const getChurchTaxRate = (federalState: SalaryInput["federalState"]) =>
  federalState === "BY" || federalState === "BW" ? 0.08 : 0.09;

/**
 * Returns the pension insurance rate.
 * "None" disables pension insurance.
 */
const getPensionRate = (region: SalaryInput["pensionRegion"]) =>
  region === "None" ? 0 : PENSION_RATE;

// Return yearly contribution caps for health and pension/unemployment.
const getContributionCap = (input: SalaryInput, config: TaxYearConfig) => {
  const pensionCap =
    input.pensionRegion === "East"
      ? config.contributionCapPensionEast
      : config.contributionCapPensionWest;

  return {
    health: config.contributionCapHealth,
    pension: pensionCap,
    unemployment: pensionCap,
  };
};

// Nursing care rate depends on whether there are children.
const getNursingCareRate = (childrenCount: number) =>
  childrenCount > 0
    ? NURSING_CARE_BASE_RATE
    : NURSING_CARE_BASE_RATE + NURSING_CARE_CHILDLESS_SURCHARGE;

// Income tax calculation based on tax brackets.
const getIncomeTaxForYear = (taxableIncome: number, config: TaxYearConfig) => {
  if (taxableIncome <= config.basicAllowance) {
    return 0;
  }
  if (taxableIncome <= config.bracketEnd1) {
    const y = (taxableIncome - config.basicAllowance) / 10000;
    return (config.zone1Factor * y + config.zone1Offset) * y;
  }
  if (taxableIncome <= config.bracketEnd2) {
    const z = (taxableIncome - config.bracketEnd1) / 10000;
    return (config.zone2Factor * z + config.zone2Offset) * z + config.zone2OffsetValue;
  }
  if (taxableIncome <= config.bracketEnd3) {
    return config.zone3Factor * taxableIncome - config.zone3Offset;
  }
  return 0.45 * taxableIncome - 18936.88;
};

// Solidarity tax applies above a free limit.
const getSolidarityTax = (incomeTax: number, config: TaxYearConfig) =>
  incomeTax <= config.solidarityFreeLimit ? 0 : incomeTax * SOLIDARITY_RATE;

/**
 * Calculates a simplified net salary and deduction breakdown.
 * This is an educational model and not official tax advice.
 */
export const calculateNetSalary = (input: SalaryInput): SalaryResult => {
  // 1) Prepare inputs and yearly settings.
  const config = getTaxConfig(input.year);
  const allowance = input.annualAllowance ?? 0;
  const annualGross =
    input.period === "monthly" ? input.grossAmount * 12 : input.grossAmount;
  const caps = getContributionCap(input, config);
  const healthRate =
    input.healthInsuranceType === "private"
      ? input.healthInsuranceRate ?? 0
      : STATUTORY_HEALTH_RATE;
  // 2) Cap gross salary for insurance contributions.
  const cappedHealthBase = Math.min(annualGross, caps.health);
  const cappedPensionBase = Math.min(annualGross, caps.pension);
  const cappedUnemploymentBase = Math.min(annualGross, caps.unemployment);

  // 3) Calculate insurance contributions.
  const healthInsurance = cappedHealthBase * (healthRate / 100);
  const pensionInsurance = cappedPensionBase * (getPensionRate(input.pensionRegion) / 100);
  const unemploymentInsurance = cappedUnemploymentBase * (UNEMPLOYMENT_RATE / 100);
  const nursingCareInsurance =
    cappedHealthBase * (getNursingCareRate(input.childrenCount) / 100);

  // 4) Calculate taxable income and income taxes.
  const baseTaxableIncome =
    annualGross -
    allowance -
    healthInsurance -
    pensionInsurance -
    unemploymentInsurance -
    nursingCareInsurance -
    STANDARD_EMPLOYEE_ALLOWANCE -
    STANDARD_SPECIAL_EXPENSE_ALLOWANCE;
  const classConfig = taxClassConfig[input.taxClass];
  const taxableIncome = Math.max(baseTaxableIncome - classConfig.allowanceAdjustment, 0);
  const incomeTaxBase = classConfig.useSplitting
    ? getIncomeTaxForYear(taxableIncome / 2, config) * 2
    : getIncomeTaxForYear(taxableIncome, config);
  const incomeTax = incomeTaxBase * classConfig.multiplier;
  const solidarityTax = getSolidarityTax(incomeTax, config);
  const churchTax = input.churchMember
    ? incomeTax * getChurchTaxRate(input.federalState)
    : 0;

  // 5) Sum up deductions and compute the net salary.
  const totalDeductions =
    incomeTax +
    solidarityTax +
    churchTax +
    healthInsurance +
    pensionInsurance +
    unemploymentInsurance +
    nursingCareInsurance;

  const netAnnual = annualGross - totalDeductions;
  const divisor = input.period === "monthly" ? 12 : 1;

  // 6) Return the result as monthly or yearly values.
  return {
    net: roundCurrency(netAnnual / divisor),
    breakdown: {
      incomeTax: roundCurrency(incomeTax / divisor),
      churchTax: roundCurrency(churchTax / divisor),
      solidarityTax: roundCurrency(solidarityTax / divisor),
      healthInsurance: roundCurrency(healthInsurance / divisor),
      pensionInsurance: roundCurrency(pensionInsurance / divisor),
      unemploymentInsurance: roundCurrency(unemploymentInsurance / divisor),
      nursingCareInsurance: roundCurrency(nursingCareInsurance / divisor),
    },
  };
};
