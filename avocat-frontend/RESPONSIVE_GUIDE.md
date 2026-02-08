# Responsive Guide

## Sidebar / Mobile
- Desktop uses the fixed sidebar.
- Mobile uses the drawer (`MobileDrawer`) with `start-0` positioning and RTL-aware slide animation.

## Tables
- `Table` component wraps content in `overflow-x-auto` to prevent clipping on small screens.

## Forms
- Auth forms use mobile-first spacing and single-column inputs.
- Input icons use logical padding (`ps-*` / `pe-*`) for RTL/LTR consistency.

## Breakpoints tested
- 320
- 375
- 768
- 1024
- 1440
