import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-blue.png";
import { useLanguage } from "@/shared/contexts/LanguageContext";
import { useTheme } from "@/shared/contexts/ThemeContext";

const HomeFooter = () => {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const logo = theme === "dark" ? logoDark : logoLight;

  const quickLinks = [
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.team"), path: "/team" },
    { label: t("nav.insights"), path: "/insights" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  const serviceLinks = lang === "ar"
    ? ["القضايا المدنية والتجارية", "تأسيس الشركات", "العقود", "التحكيم", "الاستشارات المستمرة"]
    : ["Civil & Commercial Cases", "Company Formation", "Contracts", "Arbitration", "Legal Retainers"];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="أفوكات" className="h-12 w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t("footer.brand")}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>{t("footer.workingHoursValue")}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">{t("footer.quickLinks")}</h4>
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
            <h4 className="font-bold text-foreground mb-4">{t("footer.ourServices")}</h4>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>{lang === "ar" ? "[عنوان المكتب]" : "[Office Address]"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>{lang === "ar" ? "[رقم الهاتف]" : "[Phone Number]"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>{lang === "ar" ? "[البريد الإلكتروني]" : "[Email Address]"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-4">
          <p className="text-[11px] text-muted-foreground/60 text-center mb-3">{t("footer.disclaimer")}</p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} {lang === "ar" ? "مكتب أفوكات للمحاماة" : "Avocat Law Firm"}. {t("footer.rights")}</span>
            <div className="flex gap-4">
              <Link to="#" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link>
              <Link to="#" className="hover:text-primary transition-colors">{t("footer.terms")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
