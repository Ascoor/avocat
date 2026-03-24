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

import { Link  } from 'react-router-dom';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { LogoPatren, LogoBlue } from '@/assets/images';
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

  const { theme, toggleTheme } = useTheme();
  const logo = theme === 'dark' ? LogoPatren : LogoBlue;
  return (
    <header className={cn("header-shell sticky top-0 z-40", className)}>
      <div className="mx-auto flex min-h-16 w-full items-center justify-between gap-2 px-3 py-2 sm:px-6 lg:px-8">
      <Link to="/" className="shrink-0">
            <img src={logo} alt={t('publicSite.footer.firmName')} className="h-10 md:h-12 w-auto" />
          </Link>
  <div className="flex min-w-0 flex-row-reverse items-center gap-2 sm:gap-3">

          <Button
            variant="outline"
            size="icon"
            onClick={toggleMobile}
            className="header-action-btn md:hidden shrink-0"
            aria-label={isMobileOpen ? t("common.close") : t("common.menu")}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {showSidebarToggle && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleCollapsed}
              className="header-action-btn hidden md:flex shrink-0"
              aria-label={isCollapsed ? t("common.expand") : t("common.collapse")}
            >
              <PanelLeft className={cn("h-4 w-4 transition-transform", !isCollapsed && "-rotate-180")} />
            </Button>
          )}

          {title && (
            <div className="hidden sm:block min-w-0 text-start">
              <p className="text-xs text-muted-foreground">{t("common.workspace")}</p>
              <h1 className="text-sm sm:text-lg font-semibold text-foreground truncate">{title}</h1>
            </div>
          )}
        </div>

        <div className="hidden lg:flex flex-1 px-4 overflow-hidden">
          <HeaderTabs className="w-full justify-end" />
        </div>

        <div className="flex flex-row-reverse items-center gap-1.5 sm:gap-2">
          <ThemeToggle size="sm" className="header-action-btn shrink-0" />
          <LanguageToggle size="sm" className="shrink-0" />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 rounded-full">
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold shrink-0">
                    {user.name?.slice(0, 1) || "A"}
                  </span>

                  <span className="hidden md:flex flex-col items-start text-start">
                    <span className="text-sm font-semibold text-foreground">{user.name || t("common.demoUser")}</span>
                    <span className="text-xs text-muted-foreground">
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

      <div className="hidden md:block lg:hidden px-4 sm:px-6 pb-2 overflow-x-auto">
        <HeaderTabs />
      </div>
    </header>
  );
};

export default AppHeader;
