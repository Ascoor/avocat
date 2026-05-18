import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import MobileNavigationDrawer from "../navigation/MobileNavigationDrawer";
import AppHeader from "../navigation/AppHeader";
import { cn } from "@shared/lib/utils";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { useAuth } from "@shared/contexts/AuthContext";

const DashboardShell = ({ children, title, className, showSidebarToggle = false }) => {
  const { direction, t } = useLanguage();
  const { isDemoSession } = useAuth();
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.search]);

  return (
    <div dir={direction} className={cn("dashboard-shell", className)}>
      <AppHeader title={title} showSidebarToggle={showSidebarToggle} />

      {isDemoSession && (
        <div className="border-b border-primary/25 bg-primary/10 px-3 py-2 text-center text-xs text-foreground sm:text-sm">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" aria-hidden />
            {t("common.demoModeBanner")}
          </span>
        </div>
      )}

      <div className="dashboard-layout">
        <div className="dashboard-content">
          <main ref={scrollRef} className="dashboard-scroll">
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
