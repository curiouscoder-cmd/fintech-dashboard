// Copyright (c) 2026 Nitya Jain — CC BY-NC-ND 4.0
import { useState, useEffect } from "react";

export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
    
    }
  }, [key, value]);

  return [value, setValue];
}
