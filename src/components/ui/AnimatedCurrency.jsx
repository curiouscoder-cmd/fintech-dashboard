export function AnimatedCurrency({ value, className }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return <span className={className}>{formatted}</span>;
}
