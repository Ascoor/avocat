import { permissionMap, type PermissionModuleKey } from "@shared/security/permission-map";

export const hasPermission = (permissions: string[] = [], permission?: string) =>
  Boolean(permission && permissions.includes(permission));

export const hasAny = (permissions: string[] = [], required: string[] = []) =>
  required.some((permission) => permissions.includes(permission));

export const hasAll = (permissions: string[] = [], required: string[] = []) =>
  required.every((permission) => permissions.includes(permission));

export const canCrud = (permissions: string[] = [], moduleKey: PermissionModuleKey) => {
  const crud = permissionMap[moduleKey];
  return {
    view: hasPermission(permissions, crud.view),
    create: hasPermission(permissions, crud.create),
    update: hasPermission(permissions, crud.update),
    delete: hasPermission(permissions, crud.delete),
  };
};
