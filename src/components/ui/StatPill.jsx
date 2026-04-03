// Copyright (c) 2026 Nitya Jain — CC BY-NC-ND 4.0
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function StatPill({ value, positive }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
        positive
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
      )}
    >
      {positive ? (
        <ArrowUpRight className="h-3 w-3" />
      ) : (
        <ArrowDownRight className="h-3 w-3" />
      )}
      {value}
    </div>
  );
}

export default StatPill;
