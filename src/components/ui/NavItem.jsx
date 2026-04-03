// Copyright (c) 2026 Nitya Jain — CC BY-NC-ND 4.0
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300",
        active
          ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20"
          : "text-slate-500 hover:bg-white/50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
      )}
    >
      <Icon className="h-5 w-5" />
      {active && (
        <motion.div
          layoutId="nav-active-dot"
          className="absolute -bottom-2 h-1 w-1 rounded-full bg-indigo-500"
        />
      )}
    </button>
  );
}

export default NavItem;
