import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";
import { useSidebar } from "@shared/contexts/SidebarContext";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { sidebarGroups } from "@config/sidebar";

const drawerVariants = {
  open: (rtl) => ({
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  }),
  closed: (rtl) => ({
    x: rtl ? 360 : -360,
    transition: { duration: 0.25, ease: "easeOut" },
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
            className={cn("fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden")}
          />
          <motion.aside
            custom={isRTL}
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 start-0 z-[9999] flex h-full w-full max-w-[360px] flex-col border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text))] shadow-custom-xl md:hidden"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <div>
                <p className="text-sm font-semibold">Avocat</p>
                <p className="text-xs text-sidebar-text-muted">{t("common.dashboard")}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={closeMobile} aria-label={t("common.close")}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
              {sidebarGroups.map((group) => (
                <div key={group.key} className="space-y-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sidebar-text-muted">
                    {t(`sidebar.sections.${group.key}`)}
                  </p>
                  <div className="space-y-2">
                    {group.items.map((item) => {
                      if (item.children?.length) {
                        return (
                          <div key={item.key} className="space-y-2">
                            <p className="text-xs font-semibold text-sidebar-foreground">{t(item.labelKey)}</p>
                            {item.children.map((child) => {
                              const Icon = child.icon;
                              return (
                                <NavLink
                                  key={child.key}
                                  to={child.path}
                                  onClick={closeMobile}
                                  className={({ isActive }) =>
                                    cn(
                                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                                      isActive
                                        ? "bg-[hsl(var(--sidebar-item-active-bg))] text-[hsl(var(--sidebar-primary))]"
                                        : "text-sidebar-text-muted",
                                    )
                                  }
                                >
                                  <Icon className="h-4 w-4" />
                                  <span>{t(child.labelKey)}</span>
                                </NavLink>
                              );
                            })}
                          </div>
                        );
                      }

                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.key}
                          to={item.path}
                          onClick={closeMobile}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                              isActive
                                ? "bg-[hsl(var(--sidebar-item-active-bg))] text-[hsl(var(--sidebar-primary))]"
                                : "text-sidebar-text-muted",
                            )
                          }
                        >
                          <Icon className="h-4 w-4" />
                          <span>{t(item.labelKey)}</span>
                        </NavLink>
                      );
                    })}
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
