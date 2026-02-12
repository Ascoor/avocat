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

export const sidebarGroups = [
  {
    key: "main",
    items: [
      { key: "dashboard", labelKey: "navigation.dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { key: "cases", labelKey: "navigation.cases", icon: Gavel, path: "/dashboard/legcases" },
      { key: "services", labelKey: "navigation.services", icon: Scale, path: "/dashboard/legcase-services" },
    ],
  },
  {
    key: "reports",
    items: [
      {
        key: "reports",
        labelKey: "navigation.reports",
        icon: Folder,
        children: [
          { key: "sessions", labelKey: "navigation.sessions", icon: Calendar, path: "/dashboard/reports/sessions" },
          { key: "procedures", labelKey: "navigation.procedures", icon: FileText, path: "/dashboard/reports/procedures" },
          { key: "clients_reports", labelKey: "navigation.clients", icon: Users, path: "/dashboard/reports/clients" },
          { key: "cases_reports", labelKey: "navigation.cases", icon: Gavel, path: "/dashboard/reports/cases" },
          { key: "services_reports", labelKey: "navigation.services", icon: Scale, path: "/dashboard/reports/services" },
        ],
      },
      {
        key: "customer_service",
        labelKey: "navigation.customerService",
        icon: Briefcase,
        children: [
          { key: "clients", labelKey: "navigation.clients", icon: Briefcase, path: "/dashboard/clients" },
          { key: "clients_no_agency", labelKey: "navigation.clientsNoAgency", icon: Users, path: "/dashboard/clients" },
          { key: "archive", labelKey: "navigation.archive", icon: Archive, path: "/dashboard/archive" },
          { key: "court_search", labelKey: "navigation.courtSearch", icon: Landmark, path: "/dashboard/court-search" },
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
          { key: "court_settings", labelKey: "navigation.courtSettings", icon: Landmark, path: "/dashboard/cases_setting" },
          { key: "lawyers", labelKey: "navigation.lawyers", icon: UserCog, path: "/dashboard/lawyers" },
          { key: "admin_users", labelKey: "navigation.adminUsers", icon: ShieldCheck, path: "/dashboard/admin/users" },
          { key: "admin_roles", labelKey: "navigation.adminRoles", icon: ShieldCheck, path: "/dashboard/admin/roles" },
          { key: "admin_permissions", labelKey: "navigation.adminPermissions", icon: ShieldCheck, path: "/dashboard/admin/permissions" },
        ],
      },
    ],
  },
  // {
  //   key: "tools",
  //   items: [
  //     {
  //       key: "icons_gallery",
  //       labelKey: "navigation.iconsGallery",
  //       icon: LayoutGrid,
  //       path: "/dashboard/tools/icons",
  //     },
  //     {
  //       key: "ui_qa",
  //       labelKey: "navigation.uiQa",
  //       icon: ShieldCheck,
  //       path: "/dashboard/tools/qa",
  //     },
  //     {
  //       key: "qa_rbac",
  //       labelKey: "navigation.qaRbac",
  //       icon: ShieldCheck,
  //       path: "/dashboard/tools/qa-rbac",
  //     },
  //   ],
  // },
];
