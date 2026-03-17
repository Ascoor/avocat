# 1. Executive Summary
- Completed a full static dependency scan over `avocat-frontend/src` and generated a machine-readable inventory at `docs/frontend-file-inventory.csv`.
- Performed a first cleanup batch that removed clearly unreachable legacy modules (calendar prototype, archived wordpad prototype, and three obsolete admin pages).
- Current architecture is hybrid: modern shared/ui + contexts coexists with older feature-local API/hooks/components patterns.

# 2. File Inventory Findings
- Total frontend files scanned: 603
- Source/config files analyzed for imports: 354
- Reachable from `src/main.tsx`: 194
- Not reachable from entry graph: 160
- Detailed row-level inventory: `docs/frontend-file-inventory.csv` (contains path, responsibility, imports/imported-by, reachability, and status).

# 3. Unused Files Report
## Confirmed unused (removed in this change)
- `src/features/calendar/**` (standalone feature tree with no route/import references).
- `src/features/archives/**` (commented prototype code, never imported).
- `src/features/admin/pages/AdminUsersPage.jsx` (superseded by `AdminAccessManagementPage`).
- `src/features/admin/pages/AdminRolesPage.jsx` (superseded by `AdminAccessManagementPage`).
- `src/features/admin/pages/AdminPermissionsPage.jsx` (superseded by `AdminAccessManagementPage`).

## Likely unused (needs runtime confirmation before deletion)
- Multiple isolated files in `src/shared/ui/*` and `src/shared/hooks/*` are currently unreachable from app entry.
- Several legacy API wrappers in `src/shared/services/api/*` are not linked from active routes.

# 4. Duplicate / Overlapping Files Report
- Auth has overlapping implementations across `features/auth/pages/*` and old component-level flows (`features/auth/components/*`).
- UI responsibilities are duplicated between `shared/components/common/*` and `shared/ui/*` libraries.
- Service layer overlap exists between `shared/api/*.ts` and `shared/services/api/*.js`.

# 5. Architecture Problems
- Mixed architecture styles (feature-sliced vs legacy foldering) increase cognitive load.
- Route ownership is centralized, but data/service ownership is fragmented across features/shared/services.
- Naming conventions are inconsistent (`LegalServicList`, `ManagmentSettings`, mixed singular/plural).
- Some business logic is still embedded in presentation components.

# 6. Target Structure Proposal
```text
src/
  app/                # entry, providers composition, router
  pages/              # route-level screens only (optional if feature pages remain)
  features/
    <domain>/
      pages/
      components/
      hooks/
      services/
      types/
  shared/
    ui/               # design-system reusable primitives only
    components/       # cross-feature composed components
    lib/              # pure utilities
    api/              # single HTTP client + domain API modules
    contexts/
    hooks/
    types/
    styles/
```
Decisions linked to current tree:
- Keep `app/*`, `features/*`, `shared/contexts/*`, `shared/security/*`.
- Merge `shared/services/api/*` into `shared/api/*` progressively.
- Move feature-specific UI out of `shared/components/common/*` into owning feature.
- Consolidate auth under `features/auth/pages + hooks` and retire obsolete component-era auth forms.

# 7. Cleanup Tasks
1. **Remove unreachable legacy modules (done)**
   - Goal: reduce dead-code surface and accidental imports.
2. **Normalize naming in active routes**
   - Fix typoed filenames and route imports with safe rename commits.
3. **Service layer consolidation**
   - Replace dual API layers with one typed API boundary.
4. **Shared UI boundary cleanup**
   - Keep primitives in `shared/ui`, move business widgets out.

# 8. Refactor Tasks
- Introduce per-feature `index.ts` public APIs to stop deep relative imports.
- Add dependency rules (eslint import boundaries) to prevent cross-feature leakage.
- Split oversized route modules and add route-level code ownership.
- Add dead-export detection in CI (e.g., `ts-prune` or `knip`) after TS compatibility pass.

# 9. Risks and Edge Cases
- Dynamic imports and string-based loaders can hide true runtime usage; all deletions were limited to files with zero references in current repo.
- Some legacy helper files may be used externally (manual script injection); assumption: app is bundled exclusively through Vite entry graph.
- Stubs under `src/types/stubs` may appear unreachable but are indirectly referenced by TS path mappings.

# 10. Final Recommended Action Order
1. Delete confirmed-unused files (completed first batch).
2. Consolidate duplicate service layers (`shared/services/api` -> `shared/api`).
3. Resolve auth duplication (page-first flow only).
4. Enforce folder boundaries + naming convention.
5. Add CI static checks for unused files/exports/dependencies.

# 11. Phase 2: Route Ownership Consolidation
- Added explicit route-container layer under `avocat-frontend/src/pages/**`.
- Public route paths are now declared from a single map: `avocat-frontend/src/routes/publicRoutes.ts`.
- `app/App.tsx` and `app/routes/AuthRoutes.jsx` now depend on `pages/**` entries instead of importing feature screens directly.
- Full route ownership matrix documented in `docs/frontend-route-ownership-map.md`.

Adopted convention in code:
- `app/` = wiring and route mounting
- `routes/` = route path maps/config
- `pages/` = route container entries
- `features/` = feature implementation
- `shared/` = reusable shared building blocks only
