import React from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@shared/contexts/ThemeContext";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { cn } from "@shared/lib/utils";

import { Button } from "./button";

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

const ThemeToggle = ({ tone, className }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  const resolvedTone = tone ?? (isDark ? "dark" : "light");
  const variant = themeToggleToneVariantMap[resolvedTone];
  const toneClasses = themeToggleToneClassMap[resolvedTone];

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? t("common.switchToLight") : t("common.switchToDark")}
      className={cn("rounded-full", toneClasses, className)}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;
