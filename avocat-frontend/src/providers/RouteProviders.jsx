import React from 'react';
import { SidebarProvider } from '@shared/contexts/SidebarContext';
import { SpinnerProvider } from '@shared/contexts/SpinnerContext';
import { ThemeProvider } from '@shared/contexts/ThemeContext';

export const RouteProviders = ({ children }) => (
  <ThemeProvider>
    <SpinnerProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </SpinnerProvider>
  </ThemeProvider>
);
