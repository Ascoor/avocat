import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SpinnerProvider } from "@/contexts/SpinnerContext";
import AppRoutes from "@/routes/AppRoutes";

const App = () => {
  return (
    <ThemeProvider>
      <SpinnerProvider>
        <AppRoutes />
      </SpinnerProvider>
    </ThemeProvider>
  );
};

export default App;
