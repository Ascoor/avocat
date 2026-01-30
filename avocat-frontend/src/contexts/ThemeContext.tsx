import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  manual: boolean;
}

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  syncWithSystem: () => void;
}

const STORAGE_KEY = "avocat_theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getPreferredTheme = (): ThemeState => {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  if (stored === "light" || stored === "dark") return { theme: stored, manual: true };

  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return { theme: prefersDark ? "dark" : "light", manual: false };
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<ThemeState>(() => getPreferredTheme());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(state.theme);
    root.style.colorScheme = state.theme;

    if (state.manual) window.localStorage.setItem(STORAGE_KEY, state.theme);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [state.theme, state.manual]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event: MediaQueryListEvent) => {
      setState((prev) => (prev.manual ? prev : { theme: event.matches ? "dark" : "light", manual: false }));
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((theme: Theme) => setState({ theme, manual: true }), []);
  const toggleTheme = useCallback(
    () => setState((prev) => ({ theme: prev.theme === "dark" ? "light" : "dark", manual: true })),
    [],
  );
  const syncWithSystem = useCallback(() => {
    if (typeof window === "undefined") return;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setState({ theme: prefersDark ? "dark" : "light", manual: false });
  }, []);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme: state.theme,
      resolvedTheme: state.theme,
      isDark: state.theme === "dark",
      setTheme,
      toggleTheme,
      syncWithSystem,
    }),
    [state.theme, setTheme, toggleTheme, syncWithSystem],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
