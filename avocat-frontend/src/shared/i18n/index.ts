import en from "@shared/locales/en";
import ar from "@shared/locales/ar";

type LanguageCode = "en" | "ar";

type TranslationTable = typeof en;

const STORAGE_KEY = "lang";
const LEGACY_STORAGE_KEY = "language";
const FALLBACK_LANGUAGE: LanguageCode = "en";
const DEFAULT_LANGUAGE: LanguageCode = "ar";

const translations: Record<LanguageCode, TranslationTable> = { en, ar };

const getNestedValue = (source: Record<string, any>, key: string) =>
  key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), source);

const interpolate = (text: string, values?: Record<string, string | number>) =>
  text.replace(/\{\{(\w+)\}\}/g, (_, token) => String(values?.[token] ?? `{{${token}}}`));

let currentLanguage: LanguageCode = DEFAULT_LANGUAGE;

export const getLanguage = (): LanguageCode => {
  if (typeof window === "undefined") return currentLanguage;
  const stored = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (stored === "en" || stored === "ar") {
    currentLanguage = stored;
  }
  return currentLanguage;
};

export const setLanguage = (lang: LanguageCode) => {
  currentLanguage = lang;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
  return currentLanguage;
};

type TranslateOptions =
  | Record<string, string | number>
  | {
      values?: Record<string, string | number>;
      fallback?: string;
    };

export const t = (key: string, params?: TranslateOptions) => {
  const lang = getLanguage();
  const primaryTable = translations[lang] ?? translations[FALLBACK_LANGUAGE];
  const fallbackTable = translations[FALLBACK_LANGUAGE];

  const resolved = getNestedValue(primaryTable, key) ?? getNestedValue(fallbackTable, key);

  const resolvedValues = params && typeof params === "object" && "values" in params ? params.values : params;
  const values =
    resolvedValues && typeof resolvedValues === "object"
      ? (resolvedValues as Record<string, string | number>)
      : undefined;
  const fallback =
    params && typeof params === "object" && "fallback" in params ? params.fallback : undefined;

  if (resolved == null) return fallback ?? key;
  if (typeof resolved === "string") return interpolate(resolved, values);
  if (typeof resolved === "function") return resolved({ values, fallback });
  return resolved;
};
