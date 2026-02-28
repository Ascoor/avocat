# Legacy permission key usage inventory

Generated during RBAC permission migration hardening.

## Remaining legacy dashed keys
Only the compatibility alias layer in `src/shared/security/permission-map.ts` still references legacy dashed keys:

- `legal-cases.*`
- `admin-users.*`
- `admin-roles.*`
- `admin-permissions.*`

## Runtime discovery
Development telemetry in `src/shared/security/permissions.ts` logs deprecated keys once and tracks usage counts in-memory via `getLegacyPermissionUsage()`.
