import React from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

import type { ButtonProps } from "./button";
import { Button } from "./button";

export type ThemeToggleTone = "hero" | "dark" | "light";

export const themeToggleToneVariantMap: Record<ThemeToggleTone, ButtonProps["variant"]> = {
  hero: "glass",
  dark: "glass",
  light: "outline",
};

export const themeToggleToneClassMap: Record<ThemeToggleTone, string> = {
  hero: "border-white/60 text-white hover:bg-white/15 shadow-[0_18px_48px_-20px_rgba(15,23,42,0.65)] ring-1 ring-white/20",
  dark: "border-white/40 text-white hover:bg-white/10",
  light: "border-border text-foreground hover:bg-muted/40",
};

interface ThemeToggleProps {
  tone?: ThemeToggleTone;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ tone, className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const resolvedTone: ThemeToggleTone = tone ?? (isDark ? "dark" : "light");
  const variant = themeToggleToneVariantMap[resolvedTone];
  const toneClasses = themeToggleToneClassMap[resolvedTone];

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light" : "Switch to Dark"}
      className={cn(
        "rounded-full transition-all duration-300",
        toneClasses,
        className,
      )}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;
