/**
 * FinSight — Personal Finance Dashboard
 * Copyright (c) 2026 Nitya Jain. All rights reserved.
 * Licensed under CC BY-NC-ND 4.0 — No commercial use permitted.
 */
import { Home, LineChart, ListTree, Lightbulb } from "lucide-react";
import { useApp } from "../context/AppContext";
import { cn } from "../lib/utils";

export function MobileNav() {
  const { activeTab, setActiveTab } = useApp();

  const items = [
    { icon: Home, label: "Overview", index: 0 },
    { icon: ListTree, label: "Transactions", index: 1 },
    { icon: LineChart, label: "Insights", index: 2 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-3 mb-3 flex items-center justify-around rounded-[24px] border border-white/50 bg-white/60 backdrop-blur-2xl py-2 shadow-xl dark:border-white/10 dark:bg-slate-900/70">
        {items.map((item) => (
          <button
            key={item.index}
            onClick={() => setActiveTab(item.index)}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all",
              activeTab === item.index
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-slate-400 dark:text-slate-500"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 transition-transform",
                activeTab === item.index && "scale-110"
              )}
            />
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
