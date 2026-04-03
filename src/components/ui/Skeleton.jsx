import { cn } from "../../lib/utils";

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-slate-200/60 dark:bg-slate-700/40",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-[32px] border border-white/60 bg-white/40 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="flex justify-between items-start">
        <Skeleton className="h-12 w-12 rounded-2xl" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-36" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-[32px] border border-white/60 bg-white/40 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 min-h-[350px]">
      <div className="space-y-2 mb-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex items-end gap-2 h-[240px] pt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-lg"
            style={{ height: `${30 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="rounded-[32px] border border-white/60 bg-white/40 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="space-y-4">
        <div className="flex gap-4 pb-3 border-b border-slate-200 dark:border-white/10">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
