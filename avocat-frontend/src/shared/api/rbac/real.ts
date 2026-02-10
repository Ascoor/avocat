import type { RbacClient } from "./types";

const notImplemented = async () => {
  throw new Error("RBAC real API is not configured yet.");
};

export const realRbacClient: RbacClient = {
  me: notImplemented,
  users: { list: notImplemented, create: notImplemented, update: notImplemented, delete: notImplemented },
  roles: { list: notImplemented, create: notImplemented, update: notImplemented, delete: notImplemented },
  permissions: { list: notImplemented },
  syncRolePermissions: notImplemented,
  syncUserRoles: notImplemented,
  setCurrentUser: notImplemented,
};
