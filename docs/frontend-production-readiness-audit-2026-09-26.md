# Frontend production-readiness audit (2026-09-26)

## 1. Architecture

The browser application is a React 18/Vite 6 SPA using React Router, context providers for authentication/language/theme/security/spinners, Redux only for the clients slice, and Axios service modules. The canonical Laravel client builds `${VITE_API_BASE_URL}/api/v1`; an empty base therefore produces `/api/v1`. Court search uses `${VITE_SEARCH_API_URL}/search` (normally `/search-api/search`). Authentication persists the Sanctum bearer token and user in `localStorage`, restores it with `GET /me`, and clears/redirects on 401/419. Nginx serves `dist`, falls back to `index.html`, keeps `/api/` in PHP, and strips `/search-api/` before proxying to Uvicorn.

The major authenticated modules are dashboard, clients/unclients, legal cases, services and service procedures, courts/settings, lawyers, sessions/procedures/reports, document centre/powers of attorney, RBAC administration, notifications/events, and the finance ledger/case summary. Node is build-time only.

## 2. Complete route/page audit

All dashboard rows require a restored authenticated session. “Guard” denotes the named UI permission guard; Laravel authorization remains authoritative. All rows are refresh-safe under the audited Nginx `try_files` fallback.

| Route | Page/behavior | Auth/guard | API/search dependencies | Status / finding / fix |
|---|---|---|---|---|
| `/` | Home | Public | Static | PASS |
| `/about` | PublicContent/about | Public | Static | PASS |
| `/services` | PublicContent/services | Public | Static | PASS |
| `/services/:id` | PublicContent/serviceDetails | Public; `id` | Static content | PASS |
| `/industries` | PublicContent/industries | Public | Static | PASS |
| `/team` | PublicContent/team | Public | Static | PASS |
| `/insights` | PublicContent/insights | Public | Static | PASS |
| `/insights/:id` | PublicContent/articleDetails | Public; `id` | Static content | PASS |
| `/contact` | PublicContent/contact | Public | Static/client form | PASS (live submission requires smoke test) |
| `/book` | PublicContent/book | Public | Static/client form | PASS (live submission requires smoke test) |
| `/privacy` | PublicContent/privacy | Public | Static | PASS |
| `/terms` | PublicContent/terms | Public | Static | PASS |
| `/disclaimer` | PublicContent/disclaimer | Public | Static | PASS |
| `/client-portal` | PublicContent/clientPortal | Public | Static placeholder | PASS |
| `/login` | Login | Redirects authenticated user | `POST /login`, `GET /me` | FIXED: external/protocol-relative `next` rejected; production demo bypass disabled |
| `/signup` | Signup | Redirects authenticated user | `POST /register` | PASS; runtime blocked |
| `/dashboard` | Dashboard home | Auth | counts/events/notifications | PASS; runtime blocked |
| `/dashboard/customer-service` | Clients/unclients | clients.list | clients, unclients | PASS; runtime blocked |
| `/dashboard/clients` | Redirect to customer-service clients tab | Auth | None | PASS legacy alias |
| `/dashboard/unclients` | Redirect to customer-service unclients tab | Auth | None | PASS legacy alias |
| `/dashboard/legcase-services` | Legal services | services.list | services, service-procedures/types | FIXED update path mismatch |
| `/dashboard/court-search` | Redirect to document court inquiry | reports.view | None | PASS legacy alias |
| `/dashboard/office-settings` | Office settings | settings.manage | office settings/preferences/lookups | PASS; runtime blocked |
| `/dashboard/cases_setting` | Court/case settings | courts.list | courts and lookup resources | PASS; runtime blocked |
| `/dashboard/lawyers` | Lawyers | lawyers.list | lawyers | PASS; runtime blocked |
| `/dashboard/legcases/show/:id` | Case details | legalCases.view; `id` | case, sessions, procedures, clients, services, ads | PASS; null guards inspected; runtime blocked |
| `/dashboard/profile/:userId` | Profile | Auth; `userId` | `GET/PUT /user/:id` | PASS; runtime blocked |
| `/dashboard/legcases` | Legal cases | legalCases.list | legal-cases/legcases | PASS; runtime blocked |
| `/dashboard/search-courts-api` | Court search | courts.search | Laravel options + FastAPI `/search` | PASS; runtime blocked |
| `/dashboard/power-of-attorneys` | Redirect to documents POA tab | legalCases.list | None | PASS legacy alias |
| `/dashboard/documents` | Document centre | reports.view OR legalCases.list | document-center, documents/tabs | PASS; runtime blocked |
| `/dashboard/reports` | Reports overview | reports.view | report lookups | PASS; runtime blocked |
| `/dashboard/reports/sessions` | Sessions report | reports.view | legal_sessions | PASS; runtime blocked |
| `/dashboard/reports/procedures` | Procedures report | reports.view | procedures-search | PASS; runtime blocked |
| `/dashboard/reports/clients` | Clients report | reports.view | clients | PASS; runtime blocked |
| `/dashboard/reports/cases` | Cases report | reports.view | cases/search | PASS; runtime blocked |
| `/dashboard/reports/services` | Services report | reports.view | services | PASS; runtime blocked |
| `/dashboard/legal-sessions` | Redirect to sessions report | Auth | None | PASS legacy alias |
| `/dashboard/procedures` | Redirect to procedures report | Auth | None | PASS legacy alias |
| `/dashboard/tools/icons` | Icon gallery | Auth | None | PASS internal tool |
| `/dashboard/tools/qa` | UI QA | Auth | None | ISSUE: internal QA is authenticated but not permission-guarded |
| `/dashboard/tools/qa-rbac` | RBAC QA | Auth | RBAC | ISSUE: internal QA is authenticated but not permission-guarded |
| `/dashboard/admin/access` | RBAC admin | any admin RBAC list permission | rbac users/roles/permissions | PASS; runtime blocked |
| `/dashboard/admin/users` | Redirect admin users tab | Auth | None | PASS legacy alias |
| `/dashboard/admin/roles` | Redirect admin roles tab | Auth | None | PASS legacy alias |
| `/dashboard/admin/permissions` | Redirect permissions tab | Auth | None | PASS legacy alias |
| `/dashboard/finance/ledger` | Ledger | expenses.view | finance/ledger, categories | PASS; runtime blocked |
| `/dashboard/finance/case-summary` | Case summary | expenses.view | finance/cases/:id/summary | PASS; runtime blocked |
| `/dashboard/finance/create-transaction` | Transaction form | expenses.create | POST finance/ledger | PASS; runtime blocked |
| `/dashboard/financial-dashboard` | Redirect to ledger | Auth | None | PASS legacy alias |
| `/dashboard/*` | Dashboard NotFound | Auth | None | PASS (in-app 404) |
| other public path | Redirect home | Public | None | PASS by current product behavior |

