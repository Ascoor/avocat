import React from "react";
import { Outlet } from "react-router-dom";
import AppShell from "@shared/layout/AppShell";

const Dashboard = () => {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};

export default Dashboard;
