# STYLE BASELINE (Step 2)

## What exists today
- **Tailwind CSS** is the primary utility system (`tailwind.config.ts`).
- **Global CSS** is aggregated in `src/styles/index.css` and imported from `src/main.tsx`.
- **Design tokens** are currently defined in `src/styles/theme-tokens.css` (HSL tokens + shadows + sidebar/header tokens).
- **Theme handling** already exists in `src/shared/contexts/ThemeContext.jsx`.
- **Language + RTL** handling already exists in `src/shared/contexts/LanguageContext.jsx` and is used across layout/components.

## Standard we are enforcing
- **Tokens** live in `src/shared/styles/tokens.css` (light defaults) and `src/shared/styles/theme.css` (dark overrides).
- **Theme** is applied via `html[data-theme="light|dark"]` with `ThemeContext` wiring.
- **Direction** is applied via `html[dir]` + `html[data-dir]` and is driven exclusively by the language context.
- **Shared UI components** use `var(--color-*)` tokens for color styling (buttons, cards, inputs, tables, sidebar, sheet/drawer, toasts).

## Key files touched
- `src/shared/styles/tokens.css`
- `src/shared/styles/theme.css`
- `src/styles/index.css`
- `src/shared/contexts/ThemeContext.jsx`
- `src/shared/contexts/LanguageContext.jsx`
- Shared UI components under `src/shared/ui/*` (button, card, input, table, sidebar, sheet, drawer, toast, sonner)
- Auth pages for translation coverage: `src/features/auth/pages/Login.jsx`, `src/features/auth/pages/Signup.jsx`
