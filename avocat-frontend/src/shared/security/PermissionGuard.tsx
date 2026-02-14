import type { ReactNode } from "react";
import { useSecurity } from "@shared/security/SecurityContext";
import type { PermissionName } from "@shared/security/permission-map";
import { guardPermissions } from "@shared/security/permissions";
import ForbiddenState from "@shared/security/ForbiddenState";

type PermissionGuardProps = {
  require: PermissionName | PermissionName[];
  match?: "all" | "any";
  moduleLabel?: string;
  fallback?: ReactNode;
  children: ReactNode;
};

const PermissionGuard = ({ require, match = "all", fallback, children, moduleLabel = "هذا القسم" }: PermissionGuardProps) => {
  const { permissions } = useSecurity();
  const allowed = guardPermissions(permissions, require, match);

  if (!allowed) return <>{fallback ?? <ForbiddenState moduleLabel={moduleLabel} />}</>;
  return <>{children}</>;
};

export default PermissionGuard;
