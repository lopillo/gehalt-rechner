import { calculateNetSalary } from "../services/calculateNetSalary";

const baseInput = {
  year: 2025,
  grossAmount: 5000,
  period: "monthly" as const,
  taxClass: 1 as const,
  federalState: "BE" as const,
  churchMember: false,
  childrenCount: 0,
  annualAllowance: 0,
  healthInsuranceRate: 7.3,
  pensionRegion: "West" as const,
};

describe("calculateNetSalary", () => {
  it("returns higher net for tax class 3 than tax class 1", () => {
    const class1 = calculateNetSalary(baseInput);
    const class3 = calculateNetSalary({ ...baseInput, taxClass: 3 });

    expect(class3.net).toBeGreaterThan(class1.net);
  });

  it("increases deductions when church tax is enabled", () => {
    const withoutChurchTax = calculateNetSalary(baseInput);
    const withChurchTax = calculateNetSalary({
      ...baseInput,
      churchMember: true,
    });

    expect(withChurchTax.breakdown.churchTax).toBeGreaterThan(0);
    expect(withChurchTax.net).toBeLessThan(withoutChurchTax.net);
  });
});