The login UI contains a `/forgot-password` link but no frontend route. Backend endpoints exist. This remains a **medium functional issue** rather than silently removing the affordance or inventing a recovery UX.

## 3. Laravel API contract matrix

All listed Laravel routes are under `/api/v1`; all except register/login/password recovery are Sanctum-protected.

| Frontend source/family | Methods and requested endpoints | Actual Laravel route | Status/fix |
|---|---|---|---|
| AuthContext | POST `/login`, `/register`, `/logout`; GET `/me` | Exact | PASS |
| clients services | REST `/clients`, REST `/unclients`, GET `/client-search` | Exact | PASS |
| lawyers services | REST `/lawyers`; legacy singular GET/PUT/DELETE `/lawyer/:id` | Both registered | PASS |
| case services | REST `/legal-cases`; GET `/legcases`; GET `/cases/search`, `/cases/:id/*`; relationship routes | Exact | PASS |
| court/settings services | REST courts, court_types, levels, case/procedure/ad/session types | Exact API resources | PASS |
| procedures | REST `/procedures`; GET `/procedures/leg-case/:id`; GET `/procedures-search` | Exact | PASS |
| legal sessions/ads | `/legal_sessions*`, `/legal-ads*` | Exact explicit routes | PASS |
| legal services | REST `/services`; `/service-procedures/:serviceId`; POST `/service-procedures`; PUT/DELETE `/service-procedure/:id` | Exact after fix | FIXED: PUT previously used nonexistent plural URL |
| reports | cases/search, services, procedures-search, legal_sessions, clients plus lookups | Exact | PASS |
| documents | document-center collections; REST documents/document-tabs; legal-doc-upload | Exact | PASS |
| office configuration | `/lookups/:entity`; `/offices/:id/settings/:entity`; preferences | Exact | PASS |
| RBAC | `/rbac/me`, users, roles, permissions | Exact | PASS |
| notifications/events | notifications, read/read-all/unread-count; event/events | Exact | PASS |
| finance | GET/POST `/finance/ledger`; GET `/finance/cases/:id/summary`; GET `/expenses/search`; expense_categories | Exact | PASS |
| dormant TS website/admin services | `/admin/profile`, `/admin/website/*`, `/leg-cases*` | Not registered | ISSUE, currently unreferenced/dead hooks; do not activate without backend product decision |
| dormant service-type mutations | POST/PUT/DELETE `/service-types*` | Only GET `/service-types` exists | ISSUE, exports currently unused |

