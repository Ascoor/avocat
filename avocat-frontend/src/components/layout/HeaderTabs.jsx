import React, { useMemo } from "react";
import { ChevronDown } from "lucide-react";

import { NavLink } from "./NavLink";
import { sidebarGroups } from "@/config/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TabLink = ({ to, children, className }) => (
  <NavLink
    to={to}
    className={cn(
      "inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
      className,
    )}
    activeClassName="bg-[hsl(var(--muted))] text-[hsl(var(--primary))]"
  >
    {children}
  </NavLink>
);

const HeaderTabs = ({ className }) => {
  const { t, isRTL } = useLanguage();
  const groups = useMemo(() => sidebarGroups, []);

  const topItems = useMemo(() => {
    const all = [];
    for (const group of groups) {
      for (const item of group.items) all.push(item);
    }
    return all;
  }, [groups]);

  return (
    <div
      className={cn(
        "header-tabs w-full",
        isRTL ? "flex-row-reverse justify-end" : "justify-start",
        className,
      )}
    >
      {topItems.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const Icon = item.icon;

        if (!hasChildren) {
          return (
            <TabLink key={item.key} to={item.path} className="shrink-0">
              {Icon && <Icon className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />}
              <span className="truncate">{t(item.labelKey)}</span>
            </TabLink>
          );
        }

        return (
          <DropdownMenu key={item.key}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "shrink-0 inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                )}
              >
                {Icon && <Icon className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />}
                <span className="truncate">{t(item.labelKey)}</span>
                <ChevronDown className={cn("h-4 w-4", isRTL ? "mr-2" : "ml-2")} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align={isRTL ? "start" : "end"} className="min-w-56">
              {item.children.map((child) => {
                const ChildIcon = child.icon;
                return (
                  <DropdownMenuItem key={child.key} asChild>
                    <NavLink
                      to={child.path}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm",
                        isRTL && "flex-row-reverse",
                      )}
                      activeClassName="bg-[hsl(var(--muted))]"
                    >
                      {ChildIcon && <ChildIcon className="h-4 w-4" />}
                      <span className="truncate">{t(child.labelKey)}</span>
                    </NavLink>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
};

export default HeaderTabs;
