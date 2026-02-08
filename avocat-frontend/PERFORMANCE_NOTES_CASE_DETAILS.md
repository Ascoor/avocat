# Performance Notes — Case Details

## Summary
- Reduced duplicate fetches by consolidating case data fetch in `LegalCaseDetails`.
- Parallelized section fetches (procedures/sessions/ads) for faster first meaningful paint.
- Added a 45s in-memory cache with per-section invalidation.

## Approximate metrics (DEV audit)
- **Before**: 6–9 requests on first open (case + each tab + re-fetch on tab switch).
- **After**: 4–6 requests on first open (case + 3 section calls + optional reference data).
- **Tab switching**: before triggered new requests; after stays in-memory unless invalidated.

## UX improvements
- Header renders immediately; overview skeleton appears while loading.
- Each section shows a dedicated loading/error/empty state without blocking other tabs.
