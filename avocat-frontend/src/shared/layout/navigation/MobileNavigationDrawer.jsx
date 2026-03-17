import React, { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";
import { useSidebar } from "@shared/contexts/SidebarContext";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { sidebarGroups } from "@config/sidebar";
import { useSecurity } from "@shared/security/SecurityContext";
import { hasAny, hasPermission } from "@shared/security/permissions";
import ThemeToggle from "@shared/ui/ThemeToggle";
import LanguageToggle from "@shared/ui/language-toggle";
import { getTopNavOrderIndex, sortItemsByTopNavOrder } from "./navOrder";
import { AppNavLink } from "./AppNavLink";

const drawerVariants = {
  open: () => ({
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  }),
  closed: (rtl) => ({
    x: rtl ? 360 : -360,
    transition: { duration: 0.25, ease: "easeOut" },
  }),
};

const MobileNavigationDrawer = () => {
  const { t, isRTL } = useLanguage();
  const { permissions } = useSecurity();
  const { isMobileOpen, closeMobile } = useSidebar();

  useEffect(() => {
    closeMobile();
  }, [closeMobile]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isMobileOpen) closeMobile();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen, closeMobile]);

  useEffect(() => {
    if (isMobileOpen) {
      document.documentElement.classList.add("overflow-hidden");
      return () => document.documentElement.classList.remove("overflow-hidden");
    }
    document.documentElement.classList.remove("overflow-hidden");
  }, [isMobileOpen]);

  const isAllowed = (item) => {
    if (!item.requiredPermission) return true;
    return Array.isArray(item.requiredPermission)
      ? hasAny(permissions, item.requiredPermission)
      : hasPermission(permissions, item.requiredPermission);
  };

  const visibleGroups = sidebarGroups
    .map((group) => ({
      ...group,
      items: sortItemsByTopNavOrder(
        group.items
          .map((item) => ({ ...item, children: item.children?.filter((child) => isAllowed(child)) }))
          .filter((item) => isAllowed(item) && (!item.children || item.children.length > 0)),
      ),
    }))
    .filter((group) => group.items.length > 0)
    .sort((a, b) => {
      const firstAIndex = getTopNavOrderIndex(a.items[0]?.key);
      const firstBIndex = getTopNavOrderIndex(b.items[0]?.key);
      return firstAIndex - firstBIndex;
    });

  return (
    <AnimatePresence mode="wait">
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 z-[9998] bg-background/60 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            custom={isRTL}
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 start-0 z-[9999] flex h-full w-full max-w-[320px] flex-col border-e border-border bg-card text-foreground shadow-2xl md:hidden"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Avocat</p>
                <p className="text-xs text-muted-foreground">{t("common.dashboard")}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={closeMobile} aria-label={t("common.close")}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
              {visibleGroups.map((group) => (
                <div key={group.key} className="space-y-2">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {t(`sidebar.sections.${group.key}`)}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      if (item.children?.length) {
                        return (
                          <div key={item.key} className="space-y-1">
                            <p className="text-xs font-semibold text-foreground px-3 py-1">{t(item.labelKey)}</p>
                            {item.children.map((child) => {
                              const Icon = child.icon;
                              return (
                                <AppNavLink
                                  key={child.key}
                                  to={child.path}
                                  onClick={closeMobile}
                                  className={({ isActive }) =>
                                    cn(
                                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                      isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    )
                                  }
                                >
                                  <Icon className="h-4 w-4" />
                                  <span>{t(child.labelKey)}</span>
                                </AppNavLink>
                              );
                            })}
                          </div>
                        );
                      }

                      const Icon = item.icon;
                      return (
                        <AppNavLink
                          key={item.key}
                          to={item.path}
                          onClick={closeMobile}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )
                          }
                        >
                          <Icon className="h-4 w-4" />
                          <span>{t(item.labelKey)}</span>
                        </AppNavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer with toggles */}
            <div className="border-t border-border/70 p-4 flex items-center justify-between gap-3 bg-muted/20">
              <ThemeToggle size="sm" className="header-action-btn" />
              <LanguageToggle size="sm" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigationDrawer;