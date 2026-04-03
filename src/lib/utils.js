// Copyright (c) 2026 Nitya Jain — CC BY-NC-ND 4.0
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
