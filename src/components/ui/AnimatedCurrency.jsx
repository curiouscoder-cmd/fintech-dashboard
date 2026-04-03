/**
 * FinSight — Personal Finance Dashboard
 * Copyright (c) 2026 Nitya Jain. All rights reserved.
 * Licensed under CC BY-NC-ND 4.0 — No commercial use permitted.
 */
export function AnimatedCurrency({ value, className }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return <span className={className}>{formatted}</span>;
}
