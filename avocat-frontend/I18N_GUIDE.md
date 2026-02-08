# i18n Guide (AR/EN)

## Source files
- `src/shared/locales/en.js`
- `src/shared/locales/ar.js`

## Unified API
- `src/shared/i18n/index.ts`
  - `t(key, params?)` – translation lookup with simple `{{token}}` interpolation
  - `getLanguage()` – reads persisted language
  - `setLanguage(lang)` – updates storage + internal state

## Context usage
- `LanguageContext` wraps the app and exposes:
  - `language`, `setLanguage`
  - `direction`, `isRTL`
  - `t(key, params)`

## Adding new translations
1. Add keys to `en.js` and `ar.js`.
2. Use `t("namespace.key")` in components.
3. For interpolation, use `{{token}}` placeholders and pass values:
   - `t("settings.serviceTypes.pageStatus", { current, total })`
