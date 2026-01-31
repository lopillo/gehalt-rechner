// UI for the salary result summary.
import { formatEuroCurrency } from "../utils/formatters";
import { SalaryResult } from "../types";

/**
 * Displays the net salary and deduction breakdown.
 */

// Props for the result card.
interface ResultCardProps {
  result: SalaryResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  // Pull out the breakdown for easier reading.
  const { breakdown } = result;

  return (
    <section className="card">
      <h2>Estimated Net Salary</h2>
      {/* Main net salary number */}
      <p className="net">{formatEuroCurrency(result.net)}</p>
      <h3>Breakdown</h3>
      <ul className="breakdown">
        {/* Individual deduction rows */}
        <li>Income tax: {formatEuroCurrency(breakdown.incomeTax)}</li>
        <li>Church tax: {formatEuroCurrency(breakdown.churchTax)}</li>
        <li>Solidarity tax: {formatEuroCurrency(breakdown.solidarityTax)}</li>
        <li>Health insurance: {formatEuroCurrency(breakdown.healthInsurance)}</li>
        <li>Pension insurance: {formatEuroCurrency(breakdown.pensionInsurance)}</li>
        <li>
          Unemployment insurance:{" "}
          {formatEuroCurrency(breakdown.unemploymentInsurance)}
        </li>
        <li>
          Nursing care insurance:{" "}
          {formatEuroCurrency(breakdown.nursingCareInsurance)}
        </li>
      </ul>
      {/* Short disclaimer for the simplified model */}
      <p className="result-disclaimer">
        This calculator uses a simplified model; actual net pay may vary.
      </p>
    </section>
  );
};

export default ResultCard;
