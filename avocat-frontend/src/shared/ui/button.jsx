import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@shared/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden",
    "rounded-[var(--radius-lg)] border text-sm font-semibold tracking-[0.01em]",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
    "disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none disabled:opacity-45",
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-[hsl(var(--primary)/0.42)] text-[hsl(var(--primary-foreground))] shadow-primary-glow",
          "bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--primary-hover,var(--gold-light)))_100%)] hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.62)] hover:shadow-custom-xl",
          "before:bg-[linear-gradient(180deg,hsl(var(--foreground)/0.14),transparent_55%)] before:opacity-100",
        ].join(" "),
        primary: [
          "border-[hsl(var(--primary)/0.38)] text-[hsl(var(--primary-foreground))] shadow-primary-glow",
          "bg-[var(--gradient-cta)] hover:-translate-y-0.5 hover:border-[hsl(var(--accent)/0.4)] hover:shadow-custom-xl",
          "before:bg-[linear-gradient(180deg,hsl(var(--foreground)/0.14),transparent_55%)] before:opacity-100",
        ].join(" "),
        secondary: [
          "border-[hsl(var(--border)/0.82)] bg-[linear-gradient(180deg,hsl(var(--surface-raised)/0.96),hsl(var(--surface)/0.92))]",
          "text-[hsl(var(--foreground))] shadow-custom-md hover:-translate-y-0.5 hover:border-[hsl(var(--accent)/0.22)] hover:shadow-custom-lg",
          "before:bg-[linear-gradient(180deg,hsl(var(--foreground)/0.06),transparent_55%)] before:opacity-100",
        ].join(" "),
        outline: [
          "border-[hsl(var(--border)/0.82)] bg-[hsl(var(--background)/0.28)] text-[hsl(var(--foreground))]",
          "hover:-translate-y-0.5 hover:border-[hsl(var(--accent)/0.28)] hover:bg-[hsl(var(--surface-raised)/0.72)] hover:shadow-custom-md",
        ].join(" "),
        ghost: [
          "border-transparent bg-transparent text-[hsl(var(--muted-foreground))]",
          "hover:-translate-y-0.5 hover:bg-[hsl(var(--surface-raised)/0.68)] hover:text-[hsl(var(--foreground))]",
        ].join(" "),
        glass: [
          "border-[hsl(var(--border)/0.68)] bg-[hsl(var(--card)/0.52)] text-[hsl(var(--foreground))] backdrop-blur-xl",
          "shadow-custom-md hover:-translate-y-0.5 hover:border-[hsl(var(--accent)/0.24)] hover:bg-[hsl(var(--card)/0.72)] hover:shadow-custom-lg",
        ].join(" "),
        destructive: [
          "border-[hsl(var(--destructive)/0.32)] text-[hsl(var(--destructive-foreground))] shadow-danger-glow",
          "bg-[linear-gradient(135deg,hsl(var(--destructive))_0%,hsl(var(--destructive)/0.82)_100%)] hover:-translate-y-0.5 hover:border-[hsl(var(--destructive)/0.45)] hover:shadow-custom-xl",
          "before:bg-[linear-gradient(180deg,hsl(var(--foreground)/0.12),transparent_55%)] before:opacity-100",
        ].join(" "),
        danger: [
          "border-[hsl(var(--destructive)/0.32)] text-[hsl(var(--destructive-foreground))] shadow-danger-glow",
          "bg-[var(--gradient-danger)] hover:-translate-y-0.5 hover:border-[hsl(var(--blood-300)/0.4)] hover:shadow-custom-xl",
          "before:bg-[linear-gradient(180deg,hsl(var(--foreground)/0.12),transparent_55%)] before:opacity-100",
        ].join(" "),
        success: [
          "border-[hsl(var(--success)/0.26)] bg-[linear-gradient(180deg,hsl(var(--success)/0.92),hsl(var(--success)/0.82))] text-[hsl(var(--success-foreground))]",
          "shadow-[0_16px_34px_-20px_hsl(var(--success)/0.38)] hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-20px_hsl(var(--success)/0.42)]",
        ].join(" "),
        premium: [
          "border-[hsl(var(--accent)/0.24)] bg-[linear-gradient(135deg,hsl(var(--surface-raised)/0.98),hsl(var(--primary)/0.9))] text-[hsl(var(--primary-foreground))]",
          "shadow-primary-glow hover:-translate-y-0.5 hover:border-[hsl(var(--accent)/0.34)] hover:shadow-custom-xl",
          "before:bg-[radial-gradient(circle_at_top,hsl(var(--accent)/0.16),transparent_55%)] before:opacity-100",
        ].join(" "),
        dangerOutline: [
          "border-[hsl(var(--destructive)/0.28)] bg-[hsl(var(--destructive)/0.08)] text-[hsl(var(--destructive))]",
          "hover:-translate-y-0.5 hover:bg-[hsl(var(--destructive)/0.12)] hover:shadow-[0_16px_32px_-24px_hsl(var(--destructive)/0.28)]",
        ].join(" "),
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-9 w-9 p-0",
        "icon-lg": "h-11 w-11 p-0",
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
