// Component tests for the ResultCard output.
import { render, screen } from "@testing-library/react";
import ResultCard from "../components/ResultCard";

/**
 * Ensures the result card renders summary values.
 */

describe("ResultCard", () => {
  it("renders net salary value", () => {
    // Render with a simple result payload.
    render(
      <ResultCard
        result={{
          net: 3200,
          breakdown: {
            incomeTax: 500,
            churchTax: 0,
            solidarityTax: 20,
            healthInsurance: 300,
            pensionInsurance: 200,
            unemploymentInsurance: 50,
            nursingCareInsurance: 40,
          },
        }}
      />
    );

    expect(screen.getByText(/3200,00\s?€/i)).toBeInTheDocument();
  });
});
