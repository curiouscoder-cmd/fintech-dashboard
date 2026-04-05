import { useApp } from "../context/AppContext";

export function useChartTheme() {
  const { darkMode } = useApp();

  return {
    gridColor: darkMode ? "#334155" : "#e2e8f0",
    axisColor: darkMode ? "#64748b" : "#94a3b8",
    tooltipBg: darkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
    tooltipBorder: darkMode ? "1px solid rgba(255,255,255,0.1)" : "none",
    tooltipShadow: darkMode
      ? "0 8px 32px rgba(0,0,0,0.4)"
      : "0 8px 32px rgba(0,0,0,0.08)",
    tooltipLabelColor: darkMode ? "#e2e8f0" : "#334155",
    tooltipTextColor: darkMode ? "#cbd5e1" : "#475569",
    isDark: darkMode,
  };
}
