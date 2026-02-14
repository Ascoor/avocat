import { permissionMap, type ModulePermissions, type PermissionModuleKey, type PermissionName } from "@shared/security/permission-map";

export const hasPermission = (permissions: string[] = [], permission?: string) =>
  Boolean(permission && permissions.includes(permission));

export const hasAny = (permissions: string[] = [], required: string[] = []) =>
  required.some((permission) => permissions.includes(permission));

export const hasAll = (permissions: string[] = [], required: string[] = []) =>
  required.every((permission) => permissions.includes(permission));

export const modulePermissions = <TModule extends PermissionModuleKey>(moduleKey: TModule): ModulePermissions<TModule> =>
  permissionMap[moduleKey];

export const canCrud = (permissions: string[] = [], moduleKey: PermissionModuleKey) => {
  const moduleAcl = permissionMap[moduleKey];
  return {
    view: hasPermission(permissions, moduleAcl.view),
    create: hasPermission(permissions, moduleAcl.create),
    update: hasPermission(permissions, moduleAcl.update),
    delete: hasPermission(permissions, moduleAcl.delete),
  };
};

export const canAction = (
  permissions: string[] = [],
  moduleKey: PermissionModuleKey,
  action: keyof ModulePermissions,
) => hasPermission(permissions, permissionMap[moduleKey][action]);

export const guardPermissions = (
  permissions: string[] = [],
  requirement: PermissionName | PermissionName[],
  match: "all" | "any" = "all",
) => {
  const required = Array.isArray(requirement) ? requirement : [requirement];
  return match === "all" ? hasAll(permissions, required) : hasAny(permissions, required);
};
