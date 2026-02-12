# Legal Cases Module Audit Report

## Scope Reviewed
- `src/shared/components/common/TableComponent.jsx`
- `src/features/legal-cases/pages/LegalCaseList.jsx`
- `src/features/legal-cases/components/LegalCases/LegalCaseDetails.jsx`
- `src/features/legal-cases/components/LegalCases/LegalCaseTools/*`
- `src/app/routes/AuthRoutes.jsx`

## Current Issues by Component

### 1) Shared `TableComponent`

#### Critical
- **Actions column mismatch bug**: header renders separate `View/Edit/Delete` columns, but body renders a single `<td>` containing all action buttons. This causes column misalignment and visually broken tables when actions are enabled.
- **No configurable action mode**: cannot switch between separate action columns and single grouped action column.

#### UX / RTL / Theming
- Directional controls (pagination/search/sort) need stricter RTL/LTR mirroring consistency.
- Action buttons do not stop event propagation, which may cause row-level handlers (when adopted) to fire unintentionally.
- Search/sort affordances can be made clearer for keyboard/focus states.

### 2) `LegalCaseList` (index)

#### Critical
- `headers` includes a manual `actions` column while `TableComponent` also has built-in action handling; creates duplication and inconsistency.
- View action route is implemented via inline renderer Link relative path and not standardized through table action handlers.
- Loading/error/empty state handling is not unified with module design system.

#### UX / Styling
- Inconsistent alignment and badge styling (e.g., status and clients cell content) across RTL/LTR.
- Inline/manual style patterns reduce maintainability.

### 3) `LegalCaseDetails` (details)

#### Header / Sticky / Layout
- Sticky header works but can be further stabilized and normalized (height rhythm, action grouping, spacing consistency).
- Action buttons need clearer semantic grouping and consistent color contrast in both themes.
- Metadata (case number/date/status) can be clearer and better structured.

#### Tabs / RTL
- Tabs visually reverse in RTL but the data order is not explicitly direction-aware, which can be brittle.
- Focus-visible styles can be improved for accessibility.

#### Data / UX
- Refresh behavior is mostly good, but updates can better avoid redundant renders in tab transitions and action callbacks.

### 4) Sections (Clients/Courts/Procedures/Sessions/Ads)

#### Positive
- Most sections already use shared `TableComponent`.

#### Remaining improvements
- Enforce consistent `actionsMode`, alignment, and mobile-card spacing across all section tables.
- Normalize section table title/add-action ownership (SectionHeader vs Table toolbar) to avoid duplicate controls.

## Quick Wins vs Refactors

### Quick Wins
1. Fix `TableComponent` action column structure and add `actionsMode` option.
2. Standardize `LegalCaseList` to TableComponent actions (`onView/onEdit/onDelete`) and remove manual action column.
3. Normalize RTL/LTR alignment classes and directional icons in table + details tabs.
4. Improve header action grouping and sticky panel consistency in details.

### Medium Refactors
1. Create small reusable helpers for details header badges / action buttons.
2. Reduce list/detail fetch boilerplate and standardize error/loading text usage.
3. Add lightweight tests for route param presence + table action dispatch semantics.

## Recommended Style Tokens / Class Patterns

Use existing design-system tokens consistently:
- Surface/background: `bg-[hsl(var(--card)/...)]`, `bg-[hsl(var(--surface))]` variants already present.
- Borders: `border-border/70` (containers), `border-border/40` (row separators).
- Text hierarchy: `text-foreground` (primary), `text-muted-foreground` (secondary).
- Action states:
  - Primary action: `bg-primary text-primary-foreground`
  - Danger action: `border-destructive/30 bg-destructive/5 text-destructive`
- Focus accessibility baseline:
  - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Micro-interactions:
  - row/card hover: `hover:-translate-y-0.5 hover:shadow-md`
  - press feedback: `active:scale-[0.98]`

## Delivery Plan Mapping
- Commit 1: routing + table action columns correctness.
- Commit 2: TableComponent RTL/LTR + theming polish + config.
- Commit 3: LegalCaseList migration + UI cleanup.
- Commit 4: LegCaseDetails header/tabs/section consistency.
- Commit 5: tests + docs + QA checklist.
