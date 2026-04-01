import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FrostCard, EmptyState } from "./ui";
import { TransactionModal } from "./TransactionModal";
import { useApp } from "../context/AppContext";
import { categories, categoryColors } from "../data/mockData";
import { cn } from "../lib/utils";

export function Transactions() {
  const {
    transactions,
    filters,
    setFilter,
    resetFilters,
    role,
    deleteTransaction,
  } = useApp();

  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filtered = transactions
    .filter((t) => {
      if (filters.type !== "all" && t.type !== filters.type) return false;
      if (filters.category !== "All" && t.category !== filters.category)
        return false;
      if (
        filters.search &&
        !t.description.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      const order = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date")
        return order * (new Date(a.date) - new Date(b.date));
      if (filters.sortBy === "amount") return order * (a.amount - b.amount);
      return 0;
    });

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const toggleSort = (field) => {
    if (filters.sortBy === field) {
      setFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc");
    } else {
      setFilter("sortBy", field);
      setFilter("sortOrder", "desc");
    }
  };

  const SortIcon = ({ field }) => {
    if (filters.sortBy !== field)
      return <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />;
    return filters.sortOrder === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-indigo-500" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-indigo-500" />
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Transactions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {filtered.length} of {transactions.length} transactions
          </p>
        </div>
        {role === "admin" && (
          <button
            onClick={() => { setEditingTransaction(null); setModalOpen(true); }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform"
          >
            <Plus className="h-4 w-4" />
            Add Transaction
          </button>
        )}
      </div>

      <FrostCard delay={0.1} className="!p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors border",
              showFilters
                ? "bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-white/10"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-3 mb-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilter("type", e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none text-slate-700 dark:text-slate-200"
                  >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilter("category", e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none text-slate-700 dark:text-slate-200"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No transactions found"
            description="Try adjusting your filters or search query to find what you're looking for."
            action="Reset Filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <th
                    onClick={() => toggleSort("date")}
                    className="text-left py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 select-none"
                  >
                    <span className="flex items-center gap-1">
                      Date <SortIcon field="date" />
                    </span>
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th
                    onClick={() => toggleSort("amount")}
                    className="text-right py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 select-none"
                  >
                    <span className="flex items-center justify-end gap-1">
                      Amount <SortIcon field="amount" />
                    </span>
                  </th>
                  {role === "admin" && (
                    <th className="text-right py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-slate-100 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {formatDate(t.date)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {t.description}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{
                          backgroundColor: `${categoryColors[t.category]}15`,
                          color: categoryColors[t.category],
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: categoryColors[t.category],
                          }}
                        />
                        {t.category}
                      </span>
                    </td>
                    <td
                      className={cn(
                        "py-3.5 px-4 text-sm font-bold text-right whitespace-nowrap",
                        t.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {t.type === "income" ? "+" : "-"}$
                      {t.amount.toFixed(2)}
                    </td>
                    {role === "admin" && (
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => { setEditingTransaction(t); setModalOpen(true); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => deleteTransaction(t.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </FrostCard>

      <AnimatePresence>
        {modalOpen && (
          <TransactionModal
            editData={editingTransaction}
            onClose={() => { setModalOpen(false); setEditingTransaction(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
