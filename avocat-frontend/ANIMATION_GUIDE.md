# Animation Guide (CSS-only)

## Utilities Added
The following utility classes were added in `src/styles/index.css`:
- `.hover-lift` → card hover lift with subtle shadow.
- `.pressable` → button press feedback.
- `.section-enter` → section fade/slide-in on load.
- `.skeleton-shimmer` → loading skeleton shimmer.

## Reduced Motion Support
All animation utilities are disabled via:
```css
@media (prefers-reduced-motion: reduce) {
  .hover-lift,
  .pressable,
  .section-enter,
  .skeleton-shimmer {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
```

## Usage in Case Details
- Header and overview cards: `.hover-lift`
- Section containers: `.section-enter`
- Loading placeholders: `.skeleton-shimmer`
- Buttons: `.pressable`
