import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function ConfirmDialog({ title, message, onConfirm, onCancel, confirmLabel = "Delete", danger = true }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-sm rounded-[24px] border border-white/60 bg-white/90 backdrop-blur-2xl p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900/95"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 shrink-0">
            <AlertTriangle className="h-5 w-5 text-rose-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all hover:scale-105 ${
              danger
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600"
                : "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-600"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
