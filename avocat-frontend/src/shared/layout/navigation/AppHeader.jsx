import React from "react";
import { Menu, LogOut, Settings, User, Bell, Plus, Search } from "lucide-react";
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
import ThemeToggle from "@shared/ui/ThemeToggle";
import LanguageToggle from "@shared/ui/language-toggle";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { useAuth } from "@shared/contexts/AuthContext";
import { useSidebar } from "@shared/contexts/SidebarContext";
import { cn } from "@shared/lib/utils";

const AppHeader = ({ title, className }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { isMobileOpen, toggleMobile } = useSidebar();
  return (
    <header className={cn("header-shell sticky top-0 z-40 border-b border-border/50 bg-background/85 backdrop-blur-md", className)}>
      <div className="mx-auto flex min-h-16 w-full max-w-[100vw] items-center gap-2 px-3 py-2 sm:px-6 lg:px-8">
        <Button variant="outline" size="icon" onClick={toggleMobile} className="h-9 w-9 xl:hidden" aria-label={isMobileOpen ? t("common.close") : t("common.menu")}>
          <Menu className="h-4 w-4" />
        </Button>

        <div className="hidden lg:flex flex-1 max-w-xl items-center rounded-xl border border-border bg-card/70 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input aria-label="بحث" placeholder="بحث سريع عن قضية، عميل، عقد، فاتورة..." className="w-full bg-transparent px-2 text-sm outline-none" />
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/dashboard/legcases" className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground"><Plus className="h-4 w-4" /> قضية جديدة</Link>
          <Link to="/dashboard/reports/procedures" className="inline-flex items-center gap-1 rounded-xl border border-border px-3 py-2 text-sm">مهمة جديدة</Link>
        </div>

        <div className="me-auto flex items-center gap-1.5">
          <Button variant="outline" size="icon" className="h-9 w-9" aria-label="الإشعارات"><Bell className="h-4 w-4" /></Button>
          <ThemeToggle surface="header" size="sm" className="header-action-btn shrink-0" />
          <LanguageToggle surface="header" size="sm" className="shrink-0" />
          {user && <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="header-user-trigger"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary">{user.name?.slice(0, 1) || "A"}</span></Button></DropdownMenuTrigger><DropdownMenuContent className="w-56" align="end"><DropdownMenuLabel><div className="flex flex-col space-y-1"><p className="text-sm font-medium text-foreground">{user.name || t("common.demoUser")}</p><p className="text-xs text-muted-foreground">{user?.email || t("common.demoEmail")}</p></div></DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem><User className="me-2 h-4 w-4" />{t("common.profile")}</DropdownMenuItem><DropdownMenuItem><Settings className="me-2 h-4 w-4" />{t("common.settings")}</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive" onClick={logout}><LogOut className="me-2 h-4 w-4" />{t("common.signOut")}</DropdownMenuItem></DropdownMenuContent></DropdownMenu>}
        </div>
      </div>
      <div className="px-3 pb-2 text-xs text-muted-foreground sm:px-6 lg:px-8">الرئيسية / {title || 'لوحة التحكم'}</div>
    </header>
  );
};

export default AppHeader;
