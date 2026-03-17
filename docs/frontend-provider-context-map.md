# Frontend Provider/Context Ownership Map

## Final convention
- `src/shared/contexts/**`: context definitions, state ownership, and consumer hooks (`useX`).
- `src/providers/**`: provider composition only (root wiring and route-scoped wiring), no business state.
- `src/app/**`: routing/auth guards only; does not own provider composition details.

## Provider tree (single composition source)

### Entry-level app providers (`src/providers/AppProviders.jsx`)
1. `LanguageProvider`
2. `AlertProvider`
3. `ReduxProvider`
4. `AuthProvider`
5. `SecurityProvider`

### Route-scoped providers (`src/providers/RouteProviders.jsx`)
> Kept route-scoped because `SidebarProvider` depends on router location APIs.

1. `ThemeProvider`
2. `SpinnerProvider`
3. `SidebarProvider`

## Context/provider inventory

| Name | Path | Type | Value owner | Composition owner | Consumed | Status |
|---|---|---|---|---|---|---|
| Alert | `src/shared/contexts/AlertContext.jsx` | Context Definition + State Owner + Hook | `AlertProvider` | `AppProviders` | Feature forms, settings, finance, auth | Active |
| Auth | `src/shared/contexts/AuthContext.jsx` | Context Definition + State Owner + Hook | `AuthProvider` | `AppProviders` | `App`, auth pages, `SecurityContext`, header/hooks | Active |
| Language | `src/shared/contexts/LanguageContext.jsx` | Context Definition + State Owner + Hook | `LanguageProvider` | `AppProviders` | Layout/features/shared UI | Active |
| Security | `src/shared/security/SecurityContext.tsx` | Context Definition + State Owner + Hook | `SecurityProvider` | `AppProviders` | Permission guards/admin/features | Active |
| Theme | `src/shared/contexts/ThemeContext.jsx` | Context Definition + State Owner + Hook | `ThemeProvider` | `RouteProviders` | Theme toggle + dashboard charts | Active |
| Spinner | `src/shared/contexts/SpinnerContext.jsx` | Context Definition + State Owner + Hook | `SpinnerProvider` | `RouteProviders` | `AuthRoutes` lazy-loading helper | Active |
| Sidebar | `src/shared/contexts/SidebarContext.jsx` | Context Definition + State Owner + Hook | `SidebarProvider` | `RouteProviders` | Header, mobile drawer, sidebar widgets | Active |
| Legacy data | `src/shared/contexts/DataContext.jsx` | Context Definition + State Owner | `DataProvider` | N/A | No imports | Removed (orphaned) |
| Legacy sidebar re-export | `src/shared/utils/SidebarContext.jsx` | Wrapper re-export | N/A | N/A | No imports | Removed (duplicate) |

## App-level vs feature-level rule
- App-level state is allowed only when shared across routes/shell (`auth`, `language`, `security`, global `alert`, global `theme`, `spinner`, `sidebar UI state`).
- Feature-level state stays inside feature modules/hooks and must not be lifted to app providers unless reused across multiple route domains.

## When local providers are allowed
Local feature providers are allowed only when all conditions hold:
1. State is feature-bounded (not needed by shell or other route domains).
2. Provider is mounted only under that feature route/subtree.
3. Dependency ordering with app providers is explicitly documented in the feature module.