Controller/request inspection confirmed the active families rather than treating similarly named dormant scaffolding as live behavior. Live-backend payload/response validation remains blocked.

## 4. Search API matrix

| Frontend call | FastAPI route via Nginx | Method/body | Status/fix |
|---|---|---|---|
| SearchCourtsApi | `/search-api/search` -> `/search` | POST `{degree,court,caseType,caseYear,caseNumber}` | PASS: FastAPI legacy normalizer accepts names and positive integers |
| Documents SearchCourt | `/search-api/search` -> `/search` | Same POST body | FIXED: pending lock, useful 4xx/5xx message, no raw HTML injection |
| Laravel option loading | `/api/v1/search-court` | GET | PASS |

FastAPI returns the Ministry result object on 200, a message on 404, validation error on 422, sanitized 502 upstream failures, and sanitized 500. Browser-to-Uvicorn direct ports are not used.

## 5. Authentication and authorization

- Login/register consume backend `{data?: {user, token}}` or unwrapped `{user, token}`. Token is sent only as an Authorization header.
- Refresh starts from persisted token, calls `/me`, and does not render protected routes until initialization ends.
- 401/419 clears storage and sends the user to `/login?next=<local path>`; 403 remains available to page/permission error handling and does not falsely log out.
- Logout calls the backend first, then always clears local state. A failed backend logout is logged without exposing the token.
- UI permission guards mirror named permissions; they are usability controls, not claimed as authorization.
- FIXED: built-in demo credentials/mock-success behavior is now opt-in with `VITE_DEMO_MODE=true`; production example explicitly disables it.
- FIXED: authenticated redirects and post-login redirects only accept root-relative, non-protocol-relative paths.
- Token persistence in localStorage is an accepted existing architecture but remains a **medium XSS-impact risk**; moving to HttpOnly cookies would be an explicit auth-architecture project.

## 6. Production URL and environment/secret audit

Browser environment variables found: `VITE_API_BASE_URL`, `VITE_SEARCH_API_URL`, `VITE_APP_NAME`, `VITE_APP_VERSION`, feature flags for SSO/magic-link/captcha/dev/logging, optional demo email/password, `VITE_DEMO_MODE`, and `VITE_RBAC_MODE`. No JWT signing secret, APP_KEY, database password, or private search credential is referenced.

- Source production path: empty API base and `/search-api` are correct.
- `frontend.env` contains an obsolete `VITE_API_URL=http://localhost:8000`; source does not consume that name, so it is a development-only false positive but should not be used for production.
- `127.0.0.1:9100` exists only in deployment comments/Nginx/systemd server configuration, never browser source.
- Generated bundle contains Axios's generic fallback literal `http://localhost`; this is library code, not an application endpoint.
- No Railway, old OCI IP, JWT secret variable, or APP_KEY was found in generated output.

