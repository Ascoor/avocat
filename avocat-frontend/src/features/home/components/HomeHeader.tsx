import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Globe, LogIn } from "lucide-react";

import {LogoPatren,LogoBlue} from "@/assets/images" 
import { useLanguage } from "@/shared/contexts/LanguageContext";
import { useTheme } from "@/shared/contexts/ThemeContext";

const navKeys = [
  { key: "nav.home", path: "/" },
  { key: "nav.about", path: "/about" },
  { key: "nav.services", path: "/services" },
  { key: "nav.industries", path: "/industries" },
  { key: "nav.team", path: "/team" },
  { key: "nav.insights", path: "/insights" },
  { key: "nav.contact", path: "/contact" },
];

const HomeHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const headerBg = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
    : "bg-transparent";

  const logo = theme === "dark" ? LogoPatren : LogoBlue;

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="shrink-0">
            <img src={logo} alt="أفوكات" className="h-10 md:h-12 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navKeys.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground hover:bg-surface-elevated"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-surface-elevated transition-colors"
              title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">{language === "ar" ? "EN" : "عربي"}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface-elevated transition-colors"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Client login placeholder */}
            <button
              className="hidden md:flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm text-foreground/60 hover:text-foreground hover:bg-surface-elevated transition-colors"
              title={t("nav.clientLogin")}
              onClick={() => {}}
            >
              <LogIn className="h-4 w-4" />
            </button>

            <Link
              to="/book"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-all hover:brightness-110 glow-red"
            >
              {t("nav.book")}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg pt-20 lg:hidden">
          <nav className="container flex flex-col gap-1 py-6">
            {navKeys.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-surface-elevated"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              to="/book"
              className="mt-4 flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold"
            >
              {t("nav.book")}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default HomeHeader;