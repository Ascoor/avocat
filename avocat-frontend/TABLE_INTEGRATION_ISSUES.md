# Table Integration Issues

## Observations
1. **Headers include `actions` without `searchable: false`**
   - Example: Legal cases list defines an `actions` header but does not explicitly disable search.
   - Recommendation: set `searchable: false` on `actions` headers for clarity.

2. **Custom renderers return rich nodes without explicit search/sort values**
   - Several sections render status badges or composite nodes.
   - Recommendation: add `header.sortValue` / `header.searchValue` for derived fields to keep sorting and searching accurate.

3. **Row ID variance across sections**
   - Some datasets expose `id`, others use custom keys or nested ids.
   - Recommendation: pass `rowKey` or `getRowId` consistently in `TableComponent` usages.

## QA Checks to confirm
- Ensure headers array is non-empty and keys are unique.
- Confirm row IDs are stable and unique per dataset.
- Verify handlers receive correct IDs via `onRowAction`.
