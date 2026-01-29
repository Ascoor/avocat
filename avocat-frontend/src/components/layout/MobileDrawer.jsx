
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { sidebarGroups } from "@/config/sidebar";
import LegalIcon from "@/components/common/LegalIcon";

const drawerVariants = {
  open: (rtl) => ({
    x: 0,
    transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
  }),
  closed: (rtl) => ({
    x: rtl ? 320 : -320,
    transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
  }),
};

const MobileDrawer = () => {
  const { t, isRTL } = useLanguage();
  const { isMobileOpen, closeMobile } = useSidebar();

  useEffect(() => {
    closeMobile();
  }, [closeMobile]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isMobileOpen) {
        closeMobile();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen, closeMobile]);

  useEffect(() => {
    if (isMobileOpen) {
      document.documentElement.classList.add("overflow-hidden");
      return () => {
        document.documentElement.classList.remove("overflow-hidden");
      };
    }
    document.documentElement.classList.remove("overflow-hidden");
  }, [isMobileOpen]);

  return (
    <AnimatePresence mode="wait">
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className={cn(
              "fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-base ease-smooth md:hidden"
            )}
          />
          <motion.aside
            custom={isRTL}
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={cn(
              "fixed inset-y-0 z-[9999] flex h-full w-full max-w-[360px] flex-col border border-border bg-surface-overlay/90 backdrop-blur-2xl shadow-elegant transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden",
              isRTL ? "right-0" : "left-0"
            )}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between border-b border-border bg-surface-raised/80 px-4 py-3">
              <BrandLogo variant="full" className="h-8" />
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobile}
                className="h-9 w-9 rounded-full border border-border/80 text-foreground transition duration-base ease-comfort hover:-translate-y-0.5 hover:bg-brand-primary/10 hover:text-brand-primary hover:shadow-soft"
                aria-label={t("common.close")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
              {sidebarGroups.map((group) => (
                <div key={group.key} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70 dark:text-foreground/80">
                    {t(`sidebar.sections.${group.key}`)}
                  </p>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <MobileNavItem key={item.key} item={item} onNavigate={closeMobile} t={t} />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
