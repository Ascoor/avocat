# Case Tables UI Guide

## Shared table behaviors
- **Loading state**: show skeleton rows/cards while data loads.
- **Error state**: show an inline error row/card with retry action.
- **Empty state**: show a dedicated empty panel with a contextual add button when applicable.

## Responsive behavior
- **Desktop**: use tables with sticky headers and clear action columns.
- **Mobile**: use stacked cards with primary field + secondary fields; keep action buttons visible.

## Column rules
- Keep 3–5 core columns visible in all breakpoints.
- Move secondary columns to mobile cards or hide on small screens.

## Row actions
- Use consistent iconography (Lexicraft) for view/edit/delete.
- Actions should remain accessible on both desktop and mobile.

## Search & sort
- Use `header.sortValue` and `header.searchValue` for derived values.
- Avoid using custom renderers for sorting/searching.

## QA checks
- Ensure header keys are unique.
- Do not include `actions` in searchable headers.
- Ensure row IDs are stable and unique.
