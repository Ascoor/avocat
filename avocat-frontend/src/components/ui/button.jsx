import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-custom-md hover:-translate-y-0.5 hover:shadow-custom-lg",
        outline:
          "border border-border bg-transparent text-foreground hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]",
        ghost: "bg-transparent text-foreground/70 hover:bg-muted hover:text-foreground",
        glass:
          "border border-white/15 bg-white/10 text-white backdrop-blur-md shadow-[0_10px_30px_-18px_hsl(0_0%_0%_/_0.6)] hover:bg-white/20",
        destructive:
          "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive))]/90",
        premium:
          "bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--gold))] to-[hsl(var(--primary-glow))] text-[hsl(var(--primary-foreground))] shadow-gold-glow hover:-translate-y-0.5 hover:shadow-gold",
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
