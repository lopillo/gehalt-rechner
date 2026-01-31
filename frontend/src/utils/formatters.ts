const moneyNumberFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

const euroCurrencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

export const formatMoneyValue = (value: number) =>
  moneyNumberFormatter.format(value);

export const formatEuroCurrency = (value: number) =>
  euroCurrencyFormatter.format(value);

export const parseMoneyValue = (value: string) => {
  const normalized = value
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".")
    .trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};
