import React from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@shared/contexts/ThemeContext";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { cn } from "@shared/lib/utils";

import { Button } from "./button";

const sizeClassMap = {
  sm: "h-8 w-8 min-h-8 min-w-8",
  md: "h-9 w-9 min-h-9 min-w-9",
  lg: "h-10 w-10 min-h-10 min-w-10",
};

const themeToggleToneVariantMap = {
  hero: "glass",
  dark: "glass",
  light: "outline",
};

const themeToggleToneClassMap = {
  hero: "border-[hsl(var(--color-glass))]/40 text-[hsl(var(--color-glass))] hover:bg-[hsl(var(--color-glass))]/15",
  dark: "border-[hsl(var(--color-glass))]/30 text-[hsl(var(--color-glass))] hover:bg-[hsl(var(--color-glass))]/10",
  light: "border-[hsl(var(--color-border))] text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-surface-2))]",
};

/** Theme / light-dark control. Pass surface="header" inside AppHeader for matching chrome. */
const ThemeToggle = ({ tone, size = "md", className = "", surface = "default" }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  const isHeader = surface === "header";
  const resolvedTone = tone ?? (isDark ? "dark" : "light");
  const variant = isHeader
    ? isDark
      ? "glass"
      : "outline"
    : themeToggleToneVariantMap[resolvedTone];
  const toneClasses = isHeader ? "" : themeToggleToneClassMap[resolvedTone];
  const sizeClasses = sizeClassMap[size] ?? sizeClassMap.md;

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? t("common.switchToLight") : t("common.switchToDark")}
      title={isDark ? t("common.switchToLight") : t("common.switchToDark")}
      className={cn("rounded-full", toneClasses, sizeClasses, className)}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300 ease-out" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 ease-out" />
      )}
    </Button>
  );
};

export default ThemeToggle;
