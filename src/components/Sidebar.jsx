import { Home, LineChart, ListTree, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { NavItem } from "./ui/NavItem";
import { useApp } from "../context/AppContext";

export function Sidebar() {
  const { activeTab, setActiveTab, transactions } = useApp();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsPercent = totalIncome > 0
    ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
    : 0;

  const navItems = [
    { icon: Home, label: "Overview", index: 0 },
    { icon: ListTree, label: "Transactions", index: 1 },
    { icon: LineChart, label: "Insights", index: 2 },
  ];

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex w-24 flex-col items-center justify-between rounded-[40px] border border-white/50 bg-white/30 backdrop-blur-2xl py-8 shadow-xl shadow-indigo-500/5 dark:border-white/10 dark:bg-slate-900/40"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30">
        <span className="text-2xl">💎</span>
      </div>

      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavItem
            key={item.index}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.index}
            onClick={() => setActiveTab(item.index)}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center text-center px-2">
          <span className="text-lg font-bold text-indigo-500">{savingsPercent}%</span>
          <span className="text-[9px] font-medium text-slate-400 leading-tight">saved</span>
        </div>
        <button
          title="Settings"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 hover:rotate-90 transition-transform duration-500 shadow-sm dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </motion.aside>
  );
}
