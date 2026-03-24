import {
  ArchiveIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CourthouseIcon,
  FolderIcon,
  GavelIcon,
  LegalDocumentIcon,
  ScaleIcon,
  ShieldIcon,
  StampSealIcon,
  UsersIcon,
  WalletIcon,
} from "@shared/icons/legal/LegalIcons";
import { permissionMap } from "@shared/security/permission-map";

export const sidebarGroups = [
  {
    key: "main",
    items: [
      {
        key: "dashboard",
        labelKey: "navigation.dashboard",
        icon: CourthouseIcon,
        path: "/dashboard",
        requiredPermission: permissionMap.dashboard.view,
      },
      {
        key: "cases",
        labelKey: "navigation.cases",
        icon: GavelIcon,
        path: "/dashboard/legcases",
        requiredPermission: permissionMap.legalCases.list,
      },
      {
        key: "services",
        labelKey: "navigation.services",
        icon: ScaleIcon,
        path: "/dashboard/legcase-services",
        requiredPermission: permissionMap.services.list,
      },
      {
        key: "customer_service",
        labelKey: "navigation.customerService",
        icon: BriefcaseIcon,
        path: "/dashboard/customer-service",
        requiredPermission: permissionMap.clients.list,
      },
      {
        key: "documents",
        labelKey: "navigation.documents",
        icon: LegalDocumentIcon,
        path: "/dashboard/documents",
        requiredPermission: permissionMap.reports.view,
      },
      {
        key: "power_of_attorney",
        labelKey: "navigation.powerOfAttorney",
        icon: StampSealIcon,
        path: "/dashboard/power-of-attorneys",
        requiredPermission: permissionMap.legalCases.list,
      },
      {
        key: "finance",
        labelKey: "navigation.finance",
        icon: WalletIcon,
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
        icon: FolderIcon,
        path: "/dashboard/reports",
        requiredPermission: permissionMap.reports.view,
        children: [
          {
            key: "sessions",
            labelKey: "navigation.sessions",
            icon: CalendarIcon,
            path: "/dashboard/reports/sessions",
            requiredPermission: permissionMap.sessions.list,
          },
          {
            key: "procedures",
            labelKey: "navigation.procedures",
            icon: LegalDocumentIcon,
            path: "/dashboard/reports/procedures",
            requiredPermission: permissionMap.procedures.list,
          },
          {
            key: "cases_reports",
            labelKey: "navigation.cases",
            icon: GavelIcon,
            path: "/dashboard/reports/cases",
            requiredPermission: permissionMap.legalCases.list,
          },
          {
            key: "services_reports",
            labelKey: "navigation.services",
            icon: ScaleIcon,
            path: "/dashboard/reports/services",
            requiredPermission: permissionMap.services.list,
          },
          {
            key: "clients_reports",
            labelKey: "navigation.clients",
            icon: UsersIcon,
            path: "/dashboard/reports/clients",
            requiredPermission: permissionMap.clients.list,
          },
        ],
      },
      {
        key: "follow_work",
        labelKey: "navigation.workFollowUp",
        icon: FolderIcon,
        requiredPermission: permissionMap.followWork.view,
        children: [
          {
            key: "court_search",
            labelKey: "navigation.courtSearch",
            icon: CourthouseIcon,
            path: "/dashboard/court-search",
            requiredPermission: permissionMap.reports.view,
          },
          {
            key: "archive",
            labelKey: "navigation.archive",
            icon: ArchiveIcon,
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
        icon: ShieldIcon,
        requiredPermission: permissionMap.settings.view,
        children: [
          {
            key: "office_settings",
            labelKey: "navigation.officeSettings",
            icon: BuildingOfficeIcon,
            path: "/dashboard/office-settings",
          },
          {
            key: "court_settings",
            labelKey: "navigation.courtSettings",
            icon: CourthouseIcon,
            path: "/dashboard/cases_setting",
            requiredPermission: permissionMap.courts.list,
          },
          {
            key: "lawyers",
            labelKey: "navigation.lawyers",
            icon: ScaleIcon,
            path: "/dashboard/lawyers",
            requiredPermission: permissionMap.lawyers.list,
          },
          {
            key: "admin_access",
            labelKey: "navigation.usersPermissions",
            icon: ShieldIcon,
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
