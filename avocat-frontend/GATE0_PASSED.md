## Gate0: TypeScript no-emit pass

- **Date:** 2026-02-08
- **Issue:** `npx tsc --noEmit` failed on master due to missing React typings, JSX runtime gaps, and vendor module declarations.
- **Fixes:**
  - Hardened `tsconfig.json` to include `src/types`, set JSX handling, and route critical modules to local stubs.
  - Added React/JSX runtime shims and expanded `src/types` to cover missing React exports, JSX elements, and vendor module stubs.
  - Added targeted stubs for missing vendor modules and aliased libraries (react-redux, react-router-dom, recharts, react-spring web, radix slot).
- **Status:** `npx tsc --noEmit` ✅
