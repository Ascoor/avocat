# Layout Ownership Map

## Final convention
- `src/shared/layout/shells/**`: **application shells** (full-screen framing + route outlet framing).
- `src/shared/layout/navigation/**`: **navigation chrome** owned by shells (header, top tabs, mobile drawer, nav ordering helpers).
- `src/shared/components/layout/**`: **layout primitives** only (presentational wrappers, no navigation/business concerns).
- `src/pages/**`: route containers choose shell, but do not implement shell chrome.
- `src/app/**`: routing/guards wiring only.

## Current ownership matrix
| Module | Type | Primary consumer |
| --- | --- | --- |
| `shells/DashboardShell.jsx` | Shell | `features/dashboard/pages/DashboardPage.jsx` |
| `shells/AuthShell.jsx` | Shell | `features/auth/pages/Login.jsx`, `features/auth/pages/Signup.jsx` |
| `navigation/AppHeader.jsx` | Navigation chrome | `shells/DashboardShell.jsx` |
| `navigation/HeaderTabs.jsx` | Navigation chrome | `navigation/AppHeader.jsx` |
| `navigation/MobileNavigationDrawer.jsx` | Navigation chrome | `shells/DashboardShell.jsx` |
| `navigation/AppNavLink.jsx` | Layout primitive (navigation) | `navigation/HeaderTabs.jsx`, `navigation/MobileNavigationDrawer.jsx` |
| `navigation/navOrder.js` | Layout helper | `navigation/HeaderTabs.jsx`, `navigation/MobileNavigationDrawer.jsx` |
| `utils/layoutClasses.js` | Layout helper | shared utility (allowed for future shell/primitives use) |
| `components/layout/PageContainer.jsx` | Layout primitive | `features/courts/pages/SearchCourtsApi.jsx` |

## Anti-patterns
- Adding feature/business widgets under `shared/layout/**`.
- Duplicating shell-like headers/sidebars inside `features/**`.
- Building route-specific wrappers that re-implement `DashboardShell` or `AuthShell`.


## Visual system ownership
- Cross-app visual tokens and global style layers live in `docs/visual-system-ownership.md` (`src/theme/**` + `src/styles/**`).
- Keep `shared/layout/**` limited to layout structure and layout-specific style hooks/classes.
