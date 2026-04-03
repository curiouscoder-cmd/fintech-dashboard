/**
 * FinSight — Personal Finance Dashboard
 * Copyright (c) 2026 Nitya Jain. All rights reserved.
 * Licensed under CC BY-NC-ND 4.0 — No commercial use permitted.
 *
 * @module Insights
 * @author nityaprofessional6402@gmail.com
 */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, Zap } from "lucide-react";
import { FrostCard } from "./ui";
import { HealthScore } from "./HealthScore";
import { useApp } from "../context/AppContext";
import { monthlyData, categoryColors } from "../data/mockData";
import { useChartTheme } from "../hooks/useChartTheme";

export function Insights() {
  const { transactions } = useApp();
  const theme = useChartTheme();

  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");

  const expenseByCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(expenseByCategory).sort(
    (a, b) => b[1] - a[1]
  );

  const highestCategory = sortedCategories[0];
  const lowestCategory = sortedCategories[sortedCategories.length - 1];

  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const avgTransaction =
    expenses.length > 0 ? totalExpense / expenses.length : 0;

  const insights = [
    {
      icon: TrendingUp,
      title: "Highest Spending",
      value: highestCategory ? highestCategory[0] : "N/A",
      detail: highestCategory
        ? `$${highestCategory[1].toFixed(2)} total`
        : "No data",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-900/20",
    },
    {
      icon: TrendingDown,
      title: "Lowest Spending",
      value: lowestCategory ? lowestCategory[0] : "N/A",
      detail: lowestCategory
        ? `$${lowestCategory[1].toFixed(2)} total`
        : "No data",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      icon: Zap,
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      detail: "of total income saved",
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      icon: AlertCircle,
      title: "Avg. Expense",
      value: `$${avgTransaction.toFixed(2)}`,
      detail: `across ${expenses.length} transactions`,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Insights
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Key observations from your financial activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((item, i) => (
          <FrostCard key={i} delay={i * 0.1} className="flex flex-col gap-3">
            <div
              className={`p-2.5 rounded-xl w-fit ${item.bg}`}
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {item.title}
              </p>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {item.value}
              </p>
              <p className="text-xs text-slate-400 mt-1">{item.detail}</p>
            </div>
          </FrostCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FrostCard delay={0.4} className="lg:col-span-2 min-h-[380px]">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Monthly Comparison
          </h3>
          <p className="text-sm text-slate-400">Income vs Expenses</p>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={8}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.gridColor}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke={theme.axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={theme.axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.tooltipBg,
                  border: theme.tooltipBorder,
                  borderRadius: "16px",
                  boxShadow: theme.tooltipShadow,
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                labelStyle={{ fontWeight: "bold", color: theme.tooltipLabelColor }}
                itemStyle={{ color: theme.tooltipTextColor }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                formatter={(value) => (
                  <span className="text-slate-600 dark:text-slate-300">{value}</span>
                )}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#f43f5e"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </FrostCard>
        <HealthScore transactions={transactions} />
      </div>

      <FrostCard delay={0.5}>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
          Spending by Category
        </h3>
        <div className="space-y-3">
          {sortedCategories.map(([category, amount]) => {
            const percent = (amount / totalExpense) * 100;
            return (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {category}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    ${amount.toFixed(2)} ({percent.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percent}%`,
                      backgroundColor:
                        categoryColors[category] || "#94a3b8",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </FrostCard>
    </div>
  );
}
