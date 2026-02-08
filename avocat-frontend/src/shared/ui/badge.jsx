import React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@shared/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        secondary: "border-transparent bg-muted text-muted-foreground",
        outline: "border-border text-foreground",
        gold: "border-transparent bg-[hsl(var(--gold))] text-[hsl(var(--foreground))]",
        destructive: "border-transparent bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
