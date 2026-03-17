# Unified Section Header & Action System

## 1) Header / Action Inventory (baseline)

| Page/Section | Previous title source | Previous icon source | Previous primary action | Pattern before | Consistency issues |
| --- | --- | --- | --- | --- | --- |
| Clients (`ClientUnClientList`) | Local `t("navigation.customerService")` | `LexicraftIcon` inline | No fixed CTA in header | `SectionHeader` + tab toolbar | Back button shown in top-level page, non-dynamic metadata |
| Lawyers (`LawyerList`) | Hardcoded `"المحامون"` | `LawyerIcon` | Green custom button inside table | `SectionHeader` + `TableComponent renderAddButton` | Add CTA style differed from other sections |
| Documents (`DocumentsHubPage`) | Local `t("documents.title")` | `FileText` inline | Custom `action-btn-primary` upload button | `SectionHeader` with generic `actions` slot | CTA styling inconsistent vs tables and other pages |

## 2) Unified ownership

- Central metadata lives in `src/shared/config/pageChromeConfig.js`.
- Shared CTA component lives in `src/shared/components/common/AddActionButton.jsx`.
- Shared section chrome lives in `src/shared/components/common/SectionHeader.jsx`.
- Table-level default add CTA now uses `AddActionButton` to match headers.

## 3) Conventions

### Header conventions
- Use `SectionHeader` with `sectionKey` whenever possible.
- The header owns: `title`, `icon`, `subtitle`, `primaryAction`, `secondaryActions`, and optional back button.
- Top-level dashboard pages should set `showBack={false}` unless explicitly needed.

### Action button conventions
- Primary add/action button should use `AddActionButton` (or be visually equivalent variant).
- Must support icon + label + disabled/loading.
- Same interaction tokens in dark/light mode.

### Scroll/navigation conventions
- `DashboardShell` resets both `window` and internal `.dashboard-scroll` on route changes.
- Header/top bar should be immediately visible after login/redirect without manual upward scroll.

### Responsive conventions
- Header layout is two-zone (`identity` + `actions`) and collapses to stacked rows on smaller viewports.
- Actions wrap instead of overflowing.

## 4) Anti-patterns

- Hardcoded per-page add button colors/classes when a shared CTA is applicable.
- Introducing new local header wrappers that duplicate `SectionHeader` behavior.
- Depending on stale scroll position for top bar visibility.
