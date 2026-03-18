# Premium Visual Identity System Upgrade

## 1. Executive Summary
This upgrade converts the frontend from a mixed red/gold dashboard language into a centralized luxury blue-black design system with restrained cyan illumination, production-grade semantic tokens, and a unified bloody-red destructive action style.

The dark theme is now the premium default identity:
- Deep blue-black shell backgrounds.
- Layered midnight surfaces.
- Subtle atmospheric cyan glow behind elevated surfaces.
- Controlled focus, hover, and elevation logic.
- One shared button language across section headers, forms, tables, and destructive flows.

The light theme is now a daylight companion rather than a disconnected generic white mode.

---

## 2. Visual Identity Audit

### What was inconsistent
- The token source still described the brand as red/white/gold, while several shared components already leaned into generic dashboard neutrals.
- Button styling existed in multiple places: `shared/ui/button.jsx`, `AddActionButton.jsx`, `GlobalConfirmDeleteModal.jsx`, `IconButton.jsx`, `globals.css`, and `dashboard-shell.css`.
- Section chrome, cards, tables, and modal panels used different border radii, backgrounds, and shadow recipes.
- Input fields still relied on direct gray utilities, which broke visual coherence between dark and light themes.

### What was duplicated
- Primary action styling was duplicated across `AddActionButton.jsx`, `.action-btn-primary`, `.btn-premium`, and multiple inline class strings.
- Destructive actions were implemented with different red values and different hover logic.
- Table and card surfaces repeated similar but not identical `bg-[hsl(...)]`, border, and blur combinations.

### What was visually weak
- Dark mode relied on warm neutrals and legacy gold accents, which conflicted with the requested luxury midnight-blue direction.
- Some controls used flat surfaces or generic gray classes instead of layered premium surfaces.
- Header and action containers lacked a single elevated visual framing rule.

### What broke dark mode coherence
- Legacy aliases mapped to red/gold semantics, so the design language read as mixed-brand rather than intentional.
- Focus, hover, and glow logic were not consistently derived from the same accent family.
- Forms and modals used neutral gray patterns that visually disconnected from the main shell.

### What conflicted with the new identity direction
- Warm-gold emphasis as a primary accent.
- Generic dark gray surfaces without atmospheric blue separation.
- Hardcoded destructive buttons outside a shared semantic button API.
- Repeated component-level button implementations that bypassed centralized token logic.

---

## 3. Theme Token Proposal

### Background and shell tokens
- `--background`
- `--surface`
- `--surface-elevated`
- `--surface-raised`
- `--surface-overlay`
- `--surface-highlight`
- `--surface-glow`
- `--surface-danger-glow`
- `--overlay`

### Text and semantic contrast tokens
- `--foreground`
- `--muted-foreground`
- `--primary-foreground`
- `--destructive-foreground`
- `--success-foreground`
- `--warning-foreground`
- `--info-foreground`

### Accent and action tokens
- `--primary` for the midnight-blue premium action family.
- `--primary-glow` for restrained luminous lift.
- `--accent` for subtle cyan support glow.
- `--destructive` for the bloody-red destructive identity.
- `--success`, `--warning`, `--info` for harmonized state feedback.

