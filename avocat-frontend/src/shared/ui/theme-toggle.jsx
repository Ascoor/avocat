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
  hero: "border-white/40 text-white hover:bg-white/15",
  dark: "border-white/30 text-white hover:bg-white/10",
  light: "border-border text-foreground hover:bg-muted",
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
