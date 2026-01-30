import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { NavLink } from "./NavLink";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { sidebarGroups } from "@/config/sidebar";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { t, isRTL } = useLanguage();
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const [openGroups, setOpenGroups] = useState(["work_follow", "customer_service", "settings"]);

  const isOpen = !isCollapsed;

  const groups = useMemo(() => sidebarGroups, []);

  const toggleGroup = (groupKey) => {
    setOpenGroups((prev) =>
      prev.includes(groupKey) ? prev.filter((key) => key !== groupKey) : [...prev, groupKey],
    );
  };

  return (
    <aside
      className={cn(
        "sidebar-shell fixed top-16 z-30 h-[calc(100vh-4rem)] border-sidebar-border bg-[hsl(var(--sidebar-background))] text-sidebar-foreground transition-all duration-300 md:static",
        isRTL ? "right-0 border-l" : "left-0 border-r",
        !isOpen && "md:w-[4.5rem]",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="sidebar-brand flex items-center justify-between gap-3 p-4">
          <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}> 
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))]">
              <span className="text-lg font-bold">A</span>
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Avocat</span>
                <span className="text-xs text-sidebar-text-muted">{t("common.dashboard")}</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className={cn("hidden h-8 w-8 md:flex", !isOpen && "rotate-180")}
            aria-label={isCollapsed ? t("common.expand") : t("common.collapse")}
          >
            {isRTL ? (
              isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            ) : isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="sidebar-scroll flex-1 space-y-6 overflow-y-auto p-4">
          {groups.map((group) => (
            <div key={group.key} className="space-y-3">
              {isOpen && (
                <p className="sidebar-group-label text-[0.65rem]">{t(`sidebar.sections.${group.key}`)}</p>
              )}

              <div className="space-y-2">
                {group.items.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  if (!hasChildren) {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.key}
                        to={item.path}
                        className={cn(
                          "sidebar-nav-item group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                          !isOpen && "justify-center",
                        )}
                        activeClassName="bg-[hsl(var(--sidebar-item-active-bg))] text-[hsl(var(--sidebar-primary))] shadow-sidebar-item"
                      >
                        <Icon className="h-5 w-5" />
                        {isOpen && <span className="truncate">{t(item.labelKey)}</span>}
                      </NavLink>
                    );
                  }

                  const isExpanded = isOpen && openGroups.includes(item.key);
                  const Icon = item.icon;

                  return (
                    <div key={item.key} className="space-y-2">
                      <button
                        type="button"
                        onClick={() => isOpen && toggleGroup(item.key)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-text-muted transition-all hover:text-sidebar-foreground",
                          !isOpen && "justify-center",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {isOpen && (
                          <>
                            <span className="flex-1 truncate text-start">{t(item.labelKey)}</span>
                            <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                          </>
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn("space-y-1 overflow-hidden", isRTL ? "pr-3" : "pl-3")}
                          >
                            {item.children.map((child) => {
                              const ChildIcon = child.icon;
                              return (
                                <NavLink
                                  key={child.key}
                                  to={child.path}
                                  className={cn(
                                    "sidebar-subitem flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium",
                                  )}
                                  activeClassName="is-active"
                                >
                                  <ChildIcon className="h-4 w-4" />
                                  <span className="truncate">{t(child.labelKey)}</span>
                                </NavLink>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {isOpen && (
          <div className="sidebar-footer p-4">
            <div className="rounded-xl border border-sidebar-border bg-[hsl(var(--sidebar-accent))] p-3 text-xs text-sidebar-foreground">
              {t("common.supportNote")}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
