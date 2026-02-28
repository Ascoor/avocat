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

const sameId = (left?: string | number | null, right?: string | number | null) => {
  if (left === undefined || left === null || right === undefined || right === null) return false;
  return String(left) === String(right);
};

const toIdSet = (arr?: Array<string | number>) => new Set((arr ?? []).map((item) => String(item)));

export const canAccessOffice = (user: AccessUser, officeId?: string | number | null) => {
  if ((user.roleNames ?? []).includes("super_admin")) return true;
  if (officeId === undefined || officeId === null) return true;
  if (user.officeId === undefined || user.officeId === null) return true;
  return sameId(user.officeId, officeId);
};

export const canAccessByOffice = (user: AccessUser, record: AccessRecord) => canAccessOffice(user, record.officeId);

export const canAccessCase = (user: AccessUser, record: AccessRecord) => {
  if (!canAccessOffice(user, record.officeId)) return false;

  const isLawyer = (user.roleNames ?? []).includes("lawyer");
  if (!isLawyer) return true;

  const currentLawyerId = user.lawyerId ? String(user.lawyerId) : null;
  const assignedLawyerId = record.assignedLawyerId ? String(record.assignedLawyerId) : null;
  if (currentLawyerId && assignedLawyerId && currentLawyerId === assignedLawyerId) return true;

  const userTeam = toIdSet(user.teamLawyerIds);
  const recordTeam = toIdSet(record.teamLawyerIds);
  if (userTeam.size && recordTeam.size && Array.from(userTeam).some((id) => recordTeam.has(id))) return true;

  return !assignedLawyerId;
};

export const canLawyerAccessCase = canAccessCase;

export const canAssistantMutateCaseStatus = (user: AccessUser, record: AccessRecord) => {
  const isAssistant = (user.roleNames ?? []).includes("assistant");
  if (!isAssistant) return true;
  if (!canAccessOffice(user, record.officeId)) return false;
  return record.status !== "closed";
};

export const canViewSensitiveClientFields = (user: AccessUser, record: AccessRecord) => {
  if (!record.isSensitive) return true;
  const hasSensitivePermission = hasPermission(user.permissions ?? [], permissionMap.clients.viewSensitive);
  return hasSensitivePermission && canAccessOffice(user, record.officeId);
};

export const maskSensitive = (value?: string | number | null, allowed = false, mask = "••••••") => {
  if (value === undefined || value === null || value === "") return "-";
  return allowed ? String(value) : mask;
};
