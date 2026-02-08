import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme";
const LEGACY_STORAGE_KEY = "avocat_theme";

const ThemeContext = createContext(undefined);

const getPreferredTheme = () => {
  const stored =
    typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY)
      : null;
  if (stored === "light" || stored === "dark") return { theme: stored, manual: true };

  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return { theme: prefersDark ? "dark" : "light", manual: false };
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};

export const useThemeProvider = useTheme;

export const ThemeProvider = ({ children }) => {
  const [state, setState] = useState(() => getPreferredTheme());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(state.theme);
    root.dataset.theme = state.theme;
    root.style.colorScheme = state.theme;

    if (state.manual) {
      window.localStorage.setItem(STORAGE_KEY, state.theme);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  }, [state.theme, state.manual]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event) => {
      setState((prev) => (prev.manual ? prev : { theme: event.matches ? "dark" : "light", manual: false }));
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((theme) => setState({ theme, manual: true }), []);
  const toggleTheme = useCallback(
    () => setState((prev) => ({ theme: prev.theme === "dark" ? "light" : "dark", manual: true })),
    [],
  );
  const syncWithSystem = useCallback(() => {
    if (typeof window === "undefined") return;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setState({ theme: prefersDark ? "dark" : "light", manual: false });
  }, []);

  const value = useMemo(
    () => ({
      theme: state.theme,
      currentTheme: state.theme,
      resolvedTheme: state.theme,
      isDark: state.theme === "dark",
      setTheme,
      changeCurrentTheme: setTheme,
      toggleTheme,
      syncWithSystem,
    }),
    [state.theme, setTheme, toggleTheme, syncWithSystem],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
