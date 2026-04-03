import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FrostCard } from "./ui";
import { useApp } from "../context/AppContext";
import { categoryColors } from "../data/mockData";
import { useChartTheme } from "../hooks/useChartTheme";

export function SpendingBreakdown() {
  const { transactions } = useApp();
  const theme = useChartTheme();

  const { chartData, total } = useMemo(() => {
    const expenseByCategory = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const data = Object.entries(expenseByCategory)
      .map(([name, value]) => ({
        name,
        value: Math.round(value * 100) / 100,
        color: categoryColors[name] || "#94a3b8",
      }))
      .sort((a, b) => b.value - a.value);

    return { chartData: data, total: data.reduce((sum, d) => sum + d.value, 0) };
  }, [transactions]);

  return (
    <FrostCard delay={0.5} className="min-h-[350px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Spending Breakdown
        </h3>
        <p className="text-sm text-slate-400">By category</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="h-[160px] w-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.tooltipBg,
                  border: theme.tooltipBorder,
                  borderRadius: "12px",
                  boxShadow: theme.tooltipShadow,
                }}
                formatter={(value) => [`$${value.toFixed(2)}`, ""]}
                itemStyle={{ color: theme.tooltipTextColor }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full mt-4 space-y-2">
          {chartData.slice(0, 5).map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {item.name}
                </span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-semibold">
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </FrostCard>
  );
}
