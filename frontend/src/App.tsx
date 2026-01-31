import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import ResultCard from "./components/ResultCard";
import { formatMoneyValue, parseMoneyValue } from "./utils/formatters";
import { FederalState, PensionRegion, SalaryInput, SalaryResult } from "./types";

const pensionRegionByState: Record<FederalState, PensionRegion> = {
  BW: "West",
  BY: "West",
  BE: "East",
  BB: "East",
  HB: "West",
  HH: "West",
  HE: "West",
  MV: "East",
  NI: "West",
  NW: "West",
  RP: "West",
  SL: "West",
  SN: "East",
  ST: "East",
  SH: "West",
  TH: "East",
};

const getPensionRegionForState = (state: FederalState): PensionRegion =>
  pensionRegionByState[state];

const initialForm: SalaryInput = {
  year: 2025,
  grossAmount: 5000,
  period: "monthly",
  taxClass: 1,
  federalState: "BE",
  churchMember: false,
  childrenCount: 0,
  annualAllowance: 0,
  healthInsuranceType: "statutory",
  healthInsuranceRate: 7.3,
  pensionRegion: getPensionRegionForState("BE"),
};

const federalStates = [
  { code: "BW", name: "Baden-Württemberg" },
  { code: "BY", name: "Bavaria" },
  { code: "BE", name: "Berlin" },
  { code: "BB", name: "Brandenburg" },
  { code: "HB", name: "Bremen" },
  { code: "HH", name: "Hamburg" },
  { code: "HE", name: "Hesse" },
  { code: "MV", name: "Mecklenburg-Vorpommern" },
  { code: "NI", name: "Lower Saxony" },
  { code: "NW", name: "North Rhine-Westphalia" },
  { code: "RP", name: "Rhineland-Palatinate" },
  { code: "SL", name: "Saarland" },
  { code: "SN", name: "Saxony" },
  { code: "ST", name: "Saxony-Anhalt" },
  { code: "SH", name: "Schleswig-Holstein" },
  { code: "TH", name: "Thuringia" },
] as const;

