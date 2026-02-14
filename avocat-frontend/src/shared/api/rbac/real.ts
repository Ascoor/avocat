import api from "@shared/services/api/axiosConfig";
import type { RbacClient, RbacMeResponse, RbacPermission, RbacRole, RbacUser } from "./types";

const unwrap = <T>(response: { data?: { data?: T } | T }): T => {
  const payload = response?.data as { data?: T } | T;
  if (payload && typeof payload === "object" && "data" in (payload as { data?: T })) {
    return (payload as { data?: T }).data as T;
  }
  return payload as T;
};

const normalizeUser = (user: Partial<RbacUser> | null): RbacUser | null => {
  if (!user) return null;
  return {
    id: String(user.id ?? ""),
    name: user.name ?? "",
    email: user.email ?? "",
    status: user.status === "inactive" ? "inactive" : "active",
    roleIds: Array.isArray(user.roleIds) ? user.roleIds.map(String) : [],
    createdAt: user.createdAt ?? new Date().toISOString(),
    updatedAt: user.updatedAt ?? new Date().toISOString(),
  };
};

const normalizeRole = (role: Partial<RbacRole>): RbacRole => ({
  id: String(role.id ?? ""),
  name: role.name ?? "",
  permissionNames: Array.isArray(role.permissionNames) ? role.permissionNames : [],
  createdAt: role.createdAt ?? new Date().toISOString(),
  updatedAt: role.updatedAt ?? new Date().toISOString(),
});

export const realRbacClient: RbacClient = {
  me: async () => {
    const response = await api.get("/rbac/me");
    const payload = unwrap<Partial<RbacMeResponse>>(response);
    return {
      user: normalizeUser(payload?.user ?? null),
      roles: Array.isArray(payload?.roles) ? payload.roles.map(normalizeRole) : [],
      permissions: Array.isArray(payload?.permissions) ? payload.permissions : [],
    };
  },
  users: {
    list: async () => {
      const response = await api.get("/rbac/users");
      const rows = unwrap<Partial<RbacUser>[]>(response) ?? [];
      return rows.map((row) => normalizeUser(row)).filter(Boolean) as RbacUser[];
    },
    create: async (payload) => {
      const response = await api.post("/rbac/users", payload);
      return normalizeUser(unwrap<Partial<RbacUser>>(response)) as RbacUser;
    },
    update: async (userId, payload) => {
      const response = await api.put(`/rbac/users/${userId}`, payload);
      return normalizeUser(unwrap<Partial<RbacUser>>(response)) as RbacUser;
    },
    delete: async (userId) => {
      await api.delete(`/rbac/users/${userId}`);
    },
  },
  roles: {
    list: async () => {
      const response = await api.get("/rbac/roles");
      const rows = unwrap<Partial<RbacRole>[]>(response) ?? [];
      return rows.map(normalizeRole);
    },
    create: async (payload) => {
      const response = await api.post("/rbac/roles", payload);
      return normalizeRole(unwrap<Partial<RbacRole>>(response));
    },
    update: async (roleId, payload) => {
      const response = await api.put(`/rbac/roles/${roleId}`, payload);
      return normalizeRole(unwrap<Partial<RbacRole>>(response));
    },
    delete: async (roleId) => {
      await api.delete(`/rbac/roles/${roleId}`);
    },
  },
  permissions: {
    list: async () => {
      const response = await api.get("/rbac/permissions");
      return unwrap<RbacPermission[]>(response) ?? [];
    },
  },
  syncRolePermissions: async (roleId, permissionNames) => {
    const response = await api.put(`/rbac/roles/${roleId}`, { permissionNames });
    return normalizeRole(unwrap<Partial<RbacRole>>(response));
  },
  syncUserRoles: async (userId, roleIds) => {
    const response = await api.put(`/rbac/users/${userId}`, { roleIds });
    return normalizeUser(unwrap<Partial<RbacUser>>(response)) as RbacUser;
  },
  setCurrentUser: async () => {
    return;
  },
};
