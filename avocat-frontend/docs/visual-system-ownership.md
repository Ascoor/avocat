# Visual System Ownership Map

## Final convention
- `src/theme/**`: design tokens and theme semantics (CSS variables + compatibility aliases only).
- `src/styles/**`: app-wide style layers only (global base/components/utilities + framework integration + shell CSS).
- `src/shared/layout/utils/**`: layout-only class helpers (if/when consumed by shells/primitives).
- `src/features/**` and `src/shared/components/**`: component-local styling only.
- `docs/premium-visual-identity-system.md`: visual identity audit, semantic token intent, button rules, glow rules, and anti-pattern guidance.

## Ownership matrix
| File | Type | Primary consumers | Notes |
| --- | --- | --- | --- |
| `src/theme/tokens.css` | Design tokens | Tailwind theme config + all global/component CSS variables | Source of truth for color, spacing, radius, chart, shell visual tokens. |
| `src/theme/aliases.css` | Theme compatibility aliases | Legacy `--color-*` consumers in shared UI atoms | Bridges old semantic names to token system without redefining theme palettes. |
| `src/styles/index.css` | Global style entrypoint | `src/main.tsx` | Single CSS import boundary for app boot. |
| `src/styles/globals.css` | Global base + shared component classes | Entire app (through `index.css`) | Contains base reset-like behavior and shared class conventions. |
| `src/styles/utilities.css` | Shared utility classes | Entire app (through `index.css`) | Houses utility helpers and animation utility classes. |
| `src/styles/radix-vars.css` | UI framework behavioral vars | Radix-based components | Keeps non-visual sizing/viewport variables. |
| `src/styles/dashboard-shell.css` | Layout-specific visual helpers | `shared/layout/shells/**`, `shared/layout/navigation/**` | Shell/header/tabs styling only. |

## Removed legacy / overlap
- `src/shared/styles/tokens.css`: replaced by `src/theme/aliases.css`.
- `src/shared/styles/theme.css`: duplicate dark overrides and gradients; replaced by semantic tokens in `src/theme/tokens.css`.
- `src/config/theme-tokens.ts`: orphaned duplicate token source (unused runtime export).

## Guardrails (anti-patterns)
- Do not define new design tokens inside `src/styles/**`, `src/shared/**`, or feature folders.
- Do not put feature-specific CSS classes in `src/styles/globals.css` or `src/styles/utilities.css`.
- Do not add app-wide utility classes inside shells/pages/features.
- Do not duplicate semantic color/spacing values in JS constants when CSS token already exists.