### Border, ring, and elevation tokens
- `--border`
- `--input`
- `--ring`
- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`
- `--shadow-xl`
- `--shadow-card`
- `--shadow-elevated`
- `--shadow-primary-glow`
- `--shadow-danger-glow`

### Gradient tokens
- `--gradient-shell`
- `--gradient-hero`
- `--gradient-card`
- `--gradient-neon`
- `--gradient-cta`
- `--gradient-danger`

---

## 4. Luxury Dark Palette Definition

### Core dark palette
- Base shell: deep blue-black values around `228–229` hue.
- Elevated surfaces: midnight navy layers with controlled contrast.
- Primary action: `--midnight-500` / `--midnight-700`.
- Support glow: `--glow-400` / `--glow-500`.
- Destructive action: `--blood-500` / `--blood-700`.

### Glow rules
Glow is intentionally limited to:
- Elevated cards and shells through `--surface-glow`.
- Premium CTA buttons through `--shadow-primary-glow`.
- Critical destructive emphasis through `--shadow-danger-glow`.
- Header chrome and tab highlights through subtle cyan edge-lighting.

### Dark mode behavior
- Backgrounds avoid pure black to preserve hierarchy.
- Borders remain cool and thin, never flat gray.
- Readability is driven by high foreground contrast plus muted secondary text.

---

## 5. Light Theme Companion Definition

### Companion principles
- Uses the same semantic token names as dark mode.
- Keeps blue identity through primary, accent, and surface tinting.
- Maintains calm cool-neutral surfaces rather than generic white admin panels.
- Uses softer glow and reduced shadow density while preserving hierarchy.

### Light mode specifics
- Background: cool daylight neutrals.
- Surfaces: white and soft blue-gray.
- Accent support: cyan remains subtle.
- Destructive identity keeps the same bloody-red family at moderated depth.

---

## 6. Button System Specification

### Shared variants
Implemented in `src/shared/ui/button.jsx`:
- `default`: premium primary CTA.
- `secondary`: quieter elevated companion action.
- `outline`: compact action shell for headers, tables, and utility actions.
- `ghost`: low-emphasis action.
- `glass`: translucent shell action.
- `destructive`: high-emphasis bloody-red action.
- `dangerOutline`: restrained destructive secondary action.
- `success`: positive confirmation action.
- `premium`: elevated feature CTA.

### Unified button rules
- Primary add/save/confirm actions should use `default` unless a feature-specific reason requires `premium`.
- Cancel and low-priority dismissal actions should use `secondary`.
- Table actions should use `outline` or `dangerOutline` in icon form.
- Destructive confirmations should use `destructive` only in final irreversible steps.
- Buttons inherit shared focus rings, disabled opacity, hover lift, and border logic.

### Fixed conventions applied
- `AddActionButton` now delegates to the shared `Button` primitive.
- Section header back actions now use `secondary`.
- Table pagination and row actions now use the button system.
- Delete confirmation modal uses `secondary` + `destructive` only.

---

## 7. Surface and Layout Styling Rules

### Shared surface classes
Implemented as global reusable classes:
- `.surface-premium`
- `.surface-premium-danger`
- `.card-premium`
- `.table-shell`
- `.field-shell`
- `.section-chrome`
- `.premium-icon-shell`
- `.premium-action-strip`

### Surface rules
- Elevated surfaces use layered gradients plus low hidden glow.
- Borders stay subtle and cool, not bright cyan outlines.
- Hover lift is restrained and only used where interaction implies elevation.
- Modals use the same surface recipe as cards, but with stronger elevation.

### Table rules
- Table wrappers use `.table-shell`.
- Row action buttons use compact semantic icon actions.
- Search and pagination now visually match other premium controls.

### Form rules
- Inputs sit inside `.field-shell`.
- Focus is indicated with a soft ring derived from `--ring`.
- Errors use semantic destructive text rather than generic utility red only.

---

## 8. Section Header Styling Rules

### Header structure
- Section headers use `.section-chrome`.
- Titles are bold, high-contrast, and paired with restrained metadata chips.
- Icons use `.premium-icon-shell` for consistency with cards and modal alerts.
- Actions sit inside `.premium-action-strip` so page chrome and action placement read as one system.

### Responsive behavior
- The section heading stack stays readable on small screens.
- Header actions wrap in a controlled, padded action container.
- Back navigation uses the same button system as all other secondary actions.

---

## 9. Implementation Plan
1. Replace legacy red/gold-centric token values with midnight-blue semantic tokens.
2. Rebuild body shell, surface, glow, and utility classes around the new tokens.
3. Expand the shared button primitive to cover primary, secondary, outline, ghost, glass, success, and destructive needs.
4. Refactor shared components that previously hardcoded their own visual language.
5. Align tables, forms, modals, and section chrome to the same surface and interaction rules.
6. Validate build output and capture a visual screenshot.

---

## 10. Cleanup Targets
Completed cleanup included:
- Removing the custom primary implementation from `AddActionButton.jsx`.
- Replacing hardcoded gray field styles in `InputField.jsx`.
- Replacing hardcoded modal button styles in `GlobalConfirmDeleteModal.jsx`.
- Replacing ad-hoc table buttons and pagination buttons in `TableComponent.jsx`.
- Replacing conflicting shell/button recipes in `globals.css` and `dashboard-shell.css`.

Remaining follow-up opportunities:
- Migrate any feature-local button implementations that still use raw `<button>` styling.
- Consolidate older icon button helpers onto the shared button API.

---

## 11. Risks and Edge Cases
- Feature-specific pages with heavy custom styling may still surface legacy local button classes.
- Screens not visited during validation may need small spacing or contrast adjustments once reviewed in context.
- Some historical utility classes remain for backward compatibility, but the new semantic system should be preferred for all future work.

---

## 12. Final Applied Changes
- Replaced global theme tokens with a luxury blue-black palette and companion light palette.
- Added semantic shell/surface/glow/shadow classes.
- Rebuilt the shared button primitive to enforce unified action semantics.
- Updated shared header, add action, main card, input, delete modal, and table components to consume the system.
- Updated dashboard shell helpers so page chrome follows the same premium identity.

---

## 13. Documentation Added or Updated
- Added this document as the source of truth for the new premium identity system.
- This doc should be used with `docs/visual-system-ownership.md` to keep future work centralized.

## Anti-patterns
Do not:
- Hardcode random hex/HSL values in component files for actions or surfaces.
- Reintroduce generic gray form controls beside the premium field shell.
- Use glow on every surface.
- Use bloody red for anything other than destructive, critical, or high-risk states.
- Build one-off header action buttons outside the shared `Button` primitive.
