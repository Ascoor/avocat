# Avocat Frontend — Architecture Report

## 0) Project Indexing (Summary)
### Runtime & Tooling
- **Framework/build**: Vite + React (18), with Vite PWA plugin and gzip compression.
- **Routing**: `react-router-dom` v6.
- **State**: Redux Toolkit (single `clients` slice), React Contexts (Auth/Theme/Alert/Spinner/Language/Sidebar), plus some React Query hooks (present in code).
- **Styling**: Tailwind CSS + custom CSS tokens, Radix UI primitives/shadcn-style components.
- **HTTP**: Axios with a shared instance + interceptors. Also direct `axios` calls for external search endpoints.
- **i18n**: Custom context + locale dictionaries (Arabic/English), RTL/LTR switch.

### Key scripts (from `package.json`)
- `dev`, `start`: Vite dev server
- `build`: Vite build
- `preview`: Vite preview
- `lint`/`lint-fix`: ESLint on `src/**/*.{js,jsx}`
- `format`: Prettier on `src/**/*.{js,jsx}`

### Environment
- `.env.example` provides `VITE_API_BASE_URL`.

---

## 1) Architectural Map (High-Level)
### Layers & Boundaries
- **UI Layer**: `src/pages/` for route pages, `src/components/` for feature + shared UI, `src/components/ui/` for reusable Radix-based primitives.
- **Routing Layer**: `src/main.tsx` initializes `RouterProvider`, `App.tsx` configures public and protected routes, nested under `/dashboard/*`.
- **State Layer**:
  - **Redux**: `src/store/` handles `clients` slice.
  - **Context**: Auth, Theme, Language, Alert, Spinner, Sidebar contexts.
  - **DataContext**: bulk fetch helper (not wired in the root providers).
  - **React Query hooks**: hooks exist for `clients` and `legal cases` (typed services), but the React Query provider is not configured in entrypoint.
- **API Layer**:
  - Axios instance in `src/services/api/axiosConfig.js` and `src/api/axiosConfig.ts`.
  - Service modules in `src/services/api/` (legacy-style JS) and `src/api/` (typed TS services).
  - Direct `api` or `axios` calls inside some components.
- **Auth Layer**: `AuthContext` manages login/register/logout, token storage, and `/me` fetch.
- **Utilities/Shared**: `src/lib/utils.js`, `src/utils/*`, and `src/config/*`.

### Data Flow (Typical)
1. **Page component** (route) renders a feature component.
2. **Feature component** triggers API through `services/api` or direct `api` call.
3. **State update** (local state or Redux slice) updates UI.
4. **Alerts/spinners** are shown through Context providers.

### Project Organization Pattern
- **Hybrid**: UI is feature-based (`components/LegalCases`, `components/ClientsAndUnClients`, etc.) while services are layer-based (`services/api`, `api/`).

### Entry Points & Providers
- `src/main.tsx` renders `RouterProvider` inside `LanguageProvider`, `AlertProvider`, Redux `Provider`, `AuthProvider`, and `Suspense`.
- `src/App.tsx` wraps routes in `ThemeProvider`, `SpinnerProvider`, `SidebarProvider`.

---

## 2) Routing & Pages
### Routing System
- `react-router-dom` v6 with nested routes (`/dashboard/*`).
- Public routes: `/`, `/login`, `/signup`.
- Protected routes under `/dashboard/*`.

### Layouts
- **AppShell**: Used by dashboard route (`DashboardPage`) with nested `Outlet`.
- **AuthLayout**: Used by Login/Signup pages.

### Nested Routes
- `/dashboard/*` renders `DashboardPage` → `AppShell` → `AuthRoutes`.

(See `ROUTES.md` for full route table.)

---

## 3) Components & UI Catalog (Overview)
### Component Classes
- **Shared/UI**: `src/components/ui/*` (Radix UI + shadcn-style components).
- **Feature Components**: Domain-specific areas in `src/components/*` (LegalCases, ClientsAndUnClients, etc.).
- **Forms**: Mostly custom HTML forms and modal forms in feature components.
- **Modals/Dialogs**: `GlobalConfirmDeleteModal`, feature modals (e.g., LegalServices/AddEditServiceModal).

### Design System
- Tailwind + custom CSS tokens (`styles/theme-tokens.css`, `styles/radix-vars.css`) and `tailwind.config.ts` for theme and palette.
- Radix UI components are wrapped in `src/components/ui/`.

---

## 4) State Management
### In Use
- **Redux Toolkit**: `clientsSlice` manages `clients` list, loading/error flags.
- **React Context**: Auth, Theme, Language, Alert, Spinner, Sidebar.
- **React Query hooks**: `useClients`, `useLegalCases` (hooks exist but no provider setup in entrypoint).

