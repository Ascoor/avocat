import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@app/store/store';
import { AlertProvider } from '@shared/contexts/AlertContext';
import { AuthProvider } from '@shared/contexts/AuthContext';
import { LanguageProvider } from '@shared/contexts/LanguageContext';
import { SecurityProvider } from '@shared/security/SecurityContext';

export const AppProviders = ({ children }) => (
  <LanguageProvider>
    <AlertProvider>
      <ReduxProvider store={store}>
        <AuthProvider>
          <SecurityProvider>{children}</SecurityProvider>
        </AuthProvider>
      </ReduxProvider>
    </AlertProvider>
  </LanguageProvider>
);
