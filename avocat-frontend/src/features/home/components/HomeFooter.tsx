import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

import { LogoBlue, LogoPatren } from '@/assets/images';
import { useLanguage } from '@/shared/contexts/LanguageContext';
import { useTheme } from '@/shared/contexts/ThemeContext';

const HomeFooter = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const logo = theme === 'dark' ? LogoPatren : LogoBlue;

  const quickLinks = [
    { label: t('publicSite.nav.about'), path: '/about' },
    { label: t('publicSite.nav.services'), path: '/services' },
    { label: t('publicSite.nav.team'), path: '/team' },
    { label: t('publicSite.nav.insights'), path: '/insights' },
    { label: t('publicSite.nav.contact'), path: '/contact' },
    { label: t('publicSite.nav.clientLogin'), path: '/client-portal' },
  ];

  const serviceLinks = t('publicSite.footer.serviceLinks');

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt={t('publicSite.footer.firmName')} className="h-12 w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t('publicSite.footer.brand')}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>{t('publicSite.footer.workingHoursValue')}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">{t('publicSite.footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">{t('publicSite.footer.ourServices')}</h4>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">{t('publicSite.footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>{t('publicSite.footer.addressPlaceholder')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>{t('publicSite.footer.phonePlaceholder')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>{t('publicSite.footer.emailPlaceholder')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-4">
          <p className="text-[11px] text-muted-foreground/60 text-center mb-3">{t('publicSite.footer.disclaimer')}</p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} {t('publicSite.footer.firmName')}. {t('publicSite.footer.rights')}</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-primary transition-colors">{t('publicSite.footer.privacy')}</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">{t('publicSite.footer.terms')}</Link>
              <Link to="/disclaimer" className="hover:text-primary transition-colors">{language === 'en' ? 'Legal Disclaimer' : 'إخلاء المسؤولية'}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
