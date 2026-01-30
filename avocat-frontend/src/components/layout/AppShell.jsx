import React from "react";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import Header from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 280;

const AppShell = ({ children, title, className, showSidebarToggle = true }) => {
  const { direction } = useLanguage();
  const { isCollapsed } = useSidebar();

  const sidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <div dir={direction} className={cn("dashboard-shell", className)}>
      <Header title={title} showSidebarToggle={showSidebarToggle} />

      <div className="dashboard-layout">
        <aside
          className="hidden md:block"
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />
        </aside>

        <div className="dashboard-content">
          <main className="dashboard-scroll">
            <div className="dashboard-inner">{children}</div>
          </main>
        </div>
      </div>

      <MobileDrawer />
    </div>
  );
};

export default AppShell;
