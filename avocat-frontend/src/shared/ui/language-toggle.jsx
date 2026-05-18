import React from "react";
import { Languages } from "lucide-react";

import { Button } from "./button";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { useTheme } from "@shared/contexts/ThemeContext";
import { cn } from "@shared/lib/utils";

/** Language switcher. Pass surface="header" inside AppHeader for matching chrome. */
const LanguageToggle = ({ size = "md", className = "", surface = "default" }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const isArabic = language === "ar";
  const isDark = theme === "dark";
  const isHeader = surface === "header";

  const toggleLanguage = () => {
    setLanguage(isArabic ? "en" : "ar");
  };

  const variant = isHeader ? (isDark ? "glass" : "outline") : "outline";

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={toggleLanguage}
      aria-label={isArabic ? t("language.english") : t("language.arabic")}
      title={isArabic ? t("language.english") : t("language.arabic")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-tight transition-transform duration-200 ease-out",
        isHeader && "header-lang-btn border shadow-sm backdrop-blur-sm",
        size === "sm" ? "h-8 px-2.5 text-xs" : "h-9 px-3 text-xs",
        !isHeader && [
          "border bg-background/80 shadow-sm backdrop-blur-sm",
          "hover:-translate-y-0.5 hover:shadow-md",
          "lang-toggle",
        ],
        className,
      )}
    >
      <Languages className="h-3.5 w-3.5 shrink-0 opacity-90 sm:h-4 sm:w-4" />
      <span className="leading-none">{isArabic ? t("language.switchToEnglish") : t("language.switchToArabic")}</span>
    </Button>
  );
};

export default LanguageToggle;
