export const permissionMap = {
  legalCases: {
    view: "legal-cases.view",
    create: "legal-cases.create",
    update: "legal-cases.update",
    delete: "legal-cases.delete",
  },
  clients: {
    view: "clients.view",
    create: "clients.create",
    update: "clients.update",
    delete: "clients.delete",
  },
  sessions: {
    view: "sessions.view",
    create: "sessions.create",
    update: "sessions.update",
    delete: "sessions.delete",
  },
  procedures: {
    view: "procedures.view",
    create: "procedures.create",
    update: "procedures.update",
    delete: "procedures.delete",
  },
  courts: {
    view: "courts.view",
    create: "courts.create",
    update: "courts.update",
    delete: "courts.delete",
  },
  adminUsers: {
    view: "admin-users.view",
    create: "admin-users.create",
    update: "admin-users.update",
    delete: "admin-users.delete",
  },
  adminRoles: {
    view: "admin-roles.view",
    create: "admin-roles.create",
    update: "admin-roles.update",
    delete: "admin-roles.delete",
  },
  adminPermissions: {
    view: "admin-permissions.view",
    create: "admin-permissions.create",
    update: "admin-permissions.update",
    delete: "admin-permissions.delete",
  },
} as const;

export type PermissionModuleKey = keyof typeof permissionMap;
export type CrudPermissions = (typeof permissionMap)[PermissionModuleKey];

export const allPermissions = Object.values(permissionMap).flatMap((crud) => Object.values(crud));
