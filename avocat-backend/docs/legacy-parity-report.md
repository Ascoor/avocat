# Legacy (`avocatapp`) → Laravel 11 (`new-avocatapp`) Parity Audit

## Scope & Method
- Audited legacy and new backends for `app/Http/Controllers`, `app/Services`, and `routes/api.php`.
- Excluded Auth flow implementation changes (login/register/reset/etc.) per task instruction.
- Compared controller methods, service methods, and route-to-controller action bindings.

## 1) Controller Parity Table

| Legacy Controller | Legacy Methods | New Equivalent | Status | Notes |
|---|---|---|---|---|
| `ClientController` | CRUD + validation | `Api/ClientController` | ✅ | Parity exists; service dependency was stubbed and completed in this update. |
| `LegCaseController` | CRUD + add/remove clients/courts + search | `Api/LegCaseController` | ⚠️ | Route used `addLegCaseCourts/removeCourtFromLegCase` but class only had `AddLegCaseCourts/RemoveCourtFromLegCase`; route action updated to match legacy method casing (`AddLegCaseCourts`/`RemoveCourtFromLegCase`). |
| `LegalSessionController` | index/show/store/update/getSessionsByLegCaseId/destroy (+ routes for court/lawyer filters) | `Api/LegalSessionController` | ⚠️ | `getByCourtId`/`getByLawyerId` were missing and are now implemented. |
| `CourtSearchController` | index (+ routes referencing degree/court/case-type filters) | `Api/CourtSearchController` | ⚠️ | Route actions `getDegrees/getCourts/getCaseTypes` were missing and are now implemented. |
| `CaseStatusController` | `fetchCaseStatus` (+ routes referencing multiple helper actions) | `Api/CaseStatusController` | ⚠️ | Route actions `index/fetchDegrees/getCourtOptions/getCaseTypeOptions/getCaseYearOptions/getCaseDetails` were missing and are now implemented. |
| `LegalAdController` | index/store/update/destroy/getByLegCaseId | `Api/LegalAdController` | ✅ | Added `legal_ads` alias route for legacy compatibility. |
| All remaining non-auth controllers in legacy list | same signatures generally | corresponding `Api/*Controller` | ✅ | Method parity exists for core CRUD/custom actions. |

## 2) Service Parity Table

| Legacy Service | Legacy Methods | New Equivalent | Status | Notes |
|---|---|---|---|---|
| `ClientService` | `getLast30ClientsWithBirthDate/createClient/getClientById/updateClient/deleteClient` | `Services/ClientService` | ❌ → ✅ | New service was TODO stub; methods implemented. |
| `EventService` | `createEvent` | `Services/EventService` | ❌ → ✅ | New service was TODO stub; method implemented. |
| `ExpenseService` | `createExpense` | `Services/ExpenseService` | ❌ → ✅ | New service was TODO stub; method implemented. |
| `NotificationService` | `createNotification` | `Services/NotificationService` | ❌ → ✅ | New service was TODO stub; method implemented. |

## 3) Route Parity Table (Key Non-Auth Gaps)

| Legacy Route | Method | New Route | Status | Notes |
|---|---|---|---|---|
| `/legal_ads` | GET | (missing) | ❌ → ✅ | Added alias route to match legacy spelling variant. |
| `/legal-cases/add_courts` | POST | same path | ⚠️ → ✅ | New route binding corrected to use existing legacy-cased action method. |
| `/leg-case/remove-court` | DELETE | same path | ⚠️ → ✅ | New route binding corrected to use existing legacy-cased action method. |
| `/legal_sessions/court/{courtId}` | GET | same path | ⚠️ → ✅ | Added missing controller method. |
| `/legal_sessions/lawyer/{lawyerId}` | GET | same path | ⚠️ → ✅ | Added missing controller method. |
| `/court-search/degrees` | GET | same path | ⚠️ → ✅ | Added missing controller method. |
| `/court-search/courts` | POST | same path | ⚠️ → ✅ | Added missing controller method. |
| `/court-search/case-types` | GET | same path | ⚠️ → ✅ | Added missing controller method. |
| `/case-status` & helper endpoints | GET | same paths | ⚠️ → ✅ | Added missing controller methods referenced by routes. |

## 4) Gap List (Prioritized)

1. **P0 – Runtime-breaking route/controller gaps**
   - Missing controller actions referenced by routes (CaseStatus/CourtSearch/LegalSession/LegCase method-name mismatch).
2. **P0 – Service layer incompleteness**
   - Legacy services existed but new services were TODO placeholders.
3. **P1 – Legacy route alias compatibility**
   - `legal_ads` missing alias while `legal-ads` existed.
4. **P2 – Architecture modernization debt**
   - Many controllers still use inline validation and direct model access rather than FormRequest/Resource/service-driven layering.

## 5) Architectural Adaptation Notes (Laravel 11)

- Implemented missing behavior with typed signatures and `JsonResponse` where practical.
- Preserved existing response shape to avoid client contract drift.
- Left auth flow untouched as requested.
- Did not force broad refactor to FormRequest/API Resources in this patch to keep parity-focused and low-risk.

## 6) What Was Implemented (This Change Set)

### Files modified
- `app/Services/ClientService.php`
- `app/Services/EventService.php`
- `app/Services/ExpenseService.php`
- `app/Services/NotificationService.php`
- `app/Http/Controllers/Api/LegCaseController.php`
- `app/Http/Controllers/Api/LegalSessionController.php`
- `app/Http/Controllers/Api/CourtSearchController.php`
- `app/Http/Controllers/Api/CaseStatusController.php`
- `routes/api.php`

### Endpoints completed/fixed
- Court search helper endpoints
- Case status helper endpoints
- Legal session filters by court and lawyer
- Leg case court add/remove route binding compatibility
- `legal_ads` alias route

### Schema/DB notes
- New court-search endpoints rely on `search_degrees`, `search_courts`, and `search_case_types` tables (already referenced by existing code).
- Case status scraping depends on external ministry site availability and HTML selectors.
