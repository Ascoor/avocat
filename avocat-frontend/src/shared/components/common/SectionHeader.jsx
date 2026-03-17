import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { resolvePageChrome } from "@shared/config/pageChromeConfig";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";
import AddActionButton from "./AddActionButton";

const SectionHeader = ({
  sectionKey,
  listName,
  title,
  subtitle,
  icon,
  showBack = true,
  backLabel,
  primaryActionLabel,
  onPrimaryAction,
  primaryAction,
  actions,
  secondaryActions,
  badge,
  className,
}) => {
  const navigate = useNavigate();
  const { isRTL } = useLanguage();

  const config = resolvePageChrome(sectionKey);
  const heading = title || listName || config?.title;
  const subheading = subtitle || config?.subtitle;
  const actionLabel = primaryActionLabel || config?.primaryActionLabel;
  const dynamicBackLabel = isRTL ? "رجوع" : "Back";
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;
  const IconComponent = icon || config?.icon;
  const renderedIcon =
    typeof IconComponent === "function" ? (
      <IconComponent className="h-5 w-5 text-accent" />
    ) : (
      IconComponent
    );

  const renderPrimaryAction =
    primaryAction ||
    (onPrimaryAction ? <AddActionButton onClick={onPrimaryAction} label={actionLabel} /> : null);

  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--surface-overlay))]",
        "p-4 sm:p-5 shadow-custom-lg backdrop-blur-md",
        className,
      )}
    >
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          {renderedIcon && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-background/40 shadow-gold-glow/5 sm:h-12 sm:w-12">
              {typeof renderedIcon === "string" ? (
                <img src={renderedIcon} alt="" className="h-7 w-7 object-contain" />
              ) : (
                <div className="text-accent">{renderedIcon}</div>
              )}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-lg font-extrabold tracking-tight text-foreground sm:text-xl leading-tight">{heading}</h2>
              {badge}
            </div>
            {subheading && <p className="mt-1 line-clamp-2 text-xs font-medium text-muted-foreground/80 sm:text-sm">{subheading}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:justify-end">
          {renderPrimaryAction}
          {secondaryActions}
          {actions && <div className="flex items-center gap-2">{actions}</div>}

          {showBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="h-9 rounded-lg border-border/50 bg-background/50 px-3 hover:bg-accent/10 hover:text-accent transition-all"
            >
              <span className="text-xs font-bold">{backLabel || dynamicBackLabel}</span>
              <BackIcon className={cn("h-4 w-4", isRTL ? "mr-2" : "ml-2")} />
            </Button>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SectionHeader;
