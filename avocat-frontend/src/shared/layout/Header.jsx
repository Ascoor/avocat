import React from "react";
import { Menu, PanelLeft, LogOut, Settings, User, Languages, SunMoon } from "lucide-react";
import { Button } from "@shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@shared/ui/dropdown-menu";

import ThemeToggle from "@shared/ui/theme-toggle";
import LanguageToggle from "@shared/ui/language-toggle";
import HeaderTabs from "@shared/layout/HeaderTabs";

import { useLanguage } from "@shared/contexts/LanguageContext";
import { useAuth } from "@shared/contexts/AuthContext";
import { useSidebar } from "@shared/contexts/SidebarContext";
import { cn } from "@shared/lib/utils";

const Header = ({ title, className, showSidebarToggle = false }) => {
  const { language, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const { isMobileOpen, toggleMobile, isCollapsed, toggleCollapsed } = useSidebar();

  const toggleLabel = language === "ar" ? t("language.switchToEnglish") : t("language.switchToArabic");

  return (
    <header className={cn("header-shell sticky top-0 z-40 overflow-x-clip", className)}>
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_auto] items-center gap-3 px-3 py-2 sm:px-5 lg:grid-cols-[minmax(0,280px)_1fr_auto] lg:gap-4 lg:px-8">
        {/* LEFT */}
        <div className={cn("flex min-w-0 items-center gap-2 sm:gap-3", isRTL ? "flex-row-reverse" : "flex-row")}>
          {/* Mobile drawer toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMobile}
            className="md:hidden"
            aria-label={isMobileOpen ? t("common.close") : t("common.menu")}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {showSidebarToggle && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleCollapsed}
              className="hidden md:flex"
              aria-label={isCollapsed ? t("common.expand") : t("common.collapse")}
            >
              <PanelLeft className={cn("h-4 w-4 transition-transform", !isCollapsed && (isRTL ? "-rotate-180" : "rotate-180"))} />
            </Button>
          )}

          {/* Title */}
          {title && (
            <div className="hidden min-w-0 sm:block text-start">
              <p className="text-sm text-muted-foreground">{t("common.workspace")}</p>
              <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
            </div>
          )}
        </div>

        {/* MIDDLE (Tabs) - desktop only */}
        <div className="hidden min-w-0 lg:flex lg:px-2">
          <HeaderTabs className={cn("w-full", isRTL ? "justify-end" : "justify-start")} />
        </div>

        {/* RIGHT */}
        <div className={cn("flex items-center justify-self-end gap-2 sm:gap-3", isRTL && "flex-row-reverse")}>
          <div className="hidden sm:flex items-center gap-2">
            <div className="tab-pill px-2 py-1">
              <ThemeToggle />
            </div>
            <div className="tab-pill px-2 py-1">
              <LanguageToggle />
            </div>
          </div>

          <div className="sm:hidden flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label={t("common.switchToDark")}>
              <SunMoon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label={toggleLabel}>
              <Languages className="h-4 w-4" />
            </Button>
          </div>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {user.name?.slice(0, 1) || "A"}
                  </span>

                  <span className="hidden flex-col items-start text-left sm:flex">
                    <span className="text-sm font-semibold">{user.name || t("common.demoUser")}</span>
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
                    <p className="text-sm font-medium">{user.name || t("common.demoUser")}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || t("common.demoEmail")}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {t("common.profile")}
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {t("common.settings")}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-destructive" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {t("common.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-3 pb-2 sm:px-5 lg:hidden lg:px-8">
        <HeaderTabs mobile />
      </div>
    </header>
  );
};

export default Header;
