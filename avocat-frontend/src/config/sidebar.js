import {
  Archive,
  Briefcase,
  Building2,
  Files,
  Folder,
  Gavel,
  Landmark,
  LayoutDashboard,
  Wallet,
  Scale,
  Settings,
  ShieldCheck,
  Stamp,
  UserCog,
} from "lucide-react";
import { permissionMap } from "@shared/security/permission-map";

export const sidebarGroups = [
  {
    key: "main",
    items: [
      {
        key: "dashboard",
        labelKey: "navigation.dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        requiredPermission: permissionMap.dashboard.view,
      },
      {
        key: "cases",
        labelKey: "navigation.cases",
        icon: Gavel,
        path: "/dashboard/legcases",
        requiredPermission: permissionMap.legalCases.list,
      },
      {
        key: "services",
        labelKey: "navigation.services",
        icon: Scale,
        path: "/dashboard/legcase-services",
        requiredPermission: permissionMap.services.list,
      },
      {
        key: "power_of_attorneys",
        labelKey: "navigation.powerOfAttorneys",
        icon: Stamp,
        path: "/dashboard/power-of-attorneys",
        requiredPermission: permissionMap.legalCases.list,
      },
      {
        key: "customer_service",
        labelKey: "navigation.customerService",
        icon: Briefcase,
        path: "/dashboard/customer-service",
        requiredPermission: permissionMap.clients.list,
      },

      {
        key: "documents",
        labelKey: "navigation.documents",
        icon: Files,
        path: "/dashboard/documents",
        requiredPermission: permissionMap.reports.view,
      },
      {
        key: "finance",
        labelKey: "navigation.finance",
        icon: Wallet,
        path: "/dashboard/finance/ledger",
        requiredPermission: permissionMap.expenses.view,
      },
    ],
  },
  {
    key: "reports",
    items: [
      {
        key: "reports",
        labelKey: "navigation.reports",
        icon: Folder,
        path: "/dashboard/reports",
        requiredPermission: permissionMap.reports.view,
      },
      {
        key: "follow_work",
        labelKey: "navigation.workFollowUp",
        icon: Folder,
        requiredPermission: permissionMap.followWork.view,
        children: [
          {
            key: "court_search",
            labelKey: "navigation.courtSearch",
            icon: Landmark,
            path: "/dashboard/court-search",
            requiredPermission: permissionMap.reports.view,
          },
          {
            key: "archive",
            labelKey: "navigation.archive",
            icon: Archive,
            path: "/dashboard/archive",
          },
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
        requiredPermission: permissionMap.settings.view,
        children: [
          {
            key: "office_settings",
            labelKey: "navigation.officeSettings",
            icon: Building2,
            path: "/dashboard/office-settings",
          },
          {
            key: "court_settings",
            labelKey: "navigation.courtSettings",
            icon: Landmark,
            path: "/dashboard/cases_setting",
            requiredPermission: permissionMap.courts.list,
          },
          {
            key: "lawyers",
            labelKey: "navigation.lawyers",
            icon: UserCog,
            path: "/dashboard/lawyers",
            requiredPermission: permissionMap.lawyers.list,
          },
          {
            key: "admin_access",
            labelKey: "navigation.usersPermissions",
            icon: ShieldCheck,
            path: "/dashboard/admin/access",
            requiredPermission: [
              permissionMap.adminUsers.list,
              permissionMap.adminRoles.list,
              permissionMap.adminPermissions.list,
            ],
          },
        ],
      },
    ],
  },
];
