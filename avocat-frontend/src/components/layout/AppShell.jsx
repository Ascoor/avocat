import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  const location = useLocation();

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
            <AnimatePresence mode="wait">
              <motion.div
                key={`${location.pathname}${location.search}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="dashboard-inner"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <MobileDrawer />
    </div>
  );
};

export default AppShell;
