import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { rbacClient } from "@shared/api/rbac/client";
import type { RbacMeResponse, RbacRole, RbacUser } from "@shared/api/rbac/types";
import { useAuth } from "@shared/contexts/AuthContext";
import { rolePermissionMap } from "@shared/security/roles";

type SecurityContextValue = {
  user: RbacUser | null;
  roles: RbacRole[];
  permissions: string[];
  loading: boolean;
  refreshMe: () => Promise<RbacMeResponse>;
};

const SecurityContext = createContext<SecurityContextValue | null>(null);

const getRoleFallbackPermissions = (role?: string | null) => {
  if (!role) return [];
  const normalizedRole = role.toLowerCase() as keyof typeof rolePermissionMap;
  return rolePermissionMap[normalizedRole] ?? [];
};

export const SecurityProvider = ({ children }) => {
  const { isAuthenticated, user: authUser } = useAuth();
  const [state, setState] = useState<RbacMeResponse>({ user: null, roles: [], permissions: [] });
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    if (!isAuthenticated) {
      const fallback = { user: null, roles: [], permissions: [] } as RbacMeResponse;
      setState(fallback);
      setLoading(false);
      return fallback;
    }

    setLoading(true);
    try {
      const me = await rbacClient.me();
      const fallbackPermissions = getRoleFallbackPermissions(authUser?.role);
      const resolvedPermissions = me.permissions.length > 0 ? me.permissions : fallbackPermissions;
      const nextState = { ...me, permissions: resolvedPermissions };
      setState(nextState);
      return nextState;
    } catch (error) {
      console.error("Failed to load RBAC profile:", error);
      const fallback = {
        user: null,
        roles: [],
        permissions: getRoleFallbackPermissions(authUser?.role),
      } as RbacMeResponse;
      setState(fallback);
      return fallback;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, authUser?.role]);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const value = useMemo(
    () => ({ ...state, loading, refreshMe }),
    [state, loading, refreshMe],
  );

  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>;
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) throw new Error("useSecurity must be used within SecurityProvider");
  return context;
};
