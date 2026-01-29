import { SalaryResult } from "../types";

/**
 * Displays the net salary and deduction breakdown.
 */

interface ResultCardProps {
  result: SalaryResult;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);

const ResultCard = ({ result }: ResultCardProps) => {
  const { breakdown } = result;

  return (
    <section className="card">
      <h2>Estimated Net Salary</h2>
      <p className="net">{formatCurrency(result.net)}</p>
      <h3>Breakdown</h3>
      <ul className="breakdown">
        <li>Income tax: {formatCurrency(breakdown.incomeTax)}</li>
        <li>Church tax: {formatCurrency(breakdown.churchTax)}</li>
        <li>Solidarity tax: {formatCurrency(breakdown.solidarityTax)}</li>
        <li>Health insurance: {formatCurrency(breakdown.healthInsurance)}</li>
        <li>Pension insurance: {formatCurrency(breakdown.pensionInsurance)}</li>
        <li>
          Unemployment insurance:{" "}
          {formatCurrency(breakdown.unemploymentInsurance)}
        </li>
        <li>
          Nursing care insurance:{" "}
          {formatCurrency(breakdown.nursingCareInsurance)}
        </li>
      </ul>
      <p className="disclaimer">
        This calculator uses a simplified, educational model and does not
        provide official tax advice.
      </p>
    </section>
  );
};

export default ResultCard;
