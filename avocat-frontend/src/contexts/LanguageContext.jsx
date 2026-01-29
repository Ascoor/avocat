import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '@/locales/en';
import ar from '@/locales/ar';

const LanguageContext = createContext(null);
const translations = { en, ar };

const getNestedValue = (source, key) =>
  key.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), source);

const interpolate = (text, values) =>
  text.replace(/\{(\w+)\}/g, (_, token) => values?.[token] ?? `{${token}}`);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'ar';
    return localStorage.getItem('language') || 'ar';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';

  const value = useMemo(() => {
    const t = (key, options = {}) => {
      const localeData = translations[language] || translations.ar;
      const resolved = getNestedValue(localeData, key);
      if (resolved == null) {
        return options.fallback ?? key;
      }
      if (typeof resolved === 'string') {
        return interpolate(resolved, options.values);
      }
      if (typeof resolved === 'function') {
        return resolved(options);
      }
      return resolved;
    };

    return {
      language,
      setLanguage,
      direction,
      isRTL,
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
