export type RbacCrudAction = "view" | "create" | "update" | "delete";

export type RbacPermission = { name: string; module: string; labelAr?: string; labelEn?: string };
export type RbacRole = { id: string; name: string; permissionNames: string[]; createdAt: string; updatedAt: string };
export type RbacUser = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  roleIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type RbacMeResponse = {
  user: RbacUser | null;
  roles: RbacRole[];
  permissions: string[];
};

export type RbacMockDb = {
  users: RbacUser[];
  roles: RbacRole[];
  permissions: RbacPermission[];
  currentUserId: string;
};

export type RbacClient = {
  me: () => Promise<RbacMeResponse>;
  users: {
    list: () => Promise<RbacUser[]>;
    create: (payload: Pick<RbacUser, "name" | "email" | "status" | "roleIds">) => Promise<RbacUser>;
    update: (userId: string, payload: Partial<Pick<RbacUser, "name" | "email" | "status" | "roleIds">>) => Promise<RbacUser>;
    delete: (userId: string) => Promise<void>;
  };
  roles: {
    list: () => Promise<RbacRole[]>;
    create: (payload: Pick<RbacRole, "name"> & { permissionNames?: string[] }) => Promise<RbacRole>;
    update: (roleId: string, payload: Partial<Pick<RbacRole, "name">> & { permissionNames?: string[] }) => Promise<RbacRole>;
    delete: (roleId: string) => Promise<void>;
  };
  permissions: {
    list: () => Promise<RbacPermission[]>;
  };
  syncRolePermissions: (roleId: string, permissionNames: string[]) => Promise<RbacRole>;
  syncUserRoles: (userId: string, roleIds: string[]) => Promise<RbacUser>;
  setCurrentUser: (userId: string) => Promise<void>;
};