## 7. Functional module matrix

Runtime status is conservative because no live authenticated production dataset/browser was available.

| Module | List | Create | View/edit | Delete | Search/pagination/errors |
|---|---|---|---|---|---|
| Clients/unclients | BLOCKED | BLOCKED | BLOCKED | BLOCKED | Contract PASS; runtime BLOCKED |
| Lawyers | BLOCKED | BLOCKED | BLOCKED | BLOCKED | Contract PASS; runtime BLOCKED |
| Cases/ads/relations | BLOCKED | BLOCKED | BLOCKED | BLOCKED | Contract PASS; runtime BLOCKED |
| Courts/settings/lookups | BLOCKED | BLOCKED | BLOCKED | BLOCKED | Contract PASS; runtime BLOCKED |
| Procedures/sessions | BLOCKED | BLOCKED | BLOCKED | BLOCKED | Contract PASS; runtime BLOCKED |
| Services/service procedures | BLOCKED | BLOCKED | BLOCKED | BLOCKED | FIXED update URL; runtime BLOCKED |
| Documents/POA | BLOCKED | BLOCKED | BLOCKED | BLOCKED | Contract PASS; runtime BLOCKED |
| Reports/search | BLOCKED | N/A | BLOCKED | N/A | Search error/XSS handling FIXED; runtime BLOCKED |
| RBAC/settings | BLOCKED | BLOCKED | BLOCKED | BLOCKED | Backend remains authoritative; runtime BLOCKED |
| Finance | BLOCKED | BLOCKED | BLOCKED | N/A ledger model | Contract PASS; runtime BLOCKED |

## 8. Finance, RTL, documents, performance, and security

### Finance

The ledger list/create and case-summary endpoints exactly match Laravel. Expense search fallback also exists. Amounts are passed to the backend without newly introduced floating-point rounding; backend totals remain authoritative. Currencies are preferences/display values. Live decimal, pagination, authorization, and concurrency behavior is BLOCKED pending smoke testing.

### Arabic/RTL and dates

Global language direction and logical start/end CSS are in place; forms and the corrected search error state inherit RTL. No stored Arabic content was transformed. Date-only code has several local conversion implementations; no global timezone change was made without business confirmation. Live print/table/modal overflow and date-boundary checks are BLOCKED.

### Files/documents

Document resources, document-centre collections, tab resources, legal document upload, and POA routes exist. No browser hard-coded file host was found. Upload/download, content disposition, 20 MB Nginx limit, storage symlink, and PDF behavior require live smoke testing.

### Performance/build

Build output is 31 MB, dominated by images/fonts. Largest JavaScript is approximately 1.23 MB (352 KB precompressed gzip); the build suppresses normal Vite warnings via `logLevel: error`. Static assets include multiple 1.7–3.8 MB images. No new polling or parallel burst was introduced. Code splitting should be a later measured optimization; image optimization offers the safest future win.

### Security classification

- **CRITICAL:** none found.
- **HIGH:** none remaining in audited active frontend paths.
- **MEDIUM (fixed):** production-capable demo authentication/mock success; untrusted search string HTML rendering; unsafe `next` redirect handling.
- **MEDIUM (remaining):** localStorage bearer-token XSS impact; missing frontend password-recovery route; authenticated but unguarded QA tool routes.
- **LOW:** dormant service modules point at absent API families; console error diagnostics remain in some paths (no token logging found); stale development-only `frontend.env` name.

## 9. Validation/build output

