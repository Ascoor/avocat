# Frontend Route Ownership Map (Phase 3)

## Final convention (adopted)
- `src/app/**`: app wiring only (providers, auth wrappers, top-level router mounting).
- `src/routes/**`: canonical route path constants/config only.
- `src/pages/**`: route containers only (router-facing entry points).
- `src/features/**`: domain implementation (UI + logic) consumed by route containers.
- `src/shared/**`: reusable cross-domain components/utilities; never route owners.

## Source of truth
- Public path registry: `src/routes/publicRoutes.ts`.
- App-level paths: `src/routes/appRoutes.ts`.
- Dashboard/authenticated paths: `src/routes/dashboardRoutes.ts`.

## Route ownership map

### Public + app shell routes
| Route | Router owner | Path source | Route container (`pages`) | Feature implementation (`features`) |
|---|---|---|---|---|
| `/` | `src/app/App.tsx` | `appRoutes.home` | `HomeRoutePage` | `home/pages/HomePage` |
| `/about` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/services` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/services/:id` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/industries` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/team` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/insights` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/insights/:id` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/contact` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/book` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/privacy` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/terms` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/disclaimer` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/client-portal` | `src/app/App.tsx` | `publicContentRouteMap` | `PublicContentRoutePage` | `home/pages/PublicContentPage` |
| `/login` | `src/app/App.tsx` | `appRoutes.login` | `LoginRoutePage` | `auth/pages/Login` |
| `/signup` | `src/app/App.tsx` | `appRoutes.signup` | `SignupRoutePage` | `auth/pages/Signup` |
| `/dashboard/*` | `src/app/App.tsx` | `appRoutes.dashboardWildcard` | `DashboardShellRoutePage` | `dashboard/pages/DashboardPage` |

### Dashboard routes (mounted by `src/app/routes/AuthRoutes.jsx`)
All routes below are path-owned by `dashboardRoutes` and screen-owned by `src/pages/dashboard/DashboardRoutePages.jsx`.

- `index` → `DashboardHomeRoutePage` → `dashboard/components/dashboard/Dashboard`
- `customer-service` → `CustomerServiceRoutePage` → `clients/pages/ClientUnClientList`
- `clients` (legacy redirect) → redirect to `customer-service?tab=clients`
- `unclients` (legacy redirect) → redirect to `customer-service?tab=unclients`
- `legcase-services` → `LegalServicesRoutePage` → `legal-services/pages/LegalServicList`
- `court-search` → `CourtSearchRoutePage` → `reports/components/Reports/SearchCourt`
- `office-settings` → `OfficeSettingsRoutePage` → `settings/pages/ManagmentSettings`
- `cases_setting` → `CaseSettingsRoutePage` → `courts/components/Courts/case_index.component`
- `lawyers` → `LawyersRoutePage` → `lawyers/pages/LawyerList`
- `legcases/show/:id` → `LegalCaseDetailsRoutePage` → `legal-cases/components/LegalCases/LegalCaseDetails`
- `profile/:userId` → `ProfileRoutePage` → `settings/components/Settings/ProfileUser`
- `legcases` → `LegalCasesRoutePage` → `legal-cases/pages/LegalCaseList`
- `search-courts-api` → `SearchCourtsApiRoutePage` → `courts/pages/SearchCourtsApi`
- `power-of-attorneys` → `PowerOfAttorneysRoutePage` → `power-of-attorneys/pages/PowerOfAttorneyPage`
- `documents` → `DocumentsRoutePage` → `documents/pages/DocumentsHubPage`
- `reports` → `ReportsRoutePage` → `reports/pages/ReportsIndex`
  - `reports/index` → `ReportsOverviewRoutePage`
  - `reports/sessions` → `SessionsReportRoutePage`
  - `reports/procedures` → `ProceduresReportRoutePage`
  - `reports/clients` → `ClientsReportRoutePage`
  - `reports/cases` → `CasesReportRoutePage`
  - `reports/services` → `ServicesReportRoutePage`
- `legal-sessions` (legacy redirect) → redirect to `reports/sessions`
- `procedures` (legacy redirect) → redirect to `reports/procedures`
- `tools/icons` → `IconsGalleryRoutePage` → `icons-gallery/pages/IconsGalleryPage`
- `tools/qa` → `UiQaRoutePage` → `ui-qa/pages/UiQaPage`
- `tools/qa-rbac` → `QaRbacRoutePage` → `admin/pages/QaRbacPage`
- `admin/access` → `AdminAccessRoutePage` → `admin/pages/AdminAccessManagementPage`
- `admin/users` (legacy redirect) → redirect to `admin/access?tab=users`
- `admin/roles` (legacy redirect) → redirect to `admin/access?tab=roles`
- `admin/permissions` (legacy redirect) → redirect to `admin/access?tab=permissions`
- `finance/ledger` → `FinanceLedgerRoutePage` → `finance/pages/FinanceLedgerPage`
- `finance/case-summary` → `CaseFinanceSummaryRoutePage` → `finance/pages/CaseFinanceSummaryPage`
- `finance/create-transaction` → `CreateTransactionRoutePage` → `finance/pages/CreateTransactionPage`
- `financial-dashboard` (legacy redirect) → redirect to `finance/ledger`

## Overlap resolved in this phase
- `App.tsx` no longer imports dashboard screen implementation from `features/**`; dashboard root is now routed through `pages/**` (`DashboardShellRoutePage`).
- Dashboard route strings and redirect targets were moved out of router JSX into `src/routes/dashboardRoutes.ts` + `src/routes/appRoutes.ts`.
- Route ownership is now explicit and singular:
  - router definitions in `app/**`
  - route containers in `pages/**`
  - screen implementation in `features/**`

## Safety notes
- No speculative file deletion was performed in this phase.
- Legacy routes are still preserved as redirects to keep backward compatibility.
