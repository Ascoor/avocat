# Legal Cases Module QA Checklist

## Languages & Direction
- [ ] Arabic mode: tables render RTL with right-aligned headers/cells.
- [ ] English mode: tables render LTR with left-aligned headers/cells.
- [ ] Tabs order and action button arrangement are correct in both directions.
- [ ] Directional icons (forward/back arrows) point correctly in both directions.

## Themes
- [ ] Light theme: readable text contrast in list/details/tables/modals.
- [ ] Dark theme: badges, borders, and button colors remain accessible.
- [ ] Status badge and destructive actions are visually distinct.

## Legal Cases Index
- [ ] Loading state appears with table skeleton.
- [ ] Error state shows retry action and refreshes correctly.
- [ ] Empty state appears when no legal cases are returned.
- [ ] View action navigates to `/dashboard/legcases/show/:id`.
- [ ] Edit/Delete actions work without unintended row navigation side effects.

## Legal Case Details
- [ ] Sticky header is stable while scrolling (no layout jump).
- [ ] Header metadata displays case number/date/status clearly.
- [ ] Actions (Edit/Delete/Add Procedure/Add Session) are responsive across breakpoints.
- [ ] Tabs are keyboard-focusable and maintain visible focus style.

## Sub-sections (Clients/Courts/Procedures/Sessions/Ads)
- [ ] Each section handles loading/error/empty states properly.
- [ ] Search/sort/pagination work in all section tables.
- [ ] Mobile cards respect direction and spacing.
- [ ] Deletion confirmations close/reopen safely and refresh data.

## Network Conditions
- [ ] Slow network: no duplicate requests on tab switches.
- [ ] Retry actions recover from transient errors.
- [ ] Post-create/post-edit/post-delete refresh paths update data consistently.
