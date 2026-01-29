// src/services/calculateNetSalary.ts
import { SalaryInput } from "../schemas/salary";

export function calculateNetSalary(input: SalaryInput) {
  const totalDeductions = input.grossAmount * 0.3;
  const net = input.grossAmount - totalDeductions;

  return {
    net,
    breakdown: {
      incomeTax: totalDeductions * 0.5,
      churchTax: input.churchMember ? totalDeductions * 0.05 : 0,
      solidaritySurcharge: totalDeductions * 0.02,
      healthInsurance: totalDeductions * 0.18,
      pensionInsurance: totalDeductions * 0.15,
      unemploymentInsurance: totalDeductions * 0.07,
      nursingCareInsurance: totalDeductions * 0.03
    }
  };
}
