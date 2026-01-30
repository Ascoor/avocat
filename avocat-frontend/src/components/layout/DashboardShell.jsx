import React from "react";
import { Outlet } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardShell = () => {
  const { direction } = useLanguage();

  return (
    <div dir={direction} className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 opacity-60 dark:opacity-40">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative flex">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Topbar />

          <main className="p-4 md:p-6">
            <div className="mx-auto w-full max-w-[1200px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;
