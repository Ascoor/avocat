# Direction (RTL/LTR) Guide

## Source of truth
- Language is the single source of direction.
- `ar` → `dir="rtl"`
- `en` → `dir="ltr"`

## Where direction is applied
- `LanguageContext` updates the root element:
  - `document.documentElement.dir`
  - `document.documentElement.dataset.dir`

## How to write direction-safe styles
- Use logical properties/classes when possible:
  - `text-start` instead of `text-left`
  - `start-*` / `end-*` instead of `left-*` / `right-*`
  - `ps-*` / `pe-*` instead of `pl-*` / `pr-*`

## Directional icons
- Use rotation where needed for chevrons/arrows.
- Prefer conditional rotation classes (e.g. `rotate-180`) instead of swapping markup.
