import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import MobileNavigationDrawer from "../navigation/MobileNavigationDrawer";
import AppHeader from "../navigation/AppHeader";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { cn } from "@shared/lib/utils";

const DashboardShell = ({ children, title, className, showSidebarToggle = false }) => {
  const { direction } = useLanguage();
  const location = useLocation();

  return (
    <div dir={direction} className={cn("dashboard-shell", className)}>
      <AppHeader title={title} showSidebarToggle={showSidebarToggle} />

      <div className="dashboard-layout">
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

      <MobileNavigationDrawer />
    </div>
  );
};

export default DashboardShell;
