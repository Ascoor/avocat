import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@shared/utils/SidebarContext";
import { ThemeProvider } from "@shared/contexts/ThemeContext";
import HomePage from "@features/home/pages/HomePage";
import Login from "@features/auth/pages/Login";
import Signup from "@features/auth/pages/Signup";
import DashboardPage from "@features/dashboard/pages/DashboardPage";
import AuthRoutes from "@app/routes/AuthRoutes";
import { useAuth } from "@shared/contexts/AuthContext";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { SpinnerProvider } from "@shared/contexts/SpinnerContext";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
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

const App = () => {
  return (
    <ThemeProvider>
      <SpinnerProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
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
              path="/dashboard/*"
              element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              }
            >
              <Route path="*" element={<AuthRoutes />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SidebarProvider>
      </SpinnerProvider>
    </ThemeProvider>
  );
};

export default App;
