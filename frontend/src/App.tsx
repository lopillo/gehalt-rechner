import { useState } from "react";
import ResultCard from "./components/ResultCard";
import { SalaryInput, SalaryResult } from "./types";

const initialForm: SalaryInput = {
  year: 2025,
  grossAmount: 5000,
  period: "monthly",
  taxClass: 1,
  federalState: "BE",
  churchMember: false,
  childrenCount: 0,
  annualAllowance: 0,
  healthInsuranceRate: 7.3,
  pensionRegion: "West",
};

const federalStates = [
  "BW",
  "BY",
  "BE",
  "BB",
  "HB",
  "HH",
  "HE",
  "MV",
  "NI",
  "NW",
  "RP",
  "SL",
  "SN",
  "ST",
  "SH",
  "TH",
] as const;

const App = () => {
  const [formData, setFormData] = useState<SalaryInput>(initialForm);
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof SalaryInput>(
    field: K,
    value: SalaryInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/salary/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Calculation failed. Please check your inputs.");
      }

      const data = (await response.json()) as SalaryResult;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header>
        <h1>Gehalt Rechner</h1>
        <p>Estimate your German net salary with an English-first calculator.</p>
      </header>
      <main className="grid">
        <form className="card" onSubmit={handleSubmit}>
          <h2>Inputs</h2>
          <label>
            Gross amount
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.grossAmount}
              onChange={(event) =>
                updateField("grossAmount", Number(event.target.value))
              }
            />
          </label>
          <label>
            Period
            <select
              value={formData.period}
              onChange={(event) =>
                updateField("period", event.target.value as SalaryInput["period"])
              }
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
          <label>
            Tax class
            <select
              value={formData.taxClass}
              onChange={(event) =>
                updateField(
                  "taxClass",
                  Number(event.target.value) as SalaryInput["taxClass"]
                )
              }
            >
              {[1, 2, 3, 4, 5, 6].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label>
            Bundesland
            <select
              value={formData.federalState}
              onChange={(event) =>
                updateField(
                  "federalState",
                  event.target.value as SalaryInput["federalState"]
                )
              }
            >
              {federalStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={formData.churchMember}
              onChange={(event) =>
                updateField("churchMember", event.target.checked)
              }
            />
            Church tax applicable
          </label>
          <label>
            Children count
            <input
              type="number"
              min="0"
              value={formData.childrenCount}
              onChange={(event) =>
                updateField("childrenCount", Number(event.target.value))
              }
            />
          </label>
          <label>
            Annual allowance
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.annualAllowance ?? 0}
              onChange={(event) =>
                updateField("annualAllowance", Number(event.target.value))
              }
            />
          </label>
          <label>
            Health insurance rate (%)
            <input
              type="number"
              min="0"
              step="0.1"
              value={formData.healthInsuranceRate}
              onChange={(event) =>
                updateField("healthInsuranceRate", Number(event.target.value))
              }
            />
          </label>
          <label>
            Pension region
            <select
              value={formData.pensionRegion}
              onChange={(event) =>
                updateField(
                  "pensionRegion",
                  event.target.value as SalaryInput["pensionRegion"]
                )
              }
            >
              <option value="West">West</option>
              <option value="East">East</option>
              <option value="None">None</option>
            </select>
          </label>
          <label>
            Calculation year
            <input
              type="number"
              min="2000"
              max="2100"
              value={formData.year}
              onChange={(event) =>
                updateField("year", Number(event.target.value))
              }
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Calculating..." : "Calculate net salary"}
          </button>
          {error ? <p className="error">{error}</p> : null}
        </form>
        <section>
          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="card placeholder">
              <h2>Results</h2>
              <p>Fill in the form to see your net salary breakdown.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
