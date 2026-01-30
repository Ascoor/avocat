import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider } from './utils/SidebarContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardPage from './pages/DashboardPage';
import AuthRoutes from './components/layout/AuthRoutes';
import useAuth from './components/auth/AuthUser';
import { useLanguage } from './contexts/LanguageContext';
import { SpinnerProvider } from './contexts/SpinnerContext'; 

const App = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const { t } = useLanguage();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        {t('common.checkingSession')}
      </div>
    );
  }

  return (
    <ThemeProvider>
      <SpinnerProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
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
