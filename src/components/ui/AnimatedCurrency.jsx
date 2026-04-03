import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";

export function AnimatedCurrency({ value, className }) {
  const animated = useAnimatedNumber(value);

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(animated);

  return <span className={className}>{formatted}</span>;
}
