import { Skeleton } from '@shared/ui/skeleton';

export const OverviewSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>
    <Skeleton className="h-16 w-full" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-xl" />
      ))}
    </div>
  </div>
);

export const PageSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-10 w-64" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
    <OverviewSkeleton />
    <Skeleton className="h-10 w-full" />
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-10 w-full" />
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} className="h-12 w-full" />
    ))}
  </div>
);
