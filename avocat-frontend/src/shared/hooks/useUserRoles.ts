import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAdminProfile } from '@shared/api/adminAuth.service';
import type { Permission, Role } from '@shared/types/website';
import { useAuth } from '@shared/contexts/AuthContext';

const rolePermissions: Record<Role, Permission[]> = {
  Admin: [
    'pages:view',
    'pages:edit',
    'pages:publish',
    'pages:approve',
    'pages:schedule',
    'pages:bulk-publish',
    'media:upload',
    'analytics:view',
  ],
  Editor: ['pages:view', 'pages:edit', 'pages:schedule', 'media:upload'],
  Viewer: ['pages:view', 'analytics:view'],
};

const normalizeRoles = (roles?: Role[] | null): Role[] => {
  if (!roles || roles.length === 0) {
    return ['Viewer'];
  }
  const unique = Array.from(new Set(roles));
  return unique as Role[];
};

export interface UseUserRolesResult {
  roles: Role[];
  permissions: Permission[];
  hasRole: (role: Role | Role[]) => boolean;
  can: (permission: Permission) => boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  isAdmin: boolean;
}

export const useUserRoles = (): UseUserRolesResult => {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = isAuthenticated && user?.role === 'admin';

  const profileQuery = useQuery({
    queryKey: ['admin-profile'],
    queryFn: getAdminProfile,
    enabled: isAdmin,
  });

  const roles = useMemo(() => {
    if (!isAdmin) {
      return ['Viewer'] as Role[];
    }

    return normalizeRoles(profileQuery.data?.roles);
  }, [isAdmin, profileQuery.data?.roles]);

  const permissions = useMemo(() => {
    const base = new Set<Permission>();

    if (!isAdmin) {
      return Array.from(base);
    }

    roles.forEach((role) => {
      const rolePerms = rolePermissions[role];
      rolePerms?.forEach((permission) => base.add(permission));
    });
    profileQuery.data?.permissions?.forEach((permission) => base.add(permission));
    return Array.from(base);
  }, [isAdmin, profileQuery.data?.permissions, roles]);

  const hasRole = useCallback(
    (role: Role | Role[]) => {
      const targets = Array.isArray(role) ? role : [role];
      return targets.some((target) => roles.includes(target));
    },
    [roles],
  );

  const can = useCallback(
    (permission: Permission) => {
      return permissions.includes(permission);
    },
    [permissions],
  );

  return {
    roles,
    permissions,
    hasRole,
    can,
    isLoading: profileQuery.isLoading && isAdmin,
    isFetching: profileQuery.isFetching && isAdmin,
    isError: profileQuery.isError,
    error: profileQuery.error,
    isAdmin,
  };
};

export default useUserRoles;
