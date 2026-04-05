import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FrostCard } from "./ui";
import { balanceTrend } from "../data/mockData";
import { useChartTheme } from "../hooks/useChartTheme";

export function BalanceTrendChart() {
  const theme = useChartTheme();

  return (
    <FrostCard delay={0.4} className="lg:col-span-2 min-h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Balance Trend
          </h3>
          <p className="text-sm text-slate-400">Last 8 weeks</p>
        </div>
      </div>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceTrend}>
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={theme.isDark ? 0.35 : 0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke={theme.axisColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
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
                backdropFilter: "blur(8px)",
              }}
              formatter={(value) => [
                `$${value.toLocaleString()}`,
                "Balance",
              ]}
              labelStyle={{ fontWeight: "bold", color: theme.tooltipLabelColor }}
              itemStyle={{ color: theme.tooltipTextColor }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#balanceGrad)"
              dot={false}
              activeDot={{ r: 6, fill: "#6366f1", stroke: theme.isDark ? "#1e293b" : "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </FrostCard>
  );
}
