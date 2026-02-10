import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { rbacClient } from "@shared/api/rbac/client";
import type { RbacMeResponse, RbacRole, RbacUser } from "@shared/api/rbac/types";

type SecurityContextValue = {
  user: RbacUser | null;
  roles: RbacRole[];
  permissions: string[];
  loading: boolean;
  refreshMe: () => Promise<RbacMeResponse>;
};

const SecurityContext = createContext<SecurityContextValue | null>(null);

export const SecurityProvider = ({ children }) => {
  const [state, setState] = useState<RbacMeResponse>({ user: null, roles: [], permissions: [] });
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    setLoading(true);
    try {
      const me = await rbacClient.me();
      setState(me);
      return me;
    } finally {
      setLoading(false);
    }
  }, []);

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