| Check | Result | Notes |
|---|---|---|
| `npm ci` | PASS | 889 locked packages installed |
| `npm run build` | PASS | `dist/index.html`, assets, gzip and PWA outputs generated |
| `npm test -- --run` | PASS | 2 files, 6 tests |
| `npm run lint` | PASS | One pre-existing unused-variable warning, zero errors |
| `npx tsc --noEmit` | FAIL | Pre-existing JSX namespace error in `src/shared/icons/lexicraft/index.tsx:67` |
| `npm audit --omit=dev --audit-level=high` | BLOCKED | Registry audit endpoint returned HTTP 403 |
| `git diff --check` | PASS | No whitespace errors |
| Route audit | PASS | Every declared route inventoried; runtime marked blocked |
| Laravel API contract audit | PASS | Active families matched; dormant mismatches documented |
| FastAPI contract audit | PASS | Both calls match POST `/search` |
| Production dist URL scan | PASS | Only Axios generic localhost fallback false positive |
| Frontend secret scan | PASS | No browser server secret found |

No source maps are emitted. Production blockers are the TypeScript failure if typecheck is made a deployment gate, and the unavailable live browser/backend validation. The Vite production build itself succeeds.

## 10. Changed files / backend / Nginx

Changed files are the auth redirect utility/test; App/Login/AuthContext/Axios demo gating; service-procedure endpoint fix; court-search error/loading/XSS handling and translations; working ESLint config; production env demo-off declaration; and this report. **Backend files changed: NONE. Nginx files changed: NONE.** Seeder work was not touched.

## 11. Remaining deployment gates

1. Run the live OCI/browser smoke plan below with real role fixtures and production-like data.
2. Decide whether to implement the missing password recovery pages.
3. Resolve the existing JSX namespace typecheck error if typecheck is a release gate.
4. Verify document storage/download headers and uploads on OCI.
5. Re-run dependency audit where npm registry advisory access is permitted.

## 12. Safe OCI deployment commands

```bash
cd /var/www/avocat
git fetch origin production-ready
git switch production-ready
git pull --ff-only origin production-ready
cd avocat-frontend
cp ../deploy/env/frontend.production.example .env.production
# Review only public VITE_* flags; keep API base empty, search base /search-api, demo false.
NODE_OPTIONS=--max-old-space-size=768 npm ci --no-audit --no-fund
NODE_OPTIONS=--max-old-space-size=768 npm run build
sudo nginx -t
sudo systemctl reload nginx
curl -fsS http://127.0.0.1/ >/dev/null
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1/api/v1/login
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1/search-api/
```

Do not run a Node application server. `npm ci` intentionally avoids audit on the low-memory server; perform audit in CI/workstation.

## 13. Post-deployment smoke plan

1. `/`: expect 200, branded RTL/LTR page, static assets and no console network errors.
2. `/login`: invalid credentials must fail; valid credentials must create bearer session without showing demo credentials.
3. Open a permitted protected route, reload it, expect Nginx 200/index fallback, `/me` 200, and restored page. Replace token with invalid text, reload, expect storage clear and `/login?next=...`.
4. Clients: list, search, create, validation 422, edit, confirm delete failure/success, and pagination with a large page count.
5. Cases: list/search, create, open `/dashboard/legcases/show/<id>`, edit relations, session/procedure/ad operations, nullable court/client display.
6. Procedures and legal sessions reports: filter across date boundaries, paginate, create/edit/delete where exposed, refresh direct URLs.
7. Search: options load from Laravel; valid request hits `/search-api/search`; test result, no result (404), invalid values (422), and upstream failure (502). The button must not double-submit.
8. Finance: ledger filters, exact decimal display, create transaction once, reload, case summary equals backend ledger totals, unauthorized user receives 403 UI.
9. Documents: each tab loads; upload allowed and oversized/disallowed files; download opens correct same-origin URL with usable filename/PDF; no server filesystem path appears.
10. Logout: backend call occurs, local token/user disappear, back navigation and direct protected URLs return to login.
11. `/dashboard/not-a-route`: authenticated in-app 404. `/not-a-public-route`: current expected behavior is redirect to `/`. `/api/not-a-route` must remain a Laravel JSON 404 and `/search-api/not-a-route` a FastAPI JSON 404, never SPA HTML.
