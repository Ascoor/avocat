export type AppLanguageCode = 'en' | 'ar';

/**
 * Text direction for UI layout (tabs, nav, document root).
 * Arabic → RTL; English → LTR.
 */
export function getTextDirection(language: AppLanguageCode): 'ltr' | 'rtl' {
  return language === 'ar' ? 'rtl' : 'ltr';
}

export function isRTLLanguage(language: AppLanguageCode): boolean {
  return language === 'ar';
}
