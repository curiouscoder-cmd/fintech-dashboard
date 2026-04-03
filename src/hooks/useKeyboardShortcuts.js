import { useEffect } from "react";
import { useApp } from "../context/AppContext";

export function useKeyboardShortcuts(callbacks = {}) {
  const { setActiveTab, toggleDarkMode } = useApp();

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "1") setActiveTab(0);
      if (e.key === "2") setActiveTab(1);
      if (e.key === "3") setActiveTab(2);
      if (e.key === "d") toggleDarkMode();
      if (e.key === "n" && callbacks.onNewTransaction) callbacks.onNewTransaction();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setActiveTab, toggleDarkMode, callbacks]);
}
