import { allPermissions, permissionMap } from "@shared/security/permission-map";
import type { RbacClient, RbacMockDb, RbacPermission, RbacRole, RbacUser } from "./types";

const STORAGE_KEY = "RBAC_MOCK_DB";
const now = () => new Date().toISOString();
const uid = () => Math.random().toString(36).slice(2, 10);
let memoryDb: RbacMockDb | null = null;

const toPermissionList = (): RbacPermission[] =>
  Object.entries(permissionMap).flatMap(([module, crud]) =>
    Object.entries(crud).map(([action, name]) => ({
      name,
      module,
      labelEn: `${module} ${action}`,
      labelAr: `${module} ${action}`,
    })),
  );

const seedDb = (): RbacMockDb => {
  const permissions = toPermissionList();
  const admin: RbacRole = { id: "role_admin", name: "Admin", permissionNames: [...allPermissions], createdAt: now(), updatedAt: now() };
  const editor: RbacRole = {
    id: "role_editor",
    name: "Editor",
    permissionNames: allPermissions.filter((name) => !name.endsWith(".delete") && !name.startsWith("admin-")),
    createdAt: now(),
    updatedAt: now(),
  };
  const viewer: RbacRole = {
    id: "role_viewer",
    name: "Viewer",
    permissionNames: allPermissions.filter((name) => name.endsWith(".view") && !name.startsWith("admin-")),
    createdAt: now(),
    updatedAt: now(),
  };

  const users: RbacUser[] = [
    { id: "user_admin", name: "Admin User", email: "admin@local", status: "active", roleIds: [admin.id], createdAt: now(), updatedAt: now() },
    { id: "user_editor", name: "Editor User", email: "editor@local", status: "active", roleIds: [editor.id], createdAt: now(), updatedAt: now() },
    { id: "user_viewer", name: "Viewer User", email: "viewer@local", status: "active", roleIds: [viewer.id], createdAt: now(), updatedAt: now() },
  ];

  return { users, roles: [admin, editor, viewer], permissions, currentUserId: users[0].id };
};

const persist = (db: RbacMockDb) => {
  memoryDb = db;
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

const getDb = (): RbacMockDb => {
  if (memoryDb) return memoryDb;
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      memoryDb = JSON.parse(raw) as RbacMockDb;
      return memoryDb;
    }
  }
  memoryDb = seedDb();
  persist(memoryDb);
  return memoryDb;
};

const withDb = <T>(cb: (db: RbacMockDb) => T): T => {
  const db = getDb();
  const result = cb(db);
  persist(db);
  return result;
};

export const mockRbacClient: RbacClient = {
  me: async () => {
    const db = getDb();
    const user = db.users.find((item) => item.id === db.currentUserId) ?? null;
    const roles = db.roles.filter((role) => user?.roleIds.includes(role.id));
    const permissions = Array.from(new Set(roles.flatMap((role) => role.permissionNames)));
    return { user, roles, permissions };
  },
  users: {
    list: async () => [...getDb().users],
    create: async (payload) =>
      withDb((db) => {
        const created: RbacUser = { id: `user_${uid()}`, createdAt: now(), updatedAt: now(), ...payload };
        db.users.unshift(created);
        return created;
      }),
    update: async (userId, payload) =>
      withDb((db) => {
        const idx = db.users.findIndex((item) => item.id === userId);
        if (idx < 0) throw new Error("User not found");
        db.users[idx] = { ...db.users[idx], ...payload, updatedAt: now() };
        return db.users[idx];
      }),
    delete: async (userId) =>
      withDb((db) => {
        db.users = db.users.filter((item) => item.id !== userId);
        if (!db.users.find((item) => item.id === db.currentUserId)) {
          db.currentUserId = db.users[0]?.id || "";
        }
      }),
  },
  roles: {
    list: async () => [...getDb().roles],
    create: async (payload) =>
      withDb((db) => {
        const created: RbacRole = {
          id: `role_${uid()}`,
          createdAt: now(),
          updatedAt: now(),
          name: payload.name,
          permissionNames: payload.permissionNames ?? [],
        };
        db.roles.unshift(created);
        return created;
      }),
    update: async (roleId, payload) =>
      withDb((db) => {
        const idx = db.roles.findIndex((item) => item.id === roleId);
        if (idx < 0) throw new Error("Role not found");
        db.roles[idx] = {
          ...db.roles[idx],
          name: payload.name ?? db.roles[idx].name,
          permissionNames: payload.permissionNames ?? db.roles[idx].permissionNames,
          updatedAt: now(),
        };
        return db.roles[idx];
      }),
    delete: async (roleId) =>
      withDb((db) => {
        db.roles = db.roles.filter((item) => item.id !== roleId);
        db.users = db.users.map((user) => ({ ...user, roleIds: user.roleIds.filter((id) => id !== roleId) }));
      }),
  },
  permissions: {
    list: async () => [...getDb().permissions],
  },
  syncRolePermissions: async (roleId, permissionNames) =>
    withDb((db) => {
      const idx = db.roles.findIndex((item) => item.id === roleId);
      if (idx < 0) throw new Error("Role not found");
      db.roles[idx] = { ...db.roles[idx], permissionNames: Array.from(new Set(permissionNames)), updatedAt: now() };
      return db.roles[idx];
    }),
  syncUserRoles: async (userId, roleIds) =>
    withDb((db) => {
      const idx = db.users.findIndex((item) => item.id === userId);
      if (idx < 0) throw new Error("User not found");
      db.users[idx] = { ...db.users[idx], roleIds: Array.from(new Set(roleIds)), updatedAt: now() };
      return db.users[idx];
    }),
  setCurrentUser: async (userId) => withDb((db) => { db.currentUserId = userId; }),
};
