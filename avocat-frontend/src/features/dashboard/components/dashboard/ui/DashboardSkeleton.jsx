import React from 'react';

const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-16 rounded-2xl border border-border bg-muted" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-32 rounded-2xl border border-border bg-muted" />
      ))}
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-80 rounded-2xl border border-border bg-muted" />
      ))}
    </div>
  </div>
);

export default DashboardSkeleton;
