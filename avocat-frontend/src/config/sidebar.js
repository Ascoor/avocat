import {
  Archive,
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Headphones,
  LayoutDashboard,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  UserCog,
  UserX,
  Users,
  Folder,
} from "lucide-react";

export const sidebarGroups = [
  {
    key: "main",
    items: [
      { key: "dashboard", labelKey: "navigation.dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { key: "cases", labelKey: "navigation.cases", icon: Briefcase, path: "/dashboard/legcases" },
      { key: "services", labelKey: "navigation.services", icon: Scale, path: "/dashboard/legcase-services" },
    ],
  },
  {
    key: "services",
    items: [
      {
        key: "work_follow",
        labelKey: "navigation.workFollowUp",
        icon: Folder,
        children: [
          { key: "sessions", labelKey: "navigation.sessions", icon: Calendar, path: "/dashboard/legal-sessions" },
          { key: "procedures", labelKey: "navigation.procedures", icon: FileText, path: "/dashboard/managment-settings/procedures" },
        ],
      },
      {
        key: "customer_service",
        labelKey: "navigation.customerService",
        icon: Headphones,
        children: [
          { key: "clients", labelKey: "navigation.clients", icon: Users, path: "/dashboard/clients" },
          { key: "clients_no_agency", labelKey: "navigation.clientsNoAgency", icon: UserX, path: "/dashboard/clients" },
          { key: "archive", labelKey: "navigation.archive", icon: Archive, path: "/dashboard/archive" },
          { key: "court_search", labelKey: "navigation.courtSearch", icon: Search, path: "/dashboard/court-search" },
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
          { key: "court_settings", labelKey: "navigation.courtSettings", icon: Scale, path: "/dashboard/cases_setting" },
          { key: "lawyers", labelKey: "navigation.lawyers", icon: UserCog, path: "/dashboard/lawyers" },
          { key: "users_permissions", labelKey: "navigation.usersPermissions", icon: ShieldCheck, path: "/dashboard/users-permissions" },
        ],
      },
    ],
  },
];
