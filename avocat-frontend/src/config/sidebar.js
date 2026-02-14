import {
  Archive,
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Gavel,
  LayoutDashboard,
  Landmark,
  Scale,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  Folder,
} from "lucide-react";
import { permissionMap } from "@shared/security/permission-map";

export const sidebarGroups = [
  {
    key: "main",
    items: [
      { key: "dashboard", labelKey: "navigation.dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { key: "cases", labelKey: "navigation.cases", icon: Gavel, path: "/dashboard/legcases", requiredPermission: permissionMap.legalCases.list },
      { key: "services", labelKey: "navigation.services", icon: Scale, path: "/dashboard/legcase-services", requiredPermission: permissionMap.services.list },
    ],
  },
  {
    key: "reports",
    items: [
      {
        key: "reports",
        labelKey: "navigation.reports",
        icon: Folder,
        requiredPermission: permissionMap.reports.view,
        children: [
          { key: "sessions", labelKey: "navigation.sessions", icon: Calendar, path: "/dashboard/reports/sessions", requiredPermission: permissionMap.sessions.list },
          { key: "procedures", labelKey: "navigation.procedures", icon: FileText, path: "/dashboard/reports/procedures", requiredPermission: permissionMap.procedures.list },
          { key: "clients_reports", labelKey: "navigation.clients", icon: Users, path: "/dashboard/reports/clients", requiredPermission: permissionMap.clients.list },
          { key: "cases_reports", labelKey: "navigation.cases", icon: Gavel, path: "/dashboard/reports/cases", requiredPermission: permissionMap.legalCases.list },
          { key: "services_reports", labelKey: "navigation.services", icon: Scale, path: "/dashboard/reports/services", requiredPermission: permissionMap.services.list },
        ],
      },
      {
        key: "customer_service",
        labelKey: "navigation.customerService",
        icon: Briefcase,
        children: [
          { key: "clients", labelKey: "navigation.clients", icon: Briefcase, path: "/dashboard/clients", requiredPermission: permissionMap.clients.list },
          { key: "clients_no_agency", labelKey: "navigation.clientsNoAgency", icon: Users, path: "/dashboard/clients", requiredPermission: permissionMap.clients.list },
          { key: "archive", labelKey: "navigation.archive", icon: Archive, path: "/dashboard/archive" },
          { key: "court_search", labelKey: "navigation.courtSearch", icon: Landmark, path: "/dashboard/court-search", requiredPermission: permissionMap.reports.view },
        ],
      },
    ],
  },
  {
    key: "system",
    items: [
      {
        key: "settings",
        labelKey: "navigation.settings",
        icon: Settings,
        children: [
          { key: "office_settings", labelKey: "navigation.officeSettings", icon: Building2, path: "/dashboard/office-settings" },
          { key: "court_settings", labelKey: "navigation.courtSettings", icon: Landmark, path: "/dashboard/cases_setting", requiredPermission: permissionMap.courts.list },
          { key: "lawyers", labelKey: "navigation.lawyers", icon: UserCog, path: "/dashboard/lawyers", requiredPermission: permissionMap.lawyers.list },
          { key: "admin_users", labelKey: "navigation.adminUsers", icon: ShieldCheck, path: "/dashboard/admin/users", requiredPermission: permissionMap.adminUsers.list },
          { key: "admin_roles", labelKey: "navigation.adminRoles", icon: ShieldCheck, path: "/dashboard/admin/roles", requiredPermission: permissionMap.adminRoles.list },
          { key: "admin_permissions", labelKey: "navigation.adminPermissions", icon: ShieldCheck, path: "/dashboard/admin/permissions", requiredPermission: permissionMap.adminPermissions.list },
        ],
      },
    ],
  },
];
