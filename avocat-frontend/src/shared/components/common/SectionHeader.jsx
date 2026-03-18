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
    typeof IconComponent === "function" ? <IconComponent className="h-5 w-5 text-accent" /> : IconComponent;

  const renderPrimaryAction =
    primaryAction ||
    (onPrimaryAction ? <AddActionButton onClick={onPrimaryAction} label={actionLabel} /> : null);

  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      dir={isRTL ? "rtl" : "ltr"}
      className={cn("section-chrome p-4 sm:p-5 lg:p-6", className)}
    >
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          {renderedIcon && (
            <div className="premium-icon-shell h-12 w-12 shrink-0 sm:h-14 sm:w-14">
              {typeof renderedIcon === "string" ? (
                <img src={renderedIcon} alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
              ) : (
                <div className="text-accent">{renderedIcon}</div>
              )}
            </div>
          )}

          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip-soft uppercase tracking-[0.18em] text-[11px]">
                {sectionKey || (isRTL ? "لوحة القسم" : "Section workspace")}
              </span>
              {badge}
            </div>

            <div>
              <h2 className="truncate text-xl font-extrabold leading-tight tracking-tight text-foreground sm:text-2xl">
                {heading}
              </h2>
              {subheading && (
                <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-muted-foreground sm:text-[0.95rem]">
                  {subheading}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="premium-action-strip flex flex-wrap items-center gap-2 p-2 sm:gap-3 sm:p-2.5 lg:justify-end">
          {renderPrimaryAction}
          {secondaryActions}
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}

          {showBack && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(-1)}
              className="rounded-xl px-3.5"
            >
              <span className="text-xs font-bold">{backLabel || dynamicBackLabel}</span>
              <BackIcon className={cn("h-4 w-4", isRTL ? "mr-1" : "ml-1")} />
            </Button>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SectionHeader;
