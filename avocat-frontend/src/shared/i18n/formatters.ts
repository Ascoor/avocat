/**
 * Locale-aware formatting helpers for dates and numbers.
 *
 * ## How to use
 * ```ts
 * import { formatDate, formatNumber, formatCurrency } from '@shared/i18n/formatters';
 *
 * formatDate('2025-03-15', 'ar');   // "١٥ مارس ٢٠٢٥"
 * formatNumber(1234.5, 'en');       // "1,234.5"
 * formatCurrency(500, 'ar');        // "٥٠٠٫٠٠ ج.م."
 * ```
 *
 * ## How RTL/LTR is applied
 * The LanguageContext sets `document.documentElement.dir` on every language change.
 * All components inherit direction from that root attribute.
 * Tables, pagination arrows, and icon directions automatically mirror via
 * `isRTL` provided by `useLanguage()`.
 */

const LOCALE_MAP: Record<string, string> = {
  ar: 'ar-EG',
  en: 'en-US',
};

const resolveLocale = (lang: string) => LOCALE_MAP[lang] ?? lang;

/**
 * Format a date string or Date object using locale-aware Intl.DateTimeFormat.
 */
export const formatDate = (
  value: string | Date | null | undefined,
  lang: string = 'ar',
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!value) return '-';
  try {
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat(resolveLocale(lang), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    }).format(date);
  } catch {
    return String(value);
  }
};

/**
 * Format a number using locale-aware Intl.NumberFormat.
 */
export const formatNumber = (
  value: number | string | null | undefined,
  lang: string = 'ar',
  options?: Intl.NumberFormatOptions,
): string => {
  if (value === null || value === undefined) return '-';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);
  return new Intl.NumberFormat(resolveLocale(lang), options).format(num);
};

/**
 * Format currency (EGP default).
 */
export const formatCurrency = (
  value: number | string | null | undefined,
  lang: string = 'ar',
  currency: string = 'EGP',
): string => {
  return formatNumber(value, lang, { style: 'currency', currency });
};
