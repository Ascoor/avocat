import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut", staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const glowA =
  "radial-gradient(110% 110% at 12% 18%, hsl(var(--accent) / 0.18), transparent 55%)";
const glowB =
  "radial-gradient(110% 110% at 88% 22%, hsl(var(--primary) / 0.16), transparent 58%)";

const SectionHeader = ({
  listName,
  subtitle,
  icon,
  showBack = true,
  backLabel = "رجوع",
  actions,
  className,
  sticky = false,
}) => {
  const navigate = useNavigate();
  const { isRTL, t } = useLanguage();

  const onBack = () => navigate(-1);

  // optional: smart subtitle fallback
  const resolvedSubtitle = useMemo(() => subtitle || "", [subtitle]);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/70 bg-[hsl(var(--card)/0.78)] shadow-sm backdrop-blur",
        sticky && "sticky top-16 z-20", // sticks under main Header (height 64px)
        className,
      )}
    >
      {/* Animated glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.4 }}
        style={{ background: `${glowA}, ${glowB}` }}
      />

      {/* Soft noise / sheen line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--accent)/0.35)] to-transparent"
      />

      <div className={cn("relative p-4 sm:p-6")}>
        <div className={cn("flex items-center gap-3 sm:gap-4", isRTL && "flex-row-reverse")}>
          {/* Icon */}
          <AnimatePresence>
            {icon && (
              <motion.div
                variants={item}
                className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border/60 bg-[hsl(var(--background)/0.55)] shadow-sm sm:h-14 sm:w-14",
                )}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {typeof icon === "string" ? (
                  <img src={icon} alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
                ) : (
                  icon
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Title + subtitle */}
          <motion.div variants={item} className={cn("min-w-0 flex-1", isRTL ? "text-right" : "text-left")}>
            <h2 className="truncate text-lg font-extrabold tracking-tight text-foreground sm:text-xl md:text-2xl" title={listName}>
              {listName}
            </h2>

            <AnimatePresence initial={false}>
              {resolvedSubtitle && (
                <motion.p
                  key="subtitle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="mt-1 line-clamp-1 text-sm text-muted-foreground"
                  title={resolvedSubtitle}
                >
                  {resolvedSubtitle}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Back + Actions (desktop) */}
          <motion.div
            variants={item}
            className={cn("hidden sm:flex items-center gap-2", isRTL && "flex-row-reverse")}
          >
            {actions}

            {showBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className={cn(
                  "bg-[hsl(var(--background)/0.55)]",
                  isRTL ? "flex-row-reverse" : "flex-row",
                )}
              >
                <ArrowLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
                <span className="mx-2">{backLabel || t?.("common.back") || "رجوع"}</span>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Actions (mobile row) */}
        <AnimatePresence initial={false}>
          {(actions || showBack) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={cn(
                "mt-3 flex flex-wrap items-center gap-2 sm:hidden",
                isRTL && "justify-end",
              )}
            >
              {actions}

              {showBack && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className={cn(
                    "bg-[hsl(var(--background)/0.55)]",
                    isRTL ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <ArrowLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
                  <span className="mx-2">{backLabel || t?.("common.back") || "رجوع"}</span>
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SectionHeader;
