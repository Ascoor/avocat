import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardShell from "@/components/layout/DashboardShell";

const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome"));
const CasesPage = lazy(() => import("@/pages/dashboard/CasesPage"));
const ClientsPage = lazy(() => import("@/pages/dashboard/ClientsPage"));
const CourtsPage = lazy(() => import("@/pages/dashboard/CourtsPage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        {t("common.checkingSession")}
      </div>
    );
  }

  if (!isAuthenticated) {
    const nextPath = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?next=${encodeURIComponent(nextPath)}`} replace />;
  }

  return children;
};

const RedirectIfAuth = ({ children }) => {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return children;
  }

  if (isAuthenticated) {
    const nextUrl = new URLSearchParams(location.search).get("next") || "/dashboard";
    return <Navigate to={nextUrl} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="p-6 text-muted">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <Signup />
            </RedirectIfAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardShell />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="courts" element={<CourtsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<div className="p-6 text-muted">Not found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
