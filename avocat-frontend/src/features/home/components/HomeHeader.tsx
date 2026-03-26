import { useState, useEffect, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, LogIn, LayoutDashboard } from 'lucide-react';

import { LogoPatren, LogoBlue } from '@/assets/images';
import { useLanguage } from '@/shared/contexts/LanguageContext';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { useAuth } from '@/shared/contexts/AuthContext';
import { scrollToSection } from '../utils/smoothScroll';

const navItems = [
  { key: 'publicSite.nav.home', path: '/', sectionId: 'hero' },
  { key: 'publicSite.nav.about', path: '/about', sectionId: 'why' },
  { key: 'publicSite.nav.services', path: '/services', sectionId: 'services' },
  { key: 'publicSite.nav.industries', path: '/industries', sectionId: 'industries' },
  { key: 'publicSite.nav.team', path: '/team', sectionId: 'team' },
  { key: 'publicSite.nav.insights', path: '/insights', sectionId: 'insights' },
  { key: 'publicSite.nav.contact', path: '/contact', sectionId: 'cta' },
];

const HomeHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { language, setLanguage, t, direction } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const headerBg = scrolled || !isHome
    ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
    : 'bg-transparent';

  const authActionPath = isAuthenticated ? '/dashboard' : '/login';
  const authActionKey = isAuthenticated ? 'common.dashboard' : 'publicSite.nav.clientLogin';
  const AuthActionIcon = isAuthenticated ? LayoutDashboard : LogIn;

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, item: (typeof navItems)[number]) => {
    if (!item.sectionId) return;

    if (location.pathname === '/') {
      event.preventDefault();
      scrollToSection(item.sectionId);
      return;
    }

    event.preventDefault();
    navigate(`/#${item.sectionId}`);
  };

  const logo = theme === 'dark' ? LogoPatren : LogoBlue;

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBg}`} dir={direction}>
        <div className="container flex items-center justify-between gap-3 min-w-0 h-16 md:h-20">
          <Link to="/" className="shrink-0">
            <img src={logo} alt={t('publicSite.footer.firmName')} className="h-10 md:h-12 w-auto" />
          </Link>

          <nav
            dir={direction}
            className="hidden lg:flex flex-1 min-w-0 items-center justify-start gap-1 overflow-x-auto overflow-y-visible py-1 [scrollbar-width:thin] scroll-smooth touch-pan-x"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`shrink-0 px-3 py-2.5 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground hover:bg-surface-elevated'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-surface-elevated transition-colors"
              title={language === 'ar' ? t('language.english') : t('language.arabic')}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">
                {language === 'ar' ? t('language.switchToEnglish') : t('language.switchToArabic')}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface-elevated transition-colors"
              title={theme === 'dark' ? t('common.switchToLight') : t('common.switchToDark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link
              to={authActionPath}
              className="hidden md:inline-flex items-center gap-2 rounded-lg border border-border/70 bg-muted/35 px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted/55 hover:border-border hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              title={t(authActionKey)}
            >
              <AuthActionIcon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              <span className="whitespace-nowrap">{t(authActionKey)}</span>
            </Link>

            <Link to="/book" className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-all hover:brightness-110 glow-red">
              {t('publicSite.nav.book')}
            </Link>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground" aria-label={t('common.menu')}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg pt-20 lg:hidden">
          <nav
            dir={direction}
            className="container flex flex-col gap-1 py-6 items-stretch text-start"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`px-4 py-3 text-lg font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:bg-surface-elevated'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              to={authActionPath}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-border/80 bg-muted/40 px-6 py-3 text-foreground font-semibold shadow-sm transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]"
            >
              <AuthActionIcon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              {t(authActionKey)}
            </Link>
            <Link to="/book" className="flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold">
              {t('publicSite.nav.book')}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default HomeHeader;
