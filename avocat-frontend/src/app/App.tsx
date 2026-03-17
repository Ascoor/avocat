import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  HomeRoutePage,
  LoginRoutePage,
  PublicContentRoutePage,
  SignupRoutePage,
} from '@pages/public/PublicRoutePages';
import { publicContentRouteMap } from '@routes/publicRoutes';
import { appRoutes } from '@routes/appRoutes';
import { DashboardShellRoutePage } from '@pages/dashboard/DashboardRoutePages';
import AuthRoutes from "@app/routes/AuthRoutes";
import { useAuth } from "@shared/contexts/AuthContext";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { RouteProviders } from '@providers';

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
    return <Navigate to={`${appRoutes.login}?next=${encodeURIComponent(nextPath)}`} replace />;
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
    const nextUrl = new URLSearchParams(location.search).get("next") || appRoutes.dashboardBase;
    return <Navigate to={nextUrl} replace />;
  }

  return children;
};

const App = () => {
  return (
    <RouteProviders>
      <Routes>
        <Route path={appRoutes.home} element={<HomeRoutePage />} />
        {publicContentRouteMap.map(({ path, pageKey }) => (
          <Route
            key={path}
            path={path}
            element={<PublicContentRoutePage pageKey={pageKey} />}
          />
        ))}
        <Route
          path={appRoutes.login}
          element={
            <RedirectIfAuth>
              <LoginRoutePage />
            </RedirectIfAuth>
          }
        />
        <Route
          path={appRoutes.signup}
          element={
            <RedirectIfAuth>
              <SignupRoutePage />
            </RedirectIfAuth>
          }
        />
        <Route
          path={appRoutes.dashboardWildcard}
          element={
            <RequireAuth>
              <DashboardShellRoutePage />
            </RequireAuth>
          }
        >
          <Route path="*" element={<AuthRoutes />} />
        </Route>
        <Route path="*" element={<Navigate to={appRoutes.home} replace />} />
      </Routes>
    </RouteProviders>
  );
};

export default App;
