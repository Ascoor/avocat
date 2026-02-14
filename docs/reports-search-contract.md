# Reports Search Contract

All reports tabs (procedures/sessions/services/cases/clients) should use one query contract.

## Query params

- `q`: optional global search text.
- `filters[...]`: scoped filter object.
  - common keys: `case_slug`, `file_no`, `date_from`, `date_to`, `court_id`, `status`, `lawyer_id`, `client_id`, `service_id`.
- `sort_by`: allowed field name.
- `sort_dir`: `asc` or `desc`.
- `page`: page number (1-indexed).
- `per_page`: page size (default 20).

Example:

`GET /api/v1/procedures-search?q=تنفيذ&filters[case_slug]=2024-15&sort_by=created_at&sort_dir=desc&page=1&per_page=20`

## Response shape

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 0,
    "last_page": 1
  },
  "facets": {
    "statuses": []
  }
}
```

## Notes

- Frontend normalizes snake_case/camelCase payloads via `reportRowNormalizer.js`.
- Detail navigation uses resilient ID lookup (`leg_case_id`, nested `leg_case.id`, raw payload fallback).
- Sorting falls back to `created_at desc` when input is invalid/missing.
