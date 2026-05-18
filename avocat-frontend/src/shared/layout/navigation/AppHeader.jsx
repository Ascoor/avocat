import React from "react";
import { Menu, PanelLeft, LogOut, Settings, User } from "lucide-react";
import { Button } from "@shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@shared/ui/dropdown-menu";

import { Link } from "react-router-dom";
import { useTheme } from "@/shared/contexts/ThemeContext";
import { LogoPatren, LogoBlue } from "@/assets/images";
import ThemeToggle from "@shared/ui/ThemeToggle";
import LanguageToggle from "@shared/ui/language-toggle";
import HeaderTabs from "./HeaderTabs";

import { useLanguage } from "@shared/contexts/LanguageContext";
import { useAuth } from "@shared/contexts/AuthContext";
import { useSidebar } from "@shared/contexts/SidebarContext";
import { cn } from "@shared/lib/utils";

const AppHeader = ({ title, className, showSidebarToggle = false }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { isMobileOpen, toggleMobile, isCollapsed, toggleCollapsed } = useSidebar();

  const { theme } = useTheme();
  const logo = theme === "dark" ? LogoPatren : LogoBlue;
  return (
    <header className={cn("header-shell sticky top-0 z-40", className)}>
      <div className="header-toolbar-row mx-auto flex min-h-16 w-full max-w-[100vw] flex-wrap items-center gap-2 px-3 py-2 sm:gap-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:max-w-[min(420px,40vw)]">
          <Link to="/" className="shrink-0 transition-opacity hover:opacity-90">
            <img src={logo} alt={t("publicSite.footer.firmName")} className="h-9 w-auto md:h-11" />
          </Link>

          {title && (
            <div className="hidden min-w-0 sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {t("common.workspace")}
              </p>
              <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">{title}</h1>
            </div>
          )}
        </div>

        <div className="order-last hidden min-w-0 w-full lg:order-none lg:flex lg:max-w-none lg:flex-1 lg:justify-center">
          <HeaderTabs className="max-w-full" justify="center" />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMobile}
            className="header-action-btn h-8 w-8 shrink-0 sm:h-9 sm:w-9 md:hidden"
            aria-label={isMobileOpen ? t("common.close") : t("common.menu")}
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {showSidebarToggle && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleCollapsed}
              className="header-action-btn hidden h-8 w-8 shrink-0 md:flex sm:h-9 sm:w-9"
              aria-label={isCollapsed ? t("common.expand") : t("common.collapse")}
            >
              <PanelLeft className={cn("h-4 w-4 transition-transform", !isCollapsed && "-rotate-180")} />
            </Button>
          )}

          <ThemeToggle surface="header" size="sm" className="header-action-btn shrink-0" />
          <LanguageToggle surface="header" size="sm" className="shrink-0" />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="header-user-trigger flex items-center gap-1.5 rounded-full px-1.5 sm:gap-2 sm:px-2"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary sm:h-9 sm:w-9 sm:text-sm">
                    {user.name?.slice(0, 1) || "A"}
                  </span>

                  <span className="hidden min-w-0 flex-col items-start text-start md:flex">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {user.name || t("common.demoUser")}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.role
                        ? t(`roles.${user.role}`, {
                            fallback: user.role.charAt(0).toUpperCase() + user.role.slice(1),
                          })
                        : t("roles.default")}
                    </span>
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-foreground">{user.name || t("common.demoUser")}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || t("common.demoEmail")}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <User className="me-2 h-4 w-4" />
                  {t("common.profile")}
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="me-2 h-4 w-4" />
                  {t("common.settings")}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-destructive" onClick={logout}>
                  <LogOut className="me-2 h-4 w-4" />
                  {t("common.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="header-tabs-secondary hidden border-t border-border/40 px-3 py-2 md:block md:px-6 lg:hidden">
        <HeaderTabs />
      </div>
    </header>
  );
};

export default AppHeader;
