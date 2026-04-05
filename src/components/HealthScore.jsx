import { motion } from "framer-motion";
import { FrostCard } from "./ui";
import { cn } from "../lib/utils";

function getScoreLevel(score) {
  if (score >= 80) return { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500", ring: "ring-emerald-200 dark:ring-emerald-900" };
  if (score >= 60) return { label: "Good", color: "text-indigo-500", bg: "bg-indigo-500", ring: "ring-indigo-200 dark:ring-indigo-900" };
  if (score >= 40) return { label: "Fair", color: "text-amber-500", bg: "bg-amber-500", ring: "ring-amber-200 dark:ring-amber-900" };
  return { label: "Needs Work", color: "text-rose-500", bg: "bg-rose-500", ring: "ring-rose-200 dark:ring-rose-900" };
}

export function HealthScore({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");

  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const savingsRatio = totalIncome > 0 ? (totalIncome - totalExpense) / totalIncome : 0;

  const expenseByCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const categoryCount = Object.keys(expenseByCategory).length;
  const maxCategorySpend = Math.max(...Object.values(expenseByCategory), 0);
  const diversification = categoryCount > 1 ? 1 - (maxCategorySpend / totalExpense) : 0;

  const savingsScore = Math.min(savingsRatio * 100 * 2, 50);
  const diversityScore = diversification * 30;
  const activityScore = Math.min(transactions.length * 1.5, 20);

  const rawScore = savingsScore + diversityScore + activityScore;
  const score = Math.round(Math.min(Math.max(rawScore, 0), 100));
  const level = getScoreLevel(score);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  const tips = [];
  if (savingsRatio < 0.2) tips.push("Try to save at least 20% of your income");
  if (diversification < 0.5) tips.push("Diversify your spending across more categories");
  if (savingsRatio >= 0.3) tips.push("Great savings rate — keep it up!");
  if (categoryCount >= 5) tips.push("Well-balanced spending across categories");

  return (
    <FrostCard delay={0.6} className="flex flex-col items-center text-center">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 self-start">
        Financial Health
      </h3>
      <p className="text-sm text-slate-400 mb-6 self-start">Based on your activity</p>

      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-100 dark:text-slate-800"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={level.color}
            stroke="currentColor"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{score}</span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>

      <div className={cn("px-3 py-1 rounded-full text-xs font-bold mb-4", level.bg, "text-white")}>
        {level.label}
      </div>

      <div className="w-full space-y-2 text-left">
        {tips.slice(0, 2).map((tip, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="mt-0.5 shrink-0">💡</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </FrostCard>
  );
}
