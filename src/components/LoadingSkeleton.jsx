import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => (
  <div className="rounded-xl border border-border bg-card p-5 space-y-3">
    <div className="flex justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-12 w-12 rounded-xl" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="rounded-xl border border-border bg-card p-4 space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
      </div>
    ))}
  </div>
);
