import { permissionMap } from "@shared/security/permission-map";
import { hasPermission } from "@shared/security/permissions";

export type AccessUser = {
  id: string;
  officeId?: string | number | null;
  roleNames?: string[];
  lawyerId?: string | number | null;
  teamLawyerIds?: Array<string | number>;
  permissions?: string[];
};

export type AccessRecord = {
  officeId?: string | number | null;
  assignedLawyerId?: string | number | null;
  teamLawyerIds?: Array<string | number>;
  isSensitive?: boolean;
  status?: string | null;
};

const same = (a?: string | number | null, b?: string | number | null) =>
  a !== undefined && a !== null && b !== undefined && b !== null && String(a) === String(b);

const asSet = (arr?: Array<string | number>) => new Set((arr ?? []).map((item) => String(item)));

export const canAccessByOffice = (user: AccessUser, record: AccessRecord) =>
  same(user.officeId, record.officeId) || (user.roleNames ?? []).includes("super_admin");

export const canLawyerAccessCase = (user: AccessUser, record: AccessRecord) => {
  if (!canAccessByOffice(user, record)) return false;

  const currentLawyerId = user.lawyerId ? String(user.lawyerId) : null;
  const assignedLawyerId = record.assignedLawyerId ? String(record.assignedLawyerId) : null;

  if (currentLawyerId && assignedLawyerId && currentLawyerId === assignedLawyerId) return true;

  const userTeam = asSet(user.teamLawyerIds);
  const recordTeam = asSet(record.teamLawyerIds);
  return Array.from(userTeam).some((id) => recordTeam.has(id));
};

export const canAssistantMutateCaseStatus = (user: AccessUser, record: AccessRecord) => {
  const isAssistant = (user.roleNames ?? []).includes("assistant");
  if (!isAssistant) return true;
  if (!canAccessByOffice(user, record)) return false;
  return record.status !== "closed";
};

export const canViewSensitiveClientFields = (user: AccessUser, record: AccessRecord) => {
  if (!record.isSensitive) return true;
  const hasSensitivePermission = hasPermission(user.permissions ?? [], permissionMap.clients.viewSensitive);
  return hasSensitivePermission && canAccessByOffice(user, record);
};

export const maskSensitive = (value: string, allowed: boolean, mask = "••••••") => (allowed ? value : mask);
