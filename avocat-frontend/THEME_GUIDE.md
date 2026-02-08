# Theme & Tokens Guide

## Where tokens live
- **Light defaults:** `src/shared/styles/tokens.css`
- **Dark overrides:** `src/shared/styles/theme.css` (`html[data-theme="dark"]`)

## Adding or updating tokens
1. Add new token in `tokens.css` under `:root`.
2. Add a matching dark value in `theme.css` under `html[data-theme="dark"]`.
3. If the token is used by Tailwind semantic classes, also map it to the legacy aliases (e.g. `--background`, `--primary`) in `tokens.css`.

## How to use tokens in components
- Prefer `hsl(var(--color-*))` in Tailwind arbitrary values.
- Examples:
  - `bg-[hsl(var(--color-surface))]`
  - `text-[hsl(var(--color-text))]`
  - `border-[hsl(var(--color-border))]`

## Theme wiring
- `ThemeContext` updates:
  - `html[data-theme]` attribute
  - `html` class (`light` / `dark`) for Tailwind dark mode
  - `color-scheme` on the root element

## Gradients & Shadows
- Gradients are exposed as:
  - `--gradient-1`, `--gradient-2`, `--gradient-3`
- Shadows are exposed as:
  - `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Use them via Tailwind shadow utilities (mapped in `tailwind.config.ts`) or as custom CSS when needed.
