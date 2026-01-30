import React from "react";
import { cn } from "@/lib/utils";

interface AppCardProps {
  className?: string;
  children: React.ReactNode;
}

export function AppCard({ className, children }: AppCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-5 shadow-soft transition duration-base ease-smooth hover:shadow-glass",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-white/5 dark:via-white/2" />
      <div className="relative space-y-2 text-sm text-neutral-700 dark:text-neutral-100">{children}</div>
    </div>
  );
}

export default AppCard;
