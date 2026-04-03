/**
 * FinSight — Personal Finance Dashboard
 * Copyright (c) 2026 Nitya Jain. All rights reserved.
 * Licensed under CC BY-NC-ND 4.0 — No commercial use permitted.
 */
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FrostCard } from "./ui";
import { useApp } from "../context/AppContext";
import { categoryColors, categoryIcons } from "../data/mockData";
import { cn } from "../lib/utils";

export function RecentTransactions() {
  const { transactions, setActiveTab } = useApp();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff} days ago`;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <FrostCard delay={0.6} className="min-h-[300px]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Recent Activity
          </h3>
          <p className="text-sm text-slate-400">Latest transactions</p>
        </div>
        <button
          onClick={() => setActiveTab(1)}
          className="flex items-center gap-1 text-sm font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-1">
        {recent.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
          >
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${categoryColors[t.category]}15`,
                color: categoryColors[t.category],
              }}
            >
              <span className="text-sm">
                {categoryIcons[t.category] || t.category.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                {t.description}
              </p>
              <p className="text-xs text-slate-400">{formatDate(t.date)}</p>
            </div>
            <span
              className={cn(
                "text-sm font-bold whitespace-nowrap",
                t.type === "income"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>
    </FrostCard>
  );
}
