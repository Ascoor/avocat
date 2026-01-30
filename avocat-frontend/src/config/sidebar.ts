import type { IconKey } from "@/config/iconography";

export type SidebarGroupKey = "main" | "website" | "system";

export interface SidebarItem {
  key: string;
  iconKey: IconKey;
  path?: string;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  key: SidebarGroupKey;
  items: SidebarItem[];
}

export const sidebarGroups: SidebarGroup[] = [
  {
    key: "main",
    items: [
      { key: "dashboard", iconKey: "dashboard", path: "/dashboard" },
      { key: "cases", iconKey: "cases", path: "/dashboard/cases" },
      { key: "services", iconKey: "services", path: "/dashboard/services" },
      {
        key: "work_tracking",
        iconKey: "workTracking",
        children: [
          { key: "sessions", iconKey: "sessions", path: "/dashboard/sessions" },
          { key: "procedures", iconKey: "procedures", path: "/dashboard/procedures" },
        ],
      },
      {
        key: "customer_service",
        iconKey: "customerService",
        children: [
          { key: "clients", iconKey: "clients", path: "/dashboard/clients" },
          { key: "unClients", iconKey: "prospects", path: "/dashboard/unClients" },
        ],
      },
      { key: "archive", iconKey: "archive", path: "/dashboard/archive" },
      { key: "courts_search", iconKey: "courtsSearch", path: "/dashboard/courts_search" },
    ],
  },
  {
    key: "website",
    items: [
      { key: "website_pages", iconKey: "knowledge", path: "/dashboard/website/pages" },
      { key: "website_team", iconKey: "lawyers", path: "/dashboard/website/team" },
      {
        key: "website_achievements",
        iconKey: "reports",
        path: "/dashboard/website/achievements",
      },
      { key: "website_settings", iconKey: "settings", path: "/dashboard/website/settings" },
    ],
  },
  {
    key: "system",
    items: [
      {
        key: "settings",
        iconKey: "settings",
        children: [
          { key: "office_settings", iconKey: "officeSettings", path: "/dashboard/office_settings" },
          { key: "courts_settings", iconKey: "courtsSettings", path: "/dashboard/courts_settings" },
          { key: "lawyers", iconKey: "lawyers", path: "/dashboard/lawyers" },
          { key: "users_roles", iconKey: "usersRoles", path: "/dashboard/users_roles" },
        ],
      },
    ],
  },
];

export const translateKey = (key: string, lang: string) => {
  const labels: Record<string, { ar: string; en: string }> = {
    dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
    cases: { ar: "القضايا", en: "Cases" },
    lawyers: { ar: "المحامون", en: "Lawyers" },
    customer_service: { ar: "خدمة العملاء", en: "Customer Service" },
    clients: { ar: "الوكلاء", en: "Clients" },
    unClients: { ar: "العملاء بدون وكالة", en: "Prospects" },
    services: { ar: "الخدمات", en: "Services" },
    work_tracking: { ar: "متابعة العمل", en: "Work Tracking" },
    sessions: { ar: "الجلسات", en: "Sessions" },
    procedures: { ar: "الإجراءات", en: "Procedures" },
    settings: { ar: "الإعدادات", en: "Settings" },
    courts_settings: { ar: "المحاكم", en: "Courts" },
    office_settings: { ar: "إعدادات المكتب", en: "Office Settings" },
    users_roles: { ar: "الأدوار والصلاحيات", en: "Users & Roles" },
    archive: { ar: "الأرشيف", en: "Archive" },
    courts_search: { ar: "البحث القضائي", en: "Courts Search" },
    website_pages: { ar: "صفحات الموقع", en: "Website Pages" },
    website_team: { ar: "فريق العمل", en: "Team" },
    website_achievements: { ar: "الإنجازات", en: "Achievements" },
    website_settings: { ar: "إعدادات الموقع", en: "Website Settings" },
  };

  return labels[key]?.[lang] || key;
};
