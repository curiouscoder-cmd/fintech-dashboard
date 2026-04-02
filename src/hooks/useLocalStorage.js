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
      // silently fail if storage is full or unavailable
    }
  }, [key, value]);

  return [value, setValue];
}
