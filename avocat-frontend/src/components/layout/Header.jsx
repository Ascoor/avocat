import React from "react";
import { Menu, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import ThemeToggle from "@/components/ui/theme-toggle";
import LanguageToggle from "@/components/ui/language-toggle";
import HeaderTabs from "@/components/layout/HeaderTabs";

import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

const Header = ({ title, className }) => {
  const { language, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const { isMobileOpen, toggleMobile } = useSidebar();

  const toggleLabel = language === "ar" ? t("language.switchToEnglish") : t("language.switchToArabic");

  return (
    <header className={cn("header-shell sticky top-0 z-40", className)}>
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className={cn("flex items-center gap-3", isRTL ? "flex-row-reverse" : "flex-row")}>
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

          {/* Title */}
          {title && (
            <div className="hidden sm:block">
              <p className="text-sm text-muted-foreground">{t("common.workspace")}</p>
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            </div>
          )}
        </div>

        {/* MIDDLE (Tabs) - desktop only */}
        <div className="hidden lg:flex flex-1 px-4">
          <HeaderTabs className={cn("w-full", isRTL ? "justify-end" : "justify-start")} />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageToggle />

          <Button variant="outline" size="sm" className="hidden sm:inline-flex" aria-label={toggleLabel}>
            {toggleLabel}
          </Button>

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
    </header>
  );
};

export default Header;
