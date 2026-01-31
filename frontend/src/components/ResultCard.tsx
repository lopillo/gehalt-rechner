import { formatEuroCurrency } from "../utils/formatters";
import { SalaryResult } from "../types";

/**
 * Displays the net salary and deduction breakdown.
 */

interface ResultCardProps {
  result: SalaryResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const { breakdown } = result;

  return (
    <section className="card">
      <h2>Estimated Net Salary</h2>
      <p className="net">{formatEuroCurrency(result.net)}</p>
      <h3>Breakdown</h3>
      <ul className="breakdown">
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
      <p className="result-disclaimer">
        This calculator uses a simplified model; actual net pay may vary.
      </p>
    </section>
  );
};

export default ResultCard;
