import { permissionAliases, permissionMap, type ModulePermissions, type PermissionModuleKey, type PermissionName } from "@shared/security/permission-map";

const warnedAliases = new Set<string>();
const legacyPermissionUsage: Record<string, number> = {};

const normalizePermission = (permission?: string) => {
  if (!permission) return permission;
  const normalized = permissionAliases[permission] ?? permission;

  if ((import.meta as any).env?.DEV && normalized !== permission) {
    legacyPermissionUsage[permission] = (legacyPermissionUsage[permission] ?? 0) + 1;

    if (!warnedAliases.has(permission)) {
      warnedAliases.add(permission);
      console.warn(`[RBAC] Deprecated permission key "${permission}" used. Please use "${normalized}" instead.`);
    }
  }

  return normalized;
};

const normalizePermissionList = (permissions: string[] = []) => permissions.map((permission) => normalizePermission(permission));

export const hasPermission = (permissions: string[] = [], permission?: string) =>
  Boolean(permission && normalizePermissionList(permissions).includes(normalizePermission(permission)));

export const hasAny = (permissions: string[] = [], required: string[] = []) =>
  required.some((permission) => hasPermission(permissions, permission));

export const hasAll = (permissions: string[] = [], required: string[] = []) =>
  required.every((permission) => hasPermission(permissions, permission));

export const modulePermissions = <TModule extends PermissionModuleKey>(moduleKey: TModule): ModulePermissions<TModule> =>
  permissionMap[moduleKey];

export const canCrud = (permissions: string[] = [], moduleKey: PermissionModuleKey) => {
  const moduleAcl = permissionMap[moduleKey] as Record<string, string>;
  return {
    view: hasPermission(permissions, moduleAcl.view),
    create: hasPermission(permissions, moduleAcl.create),
    update: hasPermission(permissions, moduleAcl.update),
    delete: hasPermission(permissions, moduleAcl.delete),
  };
};

export const canAction = (
  permissions: string[] = [],
  moduleOrPermission: PermissionModuleKey | PermissionName,
  action?: string,
) => {
  if (!action) return hasPermission(permissions, moduleOrPermission);
  return hasPermission(permissions, (permissionMap[moduleOrPermission as PermissionModuleKey] as any)[action]);
};

export const guardPermissions = (
  permissions: string[] = [],
  requirement: PermissionName | PermissionName[],
  match: "all" | "any" = "all",
) => {
  const required = Array.isArray(requirement) ? requirement : [requirement];
  return match === "all" ? hasAll(permissions, required) : hasAny(permissions, required);
};

export const getLegacyPermissionUsage = () => ({ ...legacyPermissionUsage });
