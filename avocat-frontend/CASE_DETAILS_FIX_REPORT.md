# LegalCaseDetails Fix Report

## Repro steps
1. Open `/dashboard/legcases/show/:id` for a known case.
2. Observe the page during initial load and while switching tabs.
3. Simulate API failure (network error or 500) for case details.

## Root cause analysis
- Case details were fetched independently without caching, and sections fetched individually inside each tab component. This caused duplicate requests, re-fetches on tab switches, and flicker.
- There was no empty-state guard when the case payload was missing, resulting in a blank view state.
- Error handling lacked a user-level retry within the details page and did not invalidate cached data on retry.

## Changes applied
- Centralized case fetch in `LegalCaseDetails` and aligned it to `/legal-cases/:id` via `getLegCaseById`.
- Added a per-page in-memory cache with TTL and invalidation hooks for section refreshes.
- Parallelized section requests (procedures/sessions/ads) using `Promise.allSettled` after the case fetch.
- Added retry behavior for case and section errors without redirecting to home.
- Added a dedicated empty-state when case data is missing.

## Files touched
- `src/features/legal-cases/components/LegalCases/LegalCaseDetails.jsx`
- `src/shared/utils/caseFetchCache.js`
- `src/features/legal-cases/components/LegalCases/LegalCaseTools/LegalCaseProcedures.jsx`
- `src/features/legal-cases/components/LegalCases/LegalCaseTools/LegalCaseSessions.jsx`
- `src/features/legal-cases/components/LegalCases/LegalCaseTools/LegalCaseAds.jsx`
- `src/features/legal-cases/components/LegalCases/LegalCaseTools/LegalCaseClients.jsx`
- `src/features/legal-cases/components/LegalCases/LegalCaseTools/LegCaseCourts.jsx`
