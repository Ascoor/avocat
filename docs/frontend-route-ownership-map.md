# Frontend Route Ownership Map (Phase 2)

## Final convention
- `src/app/**`: application wiring only (providers, auth wrappers, app-level route mounting).
- `src/routes/**`: route map/config constants only.
- `src/pages/**`: route containers only (route-level entrypoints mapped by router).
- `src/features/**`: domain implementation (UI + logic) consumed by `pages`.
- `src/shared/**`: reusable cross-domain components/utilities (never route-level ownership).

## Public routes
| Route | Router owner | Route container (`pages`) | Final implementation (`features`) |
|---|---|---|---|
| `/` | `src/app/App.tsx` | `HomeRoutePage` | `features/home/pages/HomePage` |
| `/about` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/services` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/services/:id` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/industries` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/team` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/insights` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/insights/:id` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/contact` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/book` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/privacy` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/terms` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/disclaimer` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/client-portal` | `src/app/App.tsx` + `src/routes/publicRoutes.ts` | `PublicContentRoutePage` | `features/home/pages/PublicContentPage` |
| `/login` | `src/app/App.tsx` | `LoginRoutePage` | `features/auth/pages/Login` |
| `/signup` | `src/app/App.tsx` | `SignupRoutePage` | `features/auth/pages/Signup` |

## Authenticated dashboard routes
All dashboard routes are owned by `src/app/routes/AuthRoutes.jsx`, with route containers provided by `src/pages/dashboard/DashboardRoutePages.jsx`.

Main routes:
- index (`/dashboard`) → `DashboardHomeRoutePage`
- `customer-service`
- `legcase-services`
- `court-search`
- `office-settings`
- `cases_setting`
- `lawyers`
- `legcases`
- `legcases/show/:id`
- `profile/:userId`
- `search-courts-api`
- `power-of-attorneys`
- `documents`
- `reports` (+ children: `sessions`, `procedures`, `clients`, `cases`, `services`)
- `tools/icons`, `tools/qa`, `tools/qa-rbac`
- `admin/access`
- `finance/ledger`, `finance/case-summary`, `finance/create-transaction`

Legacy redirect routes (still owned by AuthRoutes):
- `clients`, `unclients`
- `legal-sessions`, `procedures`
- `admin/users`, `admin/roles`, `admin/permissions`
- `financial-dashboard`

## Overlap resolved in this phase
- Router files (`app/App.tsx`, `app/routes/AuthRoutes.jsx`) no longer import route screens from `features/**` directly.
- Route-level imports are now funneled through `pages/**` route containers.
- Public content route paths are centralized via `routes/publicRoutes.ts` to avoid repeating route declarations inline.
