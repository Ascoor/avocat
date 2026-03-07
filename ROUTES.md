 Routes Catalog

## Top-Level Routes
| Route | Component | Layout | Guard | API/HTTP usage (observed) |
|---|---|---|---|---|
| `/` | `src/pages/HomePage.jsx` | None | Public | No API calls in page component. |
| `/login` | `src/pages/Login.jsx` | `AuthLayout` | Redirect if authenticated | Uses `useAuth.login` → `POST /login` via `AuthContext`. |
| `/signup` | `src/pages/Signup.jsx` | `AuthLayout` | Redirect if authenticated | Uses `useAuth.register` → `POST /register` via `AuthContext`. |
| `/dashboard/*` | `src/pages/DashboardPage.jsx` | `AppShell` | `RequireAuth` | Contains nested routes handled by `AuthRoutes`. |

## Dashboard Nested Routes (within `/dashboard/*`)
| Route | Component | Layout | Guard | API/HTTP usage (observed) |
|---|---|---|---|---|
| `/dashboard` (index) | `src/components/dashboard/Dashboard.jsx` | `AppShell` | Auth required | `GET /clients` via Redux slice; `GET /all_count_office` via `api`. |
| `/dashboard/clients` | `src/pages/ClientUnClientList.jsx` → client/unclient components | `AppShell` | Auth required | Clients: `GET /clients`, `PATCH /clients/:id`, `DELETE /clients/:id`; Unclients: `GET /unclients`, `PUT /unclients/:id`, `DELETE /unclients/:id`. |
| `/dashboard/legcase-services` | `src/pages/LegalServicList.jsx` | `AppShell` | Auth required | `GET /services`, `DELETE /services/:id` via services API. |
| `/dashboard/court-search` | `src/components/Reports/SearchCourt.jsx` | `AppShell` | Auth required | `GET /search-court` via axios client; `POST https://search-api.avocat.live/search`. |
| `/dashboard/cases_setting` | `src/components/Courts/case_index.component.jsx` | `AppShell` | Auth required | `GET /procedure_types`, `/case_types`, `/case_sub_types`, `/legal_ad_types`; `POST` to same endpoints. |
| `/dashboard/lawyers` | `src/pages/LawyerList.jsx` | `AppShell` | Auth required | `GET/POST/PUT/DELETE /lawyers` via services API. |
| `/dashboard/legcases/show/:id` | `src/components/LegalCases/LegalCaseDetails.jsx` | `AppShell` | Auth required | `GET /legal-cases/:id` in page; child tabs call procedures/sessions/ads endpoints. |
| `/dashboard/profile/:userId` | `src/components/Settings/ProfileUser.jsx` | `AppShell` | Auth required | `GET /user/:id`, `PUT /user/:id`. |
| `/dashboard/legcases` | `src/pages/LegalCaseList.jsx` | `AppShell` | Auth required | `GET /legal-cases`, `DELETE /legal-cases/:id`. |
| `/dashboard/legal-sessions` | `src/components/Sessions/index.jsx` | `AppShell` | Auth required | `GET /legal_sessions`. |
| `/dashboard/search-courts-api` | `src/pages/SearchCourtsApi.jsx` | `AppShell` | Auth required | `GET /search-court`; `POST https://search-api.ask-ar.net/search`. |
| `/dashboard/managment-settings/procedures` | `src/pages/ProceduresList.jsx` | `AppShell` | Auth required | Procedure types/place types: `GET/POST/PUT/DELETE /procedure_types`, `/procedure_place_types`. |
| `/dashboard/financial-dashboard` | `src/components/Financially/index.jsx` | `AppShell` | Auth required | Expenses search: `GET /expense_categories`, `GET /expenses/search`. |
| `*` | AuthRoutes fallback | `AppShell` | Auth required | `404` placeholder only. |
