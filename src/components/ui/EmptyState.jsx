import { cn } from "../../lib/utils";

export function EmptyState({ icon: Icon, title, description, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {Icon && (
        <div className="mb-4 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
          <Icon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={onAction}
          className={cn(
            "rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5",
            "text-sm font-bold text-white shadow-lg shadow-indigo-500/20",
            "hover:scale-105 transition-transform"
          )}
        >
          {action}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
