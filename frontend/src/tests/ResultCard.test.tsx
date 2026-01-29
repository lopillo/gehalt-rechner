import { render, screen } from "@testing-library/react";
import ResultCard from "../components/ResultCard";

describe("ResultCard", () => {
  it("renders net salary value", () => {
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

    expect(screen.getByText(/€3,200/i)).toBeInTheDocument();
  });
});
