import { Briefcase, FileText, Scale, Users } from "lucide-react";

export const pageChromeConfig = {
  customerService: {
    title: "خدمة العملاء",
    subtitle: "إدارة العملاء والعملاء بدون وكالة من رأس موحد.",
    icon: Users,
    primaryActionLabel: "إضافة عميل",
  },
  lawyers: {
    title: "المحامون",
    subtitle: "إدارة بيانات فريق المحامين والإجراءات المرتبطة.",
    icon: Briefcase,
    primaryActionLabel: "إضافة محامي",
  },
  documents: {
    title: "مركز المستندات",
    subtitle: "الوصول السريع للبحث والرفع وإدارة تصنيفات الملفات.",
    icon: FileText,
    primaryActionLabel: "رفع مستند",
  },
  legalCases: {
    title: "القضايا",
    subtitle: "متابعة القضايا والجلسات والإجراءات من تجربة موحدة.",
    icon: Scale,
    primaryActionLabel: "إضافة قضية",
  },
};

export const resolvePageChrome = (sectionKey) => {
  if (!sectionKey) return null;
  return pageChromeConfig[sectionKey] ?? null;
};