### Stored State & Persistence
- **Auth**: token + user stored in `localStorage` and in-memory cache.
- **Language**: persisted in `localStorage` with RTL/LTR side effects.
- **Theme**: stored in `localStorage` + system sync.

---

## 5) HTTP/API Layer
- **Axios instance** with auth interceptor and 401/419 handling.
- **Two parallel service trees**:
  - `src/services/api/*.js` (JS-based services) used by many components.
  - `src/api/*.ts` (TS typed services) used by hooks (`useClients`, `useLegalCases`).
- **Direct axios calls** inside certain components (e.g., SearchCourt pages for external APIs).

(See `API_CATALOG.md` for detailed endpoint list.)

---

## 6) Authentication & Authorization
- **Auth type**: Token-based (Bearer token in Authorization header).
- **Storage**: `localStorage` (`auth_token`, `auth_user`) + in-memory cache.
- **Flow**: `login`/`register` → store token/user → authenticated session; `/me` used to refresh user.
- **Guards**: `RequireAuth` for protected routes; `RedirectIfAuth` for login/signup.

---

## 7) Forms & Validation
- **Form library**: No Formik/React Hook Form detected in use; forms built with local state and HTML validation (`required`).
- **Validation**: Hand-rolled checks in components (e.g., login validation). No centralized schema validation.

---

## 8) Styling & Theming
- **Tailwind CSS** with design tokens via CSS variables.
- **Theme switching** using class-based dark mode (`html` class).
- **RTL/LTR support** toggled in `LanguageContext`.

---

## 9) i18n / Config / Environment
- **i18n**: Custom `LanguageContext` with `locales/ar.js` and `locales/en.js`.
- **Env**: `VITE_API_BASE_URL` consumed in `config/config.jsx`.
- **Runtime config**: Vite env and config module used by axios setup.

---

## 10) Quality & Testing
- **Testing**: No unit/component/e2e test files detected in `src/`.
- **Linting/formatting**: ESLint + Prettier scripts present.

---

## 11) Performance & Accessibility
- **Code splitting**: Many feature components loaded with `React.lazy()` and `Suspense`.
- **Bundle hints**: Vite manualChunks splits vendor (react, react-dom, router).
- **A11y**: Some components use aria labels; no centralized a11y linting found.

---

## 12) Dependency Graph & Recommendations
### Dependency Graph (Text)
```
Pages (src/pages)
  -> Feature Components (src/components)
     -> State (contexts/store/hooks)
        -> Services (src/services/api or src/api)
           -> Axios client (axiosConfig)
```

### Top Risks / Technical Debt (Top 10)
1. **Dual API layers** (JS services + TS services) causing duplication and inconsistency.
2. **Two axios configs** (`services/api/axiosConfig.js` and `api/axiosConfig.ts`) with identical logic.
3. **React Query hooks without provider** in entrypoint (hooks exist but provider not wired).
4. **Direct axios calls** bypassing shared API client (harder error handling/logging).
5. **Inconsistent API paths** (`/legal-cases` vs `/leg-cases`) between services.
6. **Token stored in localStorage** (XSS risk if any HTML injection occurs).
7. **`dangerouslySetInnerHTML`** usage in SearchCourt results rendering.
8. **Auth guard logic** redirects to `/` on 401 without preserving `next` in all cases.
9. **Heavy feature components** (large files with UI + API logic mixed), reducing maintainability.
10. **No automated tests** detected.

### Recommended Improvements (Prioritized)
**High**
- Consolidate API layer (single axios config + service folder). Prefer typed services and move existing JS services to TS.
- Introduce a single data fetching strategy (Redux vs React Query). If React Query is intended, add its provider and migrate.
- Address security: reduce `localStorage` token exposure (consider HttpOnly cookies) and sanitize HTML (`dangerouslySetInnerHTML`).

**Medium**
- Normalize API routes (`/legal-cases` vs `/leg-cases`) to avoid backend mismatches.
- Introduce centralized error handling (toast/alert for API failures).
- Split large feature components and adopt more feature-folder organization.

**Low**
- Add testing scaffolding (Vitest + RTL) and start with critical flows.
- Create shared types for API responses to reduce runtime mistakes.

### Re-Organization Plan (If Needed)
- **Feature folders**: `/features/legal-cases`, `/features/clients`, etc. each containing `components`, `services`, `hooks`, and `types`.
- **Shared UI**: Keep `components/ui` for primitives and `components/common` for app-level patterns.
- **API**: Single `src/api/` with a shared axios client and per-domain services.
- **Typing**: migrate JS services to TS, enforce consistent response shapes.

---

## Appendices
- See `FILE_TREE.md` for the tree.
- See `ROUTES.md` for route mapping.
- See `API_CATALOG.md` for API endpoints.
- See `EXEC_SUMMARY.md` for the 1-page executive summary.
