import type { ComponentType, SVGProps } from "react";
import {
  Archive,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  CalendarClock,
  Database,
  FileText,
  Scale,
  Search,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";

import {
  CourthouseIcon,
  GavelIcon,
  LegalDocumentIcon,
  ShieldIcon,
} from "@/icons/legal/LegalIcons";

export type IconKey =
  | "dashboard"
  | "cases"
  | "legalProcedures"
  | "services"
  | "workTracking"
  | "sessions"
  | "procedures"
  | "customerService"
  | "clients"
  | "prospects"
  | "lawyers"
  | "reports"
  | "documents"
  | "archive"
  | "courtsSearch"
  | "settings"
  | "officeSettings"
  | "courtsSettings"
  | "usersRoles"
  | "database"
  | "notifications"
  | "knowledge"
  | "chart"
  | "default";

export interface IconDesign {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badgeGradient: string;
  shadow: string;
  badgeClass?: string;
}

const DEFAULT_BADGE_CLASS = "text-white";

const createDesign = (
  icon: ComponentType<SVGProps<SVGSVGElement>>,
  badgeGradient: string,
  shadow: string,
  badgeClass: string = DEFAULT_BADGE_CLASS,
): IconDesign => ({
  icon,
  badgeGradient,
  shadow,
  badgeClass,
});

const ICON_DESIGNS: Record<IconKey, IconDesign> = {
  default: createDesign(
    CourthouseIcon,
    "linear-gradient(145deg, #5B8BFF 0%, #3A61F8 100%)",
    "0 16px 32px rgba(58, 97, 248, 0.35)",
  ),
  dashboard: createDesign(
    CourthouseIcon,
    "linear-gradient(145deg, #5B8BFF 0%, #3A61F8 100%)",
    "0 16px 32px rgba(58, 97, 248, 0.35)",
  ),
  cases: createDesign(
    GavelIcon,
    "linear-gradient(145deg, #FFB37A 0%, #FF7B4D 100%)",
    "0 16px 32px rgba(255, 123, 77, 0.35)",
  ),
  legalProcedures: createDesign(
    FileText,
    "linear-gradient(145deg, #C7A4FF 0%, #8F6BFF 100%)",
    "0 14px 30px rgba(143, 107, 255, 0.32)",
  ),
  services: createDesign(
    LegalDocumentIcon,
    "linear-gradient(145deg, #6EE7B7 0%, #28B487 100%)",
    "0 14px 30px rgba(40, 180, 135, 0.32)",
  ),
  workTracking: createDesign(
    Briefcase,
    "linear-gradient(145deg, #7DE2FF 0%, #3087FF 100%)",
    "0 14px 30px rgba(48, 135, 255, 0.35)",
  ),
  sessions: createDesign(
    CalendarClock,
    "linear-gradient(145deg, #74C4FF 0%, #4D6CFF 100%)",
    "0 14px 30px rgba(77, 108, 255, 0.35)",
  ),
  procedures: createDesign(
    FileText,
    "linear-gradient(145deg, #BFA7FF 0%, #7C5BFF 100%)",
    "0 14px 30px rgba(124, 91, 255, 0.32)",
  ),
  customerService: createDesign(
    Users,
    "linear-gradient(145deg, #FF9A9E 0%, #FECFEF 100%)",
    "0 14px 30px rgba(255, 154, 158, 0.32)",
  ),
  clients: createDesign(
    UserCheck,
    "linear-gradient(145deg, #7DFCCB 0%, #27B28A 100%)",
    "0 14px 30px rgba(39, 178, 138, 0.32)",
  ),
  prospects: createDesign(
    UserX,
    "linear-gradient(145deg, #FFAEA5 0%, #FF6F91 100%)",
    "0 14px 30px rgba(255, 111, 145, 0.32)",
  ),
  lawyers: createDesign(
    Scale,
    "linear-gradient(145deg, #9AA7FF 0%, #5F6FFF 100%)",
    "0 14px 30px rgba(95, 111, 255, 0.32)",
  ),
  reports: createDesign(
    BarChart3,
    "linear-gradient(145deg, #FFD282 0%, #FF8A5B 100%)",
    "0 14px 30px rgba(255, 138, 91, 0.32)",
  ),
  documents: createDesign(
    LegalDocumentIcon,
    "linear-gradient(145deg, #C1C7FF 0%, #866BFF 100%)",
    "0 14px 30px rgba(134, 107, 255, 0.32)",
  ),
  archive: createDesign(
    Archive,
    "linear-gradient(145deg, #D5DFEA 0%, #9BA8BF 100%)",
    "0 14px 30px rgba(155, 168, 191, 0.3)",
    "text-slate-700",
  ),
  courtsSearch: createDesign(
    Search,
    "linear-gradient(145deg, #B49CFF 0%, #6C5BFF 100%)",
    "0 14px 30px rgba(108, 91, 255, 0.32)",
  ),
  settings: createDesign(
    ShieldIcon,
    "linear-gradient(145deg, #A3B0FF 0%, #6E7AFF 100%)",
    "0 14px 30px rgba(110, 122, 255, 0.32)",
  ),
  officeSettings: createDesign(
    CourthouseIcon,
    "linear-gradient(145deg, #6FD1FF 0%, #2B74FF 100%)",
    "0 14px 30px rgba(43, 116, 255, 0.32)",
  ),
  courtsSettings: createDesign(
    GavelIcon,
    "linear-gradient(145deg, #6FE7B7 0%, #24B9B6 100%)",
    "0 14px 30px rgba(36, 185, 182, 0.3)",
  ),
  usersRoles: createDesign(
    ShieldIcon,
    "linear-gradient(145deg, #FF9CEB 0%, #FF5F9E 100%)",
    "0 14px 30px rgba(255, 95, 158, 0.32)",
  ),
  database: createDesign(
    Database,
    "linear-gradient(145deg, #79DFFF 0%, #3D9EFF 100%)",
    "0 14px 30px rgba(61, 158, 255, 0.32)",
  ),
  notifications: createDesign(
    Bell,
    "linear-gradient(145deg, #FFE29D 0%, #FF9F4D 100%)",
    "0 14px 30px rgba(255, 159, 77, 0.32)",
    "text-amber-900",
  ),
  knowledge: createDesign(
    BookOpen,
    "linear-gradient(145deg, #9EFFDA 0%, #5BC8F7 100%)",
    "0 14px 30px rgba(91, 200, 247, 0.32)",
  ),
  chart: createDesign(
    BarChart3,
    "linear-gradient(145deg, #8FA9FF 0%, #4A6BFF 100%)",
    "0 14px 30px rgba(74, 107, 255, 0.32)",
  ),
};

export const getIconDesign = (key?: IconKey): IconDesign => {
  if (!key) {
    return ICON_DESIGNS.default;
  }
  return ICON_DESIGNS[key] ?? ICON_DESIGNS.default;
};
