import { useMemo } from "react";
import { DollarSign, Wallet, CreditCard } from "lucide-react";
import { FrostCard, StatPill, AnimatedCurrency } from "./ui";
import { BalanceTrendChart } from "./BalanceTrendChart";
import { SpendingBreakdown } from "./SpendingBreakdown";
import { RecentTransactions } from "./RecentTransactions";
import { useApp } from "../context/AppContext";

export function Overview() {
  const { transactions } = useApp();

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return { totalIncome: income, totalExpense: expense, balance: income - expense };
  }, [transactions]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Financial Summary
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track your spending patterns and overall balance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FrostCard delay={0.1} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <DollarSign className="h-6 w-6" />
            </div>
            <StatPill value="12.5%" positive />
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              Total Balance
            </p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              <AnimatedCurrency value={balance} />
            </h3>
          </div>
        </FrostCard>

        <FrostCard delay={0.2} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Wallet className="h-6 w-6" />
            </div>
            <StatPill value="8.2%" positive />
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              Total Income
            </p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              <AnimatedCurrency value={totalIncome} />
            </h3>
          </div>
        </FrostCard>

        <FrostCard delay={0.3} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-rose-100 rounded-2xl text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              <CreditCard className="h-6 w-6" />
            </div>
            <StatPill value="4.1%" positive={false} />
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              Total Expenses
            </p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              <AnimatedCurrency value={totalExpense} />
            </h3>
          </div>
        </FrostCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BalanceTrendChart />
        <SpendingBreakdown />
      </div>

      <RecentTransactions />
    </div>
  );
}
