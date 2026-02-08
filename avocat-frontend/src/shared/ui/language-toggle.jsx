import React from "react";
import { Globe } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { useLanguage } from "@shared/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("common.language")} className="h-9 w-9">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-muted" : ""}>
          {t("language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ar")} className={language === "ar" ? "bg-muted" : ""}>
          {t("language.arabic")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
