import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@shared/contexts/SidebarContext";
import { ThemeProvider } from "@shared/contexts/ThemeContext";
import HomePage from "@features/home/pages/HomePage";
import PublicContentPage from "@features/home/pages/PublicContentPage";
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
            <Route path="/about" element={<PublicContentPage pageKey="about" />} />
            <Route path="/services" element={<PublicContentPage pageKey="services" />} />
            <Route path="/services/:id" element={<PublicContentPage pageKey="serviceDetails" />} />
            <Route path="/industries" element={<PublicContentPage pageKey="industries" />} />
            <Route path="/team" element={<PublicContentPage pageKey="team" />} />
            <Route path="/insights" element={<PublicContentPage pageKey="insights" />} />
            <Route path="/insights/:id" element={<PublicContentPage pageKey="articleDetails" />} />
            <Route path="/contact" element={<PublicContentPage pageKey="contact" />} />
            <Route path="/book" element={<PublicContentPage pageKey="book" />} />
            <Route path="/privacy" element={<PublicContentPage pageKey="privacy" />} />
            <Route path="/terms" element={<PublicContentPage pageKey="terms" />} />
            <Route path="/disclaimer" element={<PublicContentPage pageKey="disclaimer" />} />
            <Route path="/client-portal" element={<PublicContentPage pageKey="clientPortal" />} />
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
