import { SalaryInput, SalaryResult } from "../types";

const roundCurrency = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

const taxClassRateMap: Record<SalaryInput["taxClass"], number> = {
  1: 0.25,
  2: 0.23,
  3: 0.2,
  4: 0.26,
  5: 0.32,
  6: 0.34,
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
const getPensionRate = (region: SalaryInput["pensionRegion"]) => {
  if (region === "None") {
    return 0;
  }
  return 0.093;
};

/**
 * Calculates a simplified net salary and deduction breakdown.
 * This is an educational model and not official tax advice.
 */
export const calculateNetSalary = (input: SalaryInput): SalaryResult => {
  const allowance = input.annualAllowance ?? 0;
  const annualGross =
    input.period === "monthly" ? input.grossAmount * 12 : input.grossAmount;
  const taxableIncome = Math.max(annualGross - allowance, 0);

  const incomeTax = taxableIncome * taxClassRateMap[input.taxClass];
  const solidarityTax = incomeTax * 0.055;
  const churchTax = input.churchMember
    ? incomeTax * getChurchTaxRate(input.federalState)
    : 0;

  const healthInsurance = annualGross * (input.healthInsuranceRate / 100);
  const pensionInsurance = annualGross * getPensionRate(input.pensionRegion);
  const unemploymentInsurance = annualGross * 0.013;
  const nursingCareInsurance = annualGross * 0.017;

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