const App = () => {
  const [formData, setFormData] = useState<SalaryInput>(initialForm);
  const [grossAmountInput, setGrossAmountInput] = useState(
    formatMoneyValue(initialForm.grossAmount)
  );
  const [annualAllowanceInput, setAnnualAllowanceInput] = useState(
    formatMoneyValue(initialForm.annualAllowance ?? 0)
  );
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof SalaryInput, string>>
  >({});
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const showPrivateHealthRate = formData.healthInsuranceType === "private";
  const healthRateLabel = useMemo(
    () =>
      showPrivateHealthRate
        ? "Private insurance rate (%)"
        : "Statutory insurance rate (fixed)",
    [showPrivateHealthRate]
  );
  const pensionRegionLabel = useMemo(
    () => getPensionRegionForState(formData.federalState),
    [formData.federalState]
  );
  const getFieldError = (field: keyof SalaryInput) => formErrors[field];

  const validateForm = (values: SalaryInput) => {
    const errors: Partial<Record<keyof SalaryInput, string>> = {};

    if (!Number.isFinite(values.grossAmount) || values.grossAmount <= 0) {
      errors.grossAmount = "Enter a gross amount greater than 0.";
    }

    if (
      !Number.isFinite(values.childrenCount) ||
      values.childrenCount < 0 ||
      !Number.isInteger(values.childrenCount)
    ) {
      errors.childrenCount = "Children count must be a whole number (0 or more).";
    }

    if (
      values.annualAllowance !== undefined &&
      (!Number.isFinite(values.annualAllowance) || values.annualAllowance < 0)
    ) {
      errors.annualAllowance = "Annual allowance must be 0 or higher.";
    }

    if (
      !Number.isFinite(values.year) ||
      values.year < 2000 ||
      values.year > 2100 ||
      !Number.isInteger(values.year)
    ) {
      errors.year = "Choose a year between 2000 and 2100.";
    }

    if (values.healthInsuranceType === "private") {
      if (
        values.healthInsuranceRate === undefined ||
        !Number.isFinite(values.healthInsuranceRate) ||
        values.healthInsuranceRate <= 0
      ) {
        errors.healthInsuranceRate =
          "Enter a private health insurance rate above 0%.";
      } else if (values.healthInsuranceRate > 20) {
        errors.healthInsuranceRate =
          "Private health insurance rate should be 20% or less.";
      }
    }

    return errors;
  };

  const updateFields = (updates: Partial<SalaryInput>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      setFormErrors((current) => {
        if (Object.keys(current).length === 0) {
          return current;
        }
        return validateForm(next);
      });
      return next;
    });
  };

  const updateField = <K extends keyof SalaryInput>(
    field: K,
    value: SalaryInput[K]
  ) => {
    updateFields({ [field]: value } as Partial<SalaryInput>);
  };

  const handleFederalStateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nextState = event.target.value as SalaryInput["federalState"];
    updateFields({
      federalState: nextState,
      pensionRegion: getPensionRegionForState(nextState),
    });
  };

  const handleMoneyChange =
    (
      field: "grossAmount" | "annualAllowance",
      setDisplayValue: Dispatch<SetStateAction<string>>
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setDisplayValue(nextValue);
      updateField(field, parseMoneyValue(nextValue) as SalaryInput[typeof field]);
    };

  const handleMoneyBlur =
    (
      field: "grossAmount" | "annualAllowance",
      setDisplayValue: Dispatch<SetStateAction<string>>
    ) =>
    () => {
      setDisplayValue(formatMoneyValue(formData[field] ?? 0));
    };

  // Sends the SalaryInput payload to the backend API.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setError("Please fix the highlighted fields before submitting.");
      return;
    }

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

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  useEffect(() => {
    setFormData((prev) => {
      if (prev.healthInsuranceType === "statutory") {
        return { ...prev, healthInsuranceRate: 7.3 };
      }
      if (!prev.healthInsuranceRate || prev.healthInsuranceRate <= 0) {
        return { ...prev, healthInsuranceRate: 12.5 };
      }
      return prev;
    });
  }, [showPrivateHealthRate]);

  return (
    <div className="page">
      <header>
        <h1>Gehalt Rechner</h1>
        <p>Estimate your german salary.</p>
      </header>
      <main>
        <div className="form-wrapper">
          <form className="card form-card" onSubmit={handleSubmit}>
            <h2>Inputs</h2>
            <label>
              Gross amount
              <div className="input-with-suffix">
                <input
                  type="text"
                  inputMode="decimal"
                  value={grossAmountInput}
                  onChange={handleMoneyChange(
                    "grossAmount",
                    setGrossAmountInput
                  )}
                  onBlur={handleMoneyBlur("grossAmount", setGrossAmountInput)}
                  className={getFieldError("grossAmount") ? "input-error" : ""}
                  aria-invalid={Boolean(getFieldError("grossAmount"))}
                  aria-describedby="gross-amount-error"
                />
                <span className="input-suffix" aria-hidden="true">
                  €
                </span>
              </div>
              {getFieldError("grossAmount") ? (
                <span id="gross-amount-error" className="field-error">
                  {getFieldError("grossAmount")}
                </span>
              ) : null}
            </label>
            <label>
              Period
              <select
                value={formData.period}
                onChange={(event) =>
                  updateField(
                    "period",
                    event.target.value as SalaryInput["period"]
                  )
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
                onChange={handleFederalStateChange}
              >
                {federalStates.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name} ({state.code})
                  </option>
                ))}
              </select>
              <span className="field-hint" aria-live="polite">
                Pension region: {pensionRegionLabel} (auto)
              </span>
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
                className={getFieldError("childrenCount") ? "input-error" : ""}
                aria-invalid={Boolean(getFieldError("childrenCount"))}
                aria-describedby="children-count-error"
              />
              {getFieldError("childrenCount") ? (
                <span id="children-count-error" className="field-error">
                  {getFieldError("childrenCount")}
                </span>
              ) : null}
            </label>
            <label>
              Annual allowance
              <div className="input-with-suffix">
                <input
                  type="text"
                  inputMode="decimal"
                  value={annualAllowanceInput}
                  onChange={handleMoneyChange(
                    "annualAllowance",
                    setAnnualAllowanceInput
                  )}
                  onBlur={handleMoneyBlur(
                    "annualAllowance",
                    setAnnualAllowanceInput
                  )}
                  className={
                    getFieldError("annualAllowance") ? "input-error" : ""
                  }
                  aria-invalid={Boolean(getFieldError("annualAllowance"))}
                  aria-describedby="annual-allowance-error"
                />
                <span className="input-suffix" aria-hidden="true">
                  €
                </span>
              </div>
              {getFieldError("annualAllowance") ? (
                <span id="annual-allowance-error" className="field-error">
                  {getFieldError("annualAllowance")}
                </span>
              ) : null}
            </label>
            <label>
              Health insurance type
              <select
                value={formData.healthInsuranceType}
                onChange={(event) =>
                  updateField(
                    "healthInsuranceType",
                    event.target.value as SalaryInput["healthInsuranceType"]
                  )
                }
              >
                <option value="statutory">Statutory</option>
                <option value="private">Private</option>
              </select>
            </label>
            <label>
              {healthRateLabel}
              <input
                type="number"
                min="0"
                step="0.1"
                value={
                  showPrivateHealthRate
                    ? formData.healthInsuranceRate ?? 0
                    : 7.3
                }
                onChange={(event) =>
                  updateField("healthInsuranceRate", Number(event.target.value))
                }
                disabled={!showPrivateHealthRate}
                required={showPrivateHealthRate}
                className={
                  getFieldError("healthInsuranceRate") ? "input-error" : ""
                }
                aria-invalid={Boolean(getFieldError("healthInsuranceRate"))}
                aria-describedby="health-rate-error"
              />
              {getFieldError("healthInsuranceRate") ? (
                <span id="health-rate-error" className="field-error">
                  {getFieldError("healthInsuranceRate")}
                </span>
              ) : null}
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
                className={getFieldError("year") ? "input-error" : ""}
                aria-invalid={Boolean(getFieldError("year"))}
                aria-describedby="year-error"
              />
              {getFieldError("year") ? (
                <span id="year-error" className="field-error">
                  {getFieldError("year")}
                </span>
              ) : null}
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Calculating..." : "Calculate net salary"}
            </button>
            {error ? <p className="error">{error}</p> : null}
          </form>
        </div>
        <section className="results-section" ref={resultsRef}>
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
