// Format plain numbers for input fields (no currency symbol).
const moneyNumberFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

// Format numbers as Euro currency for display.
const euroCurrencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

// Convert a number to a string for input display.
export const formatMoneyValue = (value: number) =>
  moneyNumberFormatter.format(value);

// Convert a number to a Euro currency string.
export const formatEuroCurrency = (value: number) =>
  euroCurrencyFormatter.format(value);

// Parse a string input into a number, defaulting to 0 if invalid.
export const parseMoneyValue = (value: string) => {
  const normalized = value
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".")
    .trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};
