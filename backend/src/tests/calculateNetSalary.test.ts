// Unit tests for the net salary calculator.
import { calculateNetSalary } from "../services/calculateNetSalary";

/**
 * Unit tests for the salary calculation service.
 */

// Base payload used across tests to keep data consistent.
const baseInput = {
  year: 2025,
  grossAmount: 5000,
  period: "monthly" as const,
  taxClass: 1 as const,
  federalState: "BE" as const,
  churchMember: false,
  childrenCount: 0,
  annualAllowance: 0,
  healthInsuranceType: "statutory" as const,
  healthInsuranceRate: 8.7,
  pensionRegion: "West" as const,
};

describe("calculateNetSalary", () => {
  it("returns higher net for tax class 3 than tax class 1", () => {
    // Compare two tax classes with the same input.
    const class1 = calculateNetSalary(baseInput);
    const class3 = calculateNetSalary({ ...baseInput, taxClass: 3 });

    expect(class3.net).toBeGreaterThan(class1.net);
  });

  it("increases deductions when church tax is enabled", () => {
    // Enable church tax and confirm deductions increase.
    const withoutChurchTax = calculateNetSalary(baseInput);
    const withChurchTax = calculateNetSalary({
      ...baseInput,
      churchMember: true,
    });

    expect(withChurchTax.breakdown.churchTax).toBeGreaterThan(0);
    expect(withChurchTax.net).toBeLessThan(withoutChurchTax.net);
  });

  it("charges a higher nursing care rate when no children are listed", () => {
    // Nursing care is higher for childless inputs.
    const withChildren = calculateNetSalary({
      ...baseInput,
      childrenCount: 1,
    });
    const withoutChildren = calculateNetSalary({
      ...baseInput,
      childrenCount: 0,
    });

    expect(withoutChildren.breakdown.nursingCareInsurance).toBeGreaterThan(
      withChildren.breakdown.nursingCareInsurance
    );
  });

  it("uses the lower church tax rate in Bavaria", () => {
    // Bavaria uses a lower church tax rate than Berlin.
    const berlinChurchTax = calculateNetSalary({
      ...baseInput,
      churchMember: true,
      federalState: "BE",
    });
    const bavariaChurchTax = calculateNetSalary({
      ...baseInput,
      churchMember: true,
      federalState: "BY",
    });

    expect(bavariaChurchTax.breakdown.churchTax).toBeLessThan(
      berlinChurchTax.breakdown.churchTax
    );
  });
});
