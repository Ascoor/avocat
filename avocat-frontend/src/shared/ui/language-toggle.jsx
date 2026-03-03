import React from "react";
import { Languages } from "lucide-react";

import { Button } from "./button";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { cn } from "@shared/lib/utils";

const LanguageToggle = ({ size = "md", className = "" }) => {
  const { language, setLanguage, t } = useLanguage();
  const isArabic = language === "ar";

  const toggleLanguage = () => {
    setLanguage(isArabic ? "en" : "ar");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      aria-label={isArabic ? t("language.english") : t("language.arabic")}
      className={cn(
        "lang-toggle rounded-full border bg-background/80 shadow-sm backdrop-blur-sm",
        "hover:-translate-y-0.5 hover:shadow-md",
        size === "sm" ? "h-8 px-2.5" : "h-9 px-3",
        className,
      )}
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-semibold leading-none">{isArabic ? t("language.switchToEnglish") : t("language.switchToArabic")}</span>
    </Button>
  );
};

export default LanguageToggle;
