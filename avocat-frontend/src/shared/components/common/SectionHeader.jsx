import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useLanguage } from "@shared/contexts/LanguageContext";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";

const SectionHeader = ({
  listName,
  subtitle,
  icon,
  showBack = true,
  backLabel = "رجوع",
  actions,
  className,
}) => {
  const navigate = useNavigate();
  const { isRTL, t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/70 bg-[hsl(var(--card)/0.82)] p-4 shadow-sm backdrop-blur sm:p-6",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            "radial-gradient(120% 120% at 10% 15%, hsl(var(--accent)/0.18), transparent 55%), radial-gradient(120% 120% at 90% 20%, hsl(var(--primary)/0.16), transparent 60%)",
        }}
      />

      <div className={cn("relative flex items-center gap-3 sm:gap-4", isRTL && "flex-row-reverse")}>
        {icon && (
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border/60 bg-[hsl(var(--background)/0.55)] shadow-sm sm:h-14 sm:w-14"
          >
            {typeof icon === "string" ? (
              <img src={icon} alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
            ) : (
              icon
            )}
          </motion.div>
        )}

        <div className={cn("min-w-0 flex-1", isRTL ? "text-right" : "text-left")}>
          <h2 className="truncate text-lg font-extrabold tracking-tight text-foreground sm:text-xl md:text-2xl">
            {listName}
          </h2>
          {subtitle && <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>

        {actions && <div className={cn("hidden sm:flex items-center gap-2", isRTL && "flex-row-reverse")}>{actions}</div>}

        {showBack && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className={cn("shrink-0 bg-[hsl(var(--background)/0.55)]", isRTL ? "flex-row-reverse" : "flex-row")}
          >
            <ArrowLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
            <span className="mx-2">{backLabel || t?.("common.back") || "رجوع"}</span>
          </Button>
        )}
      </div>

      {actions && <div className={cn("relative mt-3 flex flex-wrap gap-2 sm:hidden", isRTL && "justify-end")}>{actions}</div>}
    </motion.section>
  );
};

export default SectionHeader;
