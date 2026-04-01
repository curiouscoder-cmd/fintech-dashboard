import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { categories } from "../data/mockData";
import { cn } from "../lib/utils";

export function TransactionModal({ onClose, editData = null }) {
  const { addTransaction, editTransaction } = useApp();
  const isEdit = !!editData;

  const [form, setForm] = useState({
    description: editData?.description || "",
    amount: editData?.amount || "",
    category: editData?.category || categories[0],
    type: editData?.type || "expense",
    date: editData?.date || new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = "Required";
    if (!form.amount || Number(form.amount) <= 0) errs.amount = "Must be > 0";
    if (!form.date) errs.date = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...form,
      amount: parseFloat(form.amount),
    };

    if (isEdit) {
      editTransaction({ ...data, id: editData.id });
    } else {
      addTransaction(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md rounded-[28px] border border-white/60 bg-white/80 backdrop-blur-2xl p-8 shadow-2xl dark:border-white/10 dark:bg-slate-900/90"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {isEdit ? "Edit Transaction" : "New Transaction"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {["expense", "income"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, type: t })}
                className={cn(
                  "flex-1 py-2 text-sm font-semibold rounded-lg transition-all capitalize",
                  form.type === t
                    ? "bg-white shadow-sm text-slate-800 dark:bg-slate-700 dark:text-slate-100"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="e.g. Grocery Shopping"
              className={cn(
                "w-full bg-white dark:bg-slate-800 border rounded-xl px-4 py-2.5 text-sm outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-300",
                errors.description
                  ? "border-rose-300 dark:border-rose-800"
                  : "border-slate-200 dark:border-white/10 focus:border-indigo-300"
              )}
            />
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
                className={cn(
                  "w-full bg-white dark:bg-slate-800 border rounded-xl px-4 py-2.5 text-sm outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-300",
                  errors.amount
                    ? "border-rose-300 dark:border-rose-800"
                    : "border-slate-200 dark:border-white/10 focus:border-indigo-300"
                )}
              />
              {errors.amount && (
                <p className="text-xs text-rose-500 mt-1">{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={cn(
                  "w-full bg-white dark:bg-slate-800 border rounded-xl px-4 py-2.5 text-sm outline-none text-slate-700 dark:text-slate-200",
                  errors.date
                    ? "border-rose-300 dark:border-rose-800"
                    : "border-slate-200 dark:border-white/10 focus:border-indigo-300"
                )}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none text-slate-700 dark:text-slate-200"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform"
          >
            {isEdit ? "Save Changes" : "Add Transaction"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
