import React from "react";
import { Menu, X, UserCircle, Settings, User, LogOut, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils"; 

const Header = ({ title, className, showSidebarToggle = true }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const { isMobileOpen, toggleMobile, isCollapsed, toggleCollapsed } = useSidebar();

  const toggleLang = () => setLanguage(language === "ar" ? "en" : "ar");
  const toggleLabel =
    language === "ar"
      ? t("language.switchToEnglish")
      : t("language.switchToArabic");

  return (
    <header className={cn(
      "sticky top-0 z-40 h-16 border-b border-border",
      "bg-surface-raised/80 shadow-card backdrop-blur-xl transition duration-long ease-comfort",
      className
    )}>
      <div className={cn("relative z-[1] flex h-full w-full items-center justify-between", "px-3 sm:px-4 lg:px-6")}>
        
        {/* يسار/يمين حسب اللغة */}
        <div className={cn("flex items-center gap-3", isRTL ? "flex-row-reverse" : "flex-row")}>
          {/* زر القائمة للموبايل */}
          <Button
            variant="glass"
            size="icon"
            onClick={toggleMobile}
            className="h-9 w-9 rounded-full border border-border/80 text-foreground/80 transition duration-base ease-comfort hover:-translate-y-0.5 hover:bg-brand-primary/10 hover:text-brand-primary hover:shadow-soft md:hidden dark:text-foreground"
            aria-label={isMobileOpen ? t("common.close") : t("common.menu")}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* زر تصغير/تكبير الشريط الجانبي (ديسكتوب فقط) */}
          {showSidebarToggle && (
            <Button
              variant="glass"
              size="icon"
              onClick={toggleCollapsed}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-border/80 text-foreground/80 transition duration-base ease-comfort hover:-translate-y-0.5 hover:bg-brand-primary/10 hover:text-brand-primary hover:shadow-soft md:flex dark:text-foreground"
              aria-label={isCollapsed ? t("common.expand") : t("common.collapse")}
            >
              <PanelLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed ? "rotate-0" : isRTL ? "- rotate-180" : "rotate-180"
                )}
              />
            </Button>
          )}

          {/* <div className="flex items-center gap-3">
            <BrandLogo variant="icon" className="h-8 w-8 md:hidden" />
            {title && (
              <h1 className="hidden text-lg font-semibold text-foreground sm:block">
                {title}
              </h1>
            )}
          </div> */}
        </div>

        {/* يمين الهيدر */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          <Button
            onClick={toggleLang}
            variant="outline"
            size="sm"
            className="rounded-full border border-border/70 px-3 py-2 text-sm font-medium transition duration-base ease-comfort hover:-translate-y-0.5 hover:bg-brand-primary/10 hover:text-brand-primary hover:shadow-soft"
          >
            {toggleLabel}
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="glass"
                  size="sm"
                  className="flex items-center gap-2 rounded-full border border-border/80 text-foreground/80 transition duration-base ease-comfort hover:-translate-y-0.5 hover:bg-brand-primary/10 hover:text-brand-primary hover:shadow-soft dark:text-foreground"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <UserCircle className="h-5 w-5" />
                  </div>
                  <div className="hidden flex-col items-start md:flex">
                    <span className="text-sm font-medium">
                      {user.name || t("common.demoUser")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user?.role
                        ? t(`roles.${user.role}`, {
                            fallback:
                              user.role.charAt(0).toUpperCase() +
                              user.role.slice(1),
                          })
                        : t("roles.default")}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {user.name || t("common.demoUser")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || t("common.demoEmail")}
                    </p>
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
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={logout}>
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
