import React from "react";
import { Outlet } from "react-router-dom";
import DashboardShell from "@shared/layout/shells/DashboardShell";

const DashboardShellPage = () => {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
};

export default DashboardShellPage;
