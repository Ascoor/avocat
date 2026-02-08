import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getLanguage, setLanguage as setStoredLanguage, t as translate } from '@shared/i18n';

const LanguageContext = createContext(null);

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
      return translate(key, options);
    };

    return {
      language,
      setLanguage: (nextLanguage) => setLanguage(setStoredLanguage(nextLanguage)),
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
