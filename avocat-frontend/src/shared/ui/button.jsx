import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@shared/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-bg))] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-fg))] shadow-custom-md hover:-translate-y-0.5 hover:shadow-custom-lg",
        outline:
          "border border-[hsl(var(--color-border))] bg-transparent text-[hsl(var(--color-text))] hover:border-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary))]",
        ghost:
          "bg-transparent text-[hsl(var(--color-muted))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))]",
        glass:
          "border border-[hsl(var(--color-glass))]/15 bg-[hsl(var(--color-glass))]/10 text-[hsl(var(--color-glass))] backdrop-blur-md shadow-[0_10px_30px_-18px_hsl(0_0%_0%_/_0.6)] hover:bg-[hsl(var(--color-glass))]/20",
        destructive:
          "bg-[hsl(var(--color-danger))] text-[hsl(var(--color-primary-fg))] hover:bg-[hsl(var(--color-danger))]/90",
        premium:
          "bg-gradient-to-r from-[hsl(var(--color-primary))] via-[hsl(var(--color-accent))] to-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-fg))] shadow-gold-glow hover:-translate-y-0.5 hover:shadow-gold",
        gold:
          "bg-gradient-to-b from-[hsl(var(--gold))] to-[hsl(var(--gold-muted))] text-[hsl(var(--foreground))] shadow-gold hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
