import React from 'react';
import { SidebarProvider } from './utils/SidebarContext';
import ThemeProvider from './utils/ThemeContext';
import AuthWrapper from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import useAuth from './components/auth/AuthUser';

import { SpinnerProvider } from './context/SpinnerContext'; 

import './index.css';
const App = () => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        جاري التحقق من الجلسة...
      </div>
    );
  }

  return (
    <ThemeProvider>
      <SpinnerProvider>
        <SidebarProvider>
          {isAuthenticated ? <AuthWrapper /> : <HomePage />}
        </SidebarProvider>
      </SpinnerProvider>
    </ThemeProvider>
  );
};

export default App;
