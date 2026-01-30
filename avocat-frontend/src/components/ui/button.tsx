import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary/95 to-primary-glow text-primary-foreground shadow-[0_4px_10px_-2px_hsl(var(--primary-glow)/0.4),0_1px_3px_hsl(var(--primary)/0.4)] hover:shadow-[0_8px_20px_-4px_hsl(var(--primary-glow)/0.45)] hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-gradient-to-b from-accent-foreground/90 to-accent text-accent-foreground shadow-[0_4px_10px_-2px_hsl(var(--accent)/0.4)] hover:shadow-[0_8px_20px_-4px_hsl(var(--accent)/0.45)] hover:scale-[1.02]",
        gold:
          "bg-gradient-to-b from-[hsl(var(--gold)/1)] to-[hsl(var(--gold-muted)/1)] text-[hsl(var(--foreground)/1)] shadow-[0_4px_15px_-4px_hsl(var(--gold)/0.4)] hover:shadow-[0_8px_25px_-6px_hsl(var(--gold)/0.5)] hover:scale-[1.03] after:absolute after:inset-0 after:rounded-xl after:bg-[radial-gradient(circle_at_30%_30%,hsl(45_100%_70%_/_0.4),transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
        premium:
          "bg-gradient-to-r from-[hsl(45_100%_55%)] via-[hsl(45_90%_50%)] to-[hsl(45_100%_60%)] text-[hsl(var(--foreground)/1)] shadow-[0_6px_16px_-4px_hsl(45_100%_55%_/_0.4)] hover:shadow-[0_10px_30px_-8px_hsl(45_100%_60%_/_0.5)] hover:scale-[1.04] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-transparent before:translate-x-[-120%] hover:before:translate-x-[120%] before:transition-transform before:duration-\[800ms\]  before:ease-out",
        glass:
          "backdrop-blur-md bg-white/10 border border-white/15 text-white shadow-[0_4px_16px_-6px_rgba(255,255,255,0.3)] hover:bg-white/15 hover:shadow-[0_8px_24px_-6px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-[background,box-shadow,transform]",
        chromatic:
          "relative overflow-hidden border border-border/50 text-text-strong bg-[hsl(var(--background)/1)] shadow-[inset_0_1px_0_hsl(var(--foreground)/0.1),0_1px_2px_hsl(var(--foreground)/0.1)] hover:shadow-[0_4px_12px_hsl(var(--accent)/0.25)] hover:text-accent-foreground hover:border-accent transition-all before:absolute before:inset-0 before:opacity-0 before:bg-[linear-gradient(110deg,hsl(200_80%_60%)_0%,hsl(280_80%_60%)_50%,hsl(45_100%_60%)_100%)] before:transition-opacity before:duration-500 hover:before:opacity-100",
        exclusive:
          "relative isolate overflow-hidden bg-[hsl(var(--exclusive)/1)] text-[hsl(var(--exclusive-foreground)/1)] shadow-[0_16px_40px_-18px_hsl(var(--exclusive)/0.55)] ring-1 ring-white/10 hover:shadow-[0_28px_55px_-25px_hsl(var(--exclusive-glow)/0.65)] hover:scale-[1.05] transition-[transform,box-shadow] before:absolute before:inset-0 before:-z-10 before:opacity-80 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_20%_20%,hsl(var(--exclusive-glow)/0.35),transparent_65%)] before:transition-opacity before:duration-500 hover:before:opacity-100 after:absolute after:inset-[1px] after:-z-20 after:rounded-[inherit] after:bg-[linear-gradient(135deg,hsl(var(--exclusive-muted)/0.3),transparent_55%,hsl(var(--exclusive-glow)/0.25))] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
        hero:
          "bg-gradient-hero text-white shadow-[0_8px_24px_-6px_hsl(220_60%_10%_/_0.4)] hover:shadow-[0_12px_36px_-8px_hsl(220_60%_10%_/_0.5)] hover:scale-[1.04] transition-transform font-bold uppercase tracking-wide",
        outline:
          "border border-border bg-transparent text-text-strong shadow-[inset_0_1px_0_hsl(var(--foreground)/0.05)] hover:border-accent hover:bg-accent-soft hover:text-accent-foreground hover:shadow-[0_4px_16px_-8px_hsl(var(--accent)/0.3)]",
        luxury: "bg-gradient-primary text-primary-foreground hover:bg-primary-glow shadow-luxury hover:scale-105",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };