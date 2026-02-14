import { permissionMap, type PermissionName } from "@shared/security/permission-map";

type RoleName = "super_admin" | "admin" | "lawyer" | "assistant" | "viewer";

const flatten = (...namespaces: Array<Record<string, PermissionName>>) =>
  namespaces.flatMap((namespace) => Object.values(namespace));

const all = flatten(...Object.values(permissionMap));
const withoutDelete = all.filter((permission) => !permission.endsWith(".delete"));

const assistantBlocked = new Set<PermissionName>([
  permissionMap.legalCases.delete,
  permissionMap.legalCases.close,
  permissionMap.services.delete,
  permissionMap.services.close,
  permissionMap.sessions.delete,
  permissionMap.procedures.delete,
  permissionMap.clients.delete,
]);

const viewerAllowed = new Set<PermissionName>([
  permissionMap.legalCases.view,
  permissionMap.clients.view,
  permissionMap.sessions.view,
  permissionMap.procedures.view,
  permissionMap.services.view,
  permissionMap.courts.view,
  permissionMap.reports.view,
  permissionMap.reports.list,
  permissionMap.reports.search,
  permissionMap.reports.filter,
]);

export const rolePermissionMap: Record<RoleName, PermissionName[]> = {
  super_admin: all,
  admin: withoutDelete,
  lawyer: [
    ...flatten(permissionMap.legalCases, permissionMap.clients, permissionMap.sessions, permissionMap.procedures, permissionMap.services),
    ...flatten(permissionMap.courts, permissionMap.reports),
  ].filter((permission) => !permission.startsWith("users.") && !permission.startsWith("roles.") && !permission.startsWith("permissions.")),
  assistant: withoutDelete.filter((permission) => !assistantBlocked.has(permission as PermissionName)),
  viewer: Array.from(viewerAllowed),
};

export const isPrivilegedRole = (roleName: string) => ["super_admin", "admin"].includes(roleName);
