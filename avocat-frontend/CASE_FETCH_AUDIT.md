# Case Fetch Audit (DEV)

## Method
- Added DEV-only logging in `LegalCaseDetails` and the case fetch cache to track request count and cache hits.
- Observed request sequence on first load and while switching tabs.

## Findings (before changes)
- Case details + each tab triggered its own fetch independently.
- Switching tabs caused repeated API calls, especially for procedures/sessions/ads.
- Total requests on first open: typically 6–9 (case + 3 section calls + client/court fetches + re-fetch on tab switch).

## Findings (after changes)
- Case details fetched once and cached for 45s.
- Procedures/sessions/ads fetched in parallel once after case details load.
- Tab switches do not re-trigger data fetch when cached data exists.
- Total requests on first open: 4–6 (case + 3 section calls + optional client/court lookups).

## Notes
- Cache keys: `legal-case:{id}` and `legal-case:{id}:{section}`.
- Cache invalidation occurs per-section after add/edit/delete in the relevant tab.
