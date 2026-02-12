import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getLanguage,
  setLanguage as setStoredLanguage,
  t as translate,
} from '@shared/i18n';

const LanguageContext = createContext(null);

const humanizeTranslationKey = (key) => {
  if (typeof key !== 'string') return '';
  const lastSegment = key.split('.').pop() || key;
  return lastSegment
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => getLanguage());

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.dir = language === 'ar' ? 'rtl' : 'ltr';
    setStoredLanguage(language);
  }, [language]);

  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';

  const value = useMemo(() => {
    const t = (key, options = {}) => {
      const translatedValue = translate(key, options);
      if (typeof translatedValue !== 'string' || translatedValue !== key) {
        return translatedValue;
      }

      if (
        typeof options === 'object' &&
        'fallback' in options &&
        options.fallback
      ) {
        return options.fallback;
      }

      return humanizeTranslationKey(key);
    };

    return {
      language,
      setLanguage: (nextLanguage) =>
        setLanguage(setStoredLanguage(nextLanguage)),
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
