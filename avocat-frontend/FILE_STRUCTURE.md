# Avocat Frontend Structure (Feature-based)

This layout groups code by responsibility while keeping shared and app-level wiring explicit.

## `src/` overview

- `app/` – application shell, routing, and provider wiring.
  - `App.tsx` – top-level route layout.
  - `routes/` – authenticated route tree and lazy-loading.
  - `store/` and `reducers/` – Redux setup kept near app wiring.
- `features/` – domain modules (each feature owns its pages + feature-specific components).
  - `auth/`, `home/`, `dashboard/`, `clients/`, `legal-cases/`, `legal-services/`, `procedures/`, `lawyers/`, `courts/`, `settings/`, `finance/`, `reports/`, `sessions/`, `archives/`, `calendar/`, `notifications/`.
- `shared/` – reusable building blocks.
  - `components/common/` – general UI building blocks (tables, cards, spinners, etc.).
  - `layout/` – shared layout shells and navigation.
  - `ui/` – primitive UI components.
  - `contexts/`, `hooks/`, `utils/`, `lib/`, `types/`, `icons/`, `locales/`, `api/`, `services/`.
- `config/` – static config (theme, sidebar, iconography).
- `assets/` – images, icons, fonts.
- `styles/` – global styles and theme CSS.

## Why this structure

- **Feature-first:** keeps pages + feature-specific components together for easier ownership.
- **Explicit app wiring:** routing, providers, and store configuration live under `app/`.
- **Clear reuse boundary:** shared UI + utilities are centralized under `shared/`.
- **Stable config/assets:** config + assets live at top-level folders with aliases for clean imports.
