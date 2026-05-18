import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  FolderOpen,
  Search,
  Plus,
  Eye,
  Download,
  Landmark,
  Stamp,
} from "lucide-react";
import SectionHeader from "@shared/components/common/SectionHeader";
import AddActionButton from "@shared/components/common/AddActionButton";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { useSecurity } from "@shared/security/SecurityContext";
import { permissionMap } from "@shared/security/permission-map";
import { hasPermission } from "@shared/security/permissions";
import { cn } from "@shared/lib/utils";
import PowerOfAttorneyPage from "@features/power-of-attorneys/pages/PowerOfAttorneyPage";
import SearchCourt from "@features/reports/components/Reports/SearchCourt";

const MOCK_DOCUMENTS = [
  {
    id: 1,
    name: "عقد توكيل - أحمد محمد",
    type: "power_of_attorney",
    size: "2.4 MB",
    date: "2025-12-01",
    classification: "confidential",
  },
  {
    id: 2,
    name: "حكم محكمة الاستئناف",
    type: "leg_case",
    size: "1.8 MB",
    date: "2025-11-28",
    classification: "internal",
  },
  {
    id: 3,
    name: "مذكرة دفاع - قضية 2024/345",
    type: "leg_case",
    size: "540 KB",
    date: "2025-11-15",
    classification: "client-ready",
  },
  {
    id: 4,
    name: "ملف خدمة استشارية",
    type: "service",
    size: "320 KB",
    date: "2025-10-20",
    classification: "internal",
  },
  {
    id: 5,
    name: "تقرير خبير هندسي",
    type: "general",
    size: "4.1 MB",
    date: "2025-10-10",
    classification: "internal",
  },
  {
    id: 6,
    name: "بيانات تعريف عميل",
    type: "client",
    size: "1.2 MB",
    date: "2025-09-05",
    classification: "confidential",
  },
];

const DOC_TYPES = ["all", "power_of_attorney", "leg_case", "service", "client", "general"];

const classificationColors = {
  confidential: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  internal: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "client-ready": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const InternalDocumentsPanel = ({
  search,
  setSearch,
  category,
  setCategory,
  filtered,
  t,
  isRTL,
}) => (
  <>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:w-80">
        <Search
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
            isRTL ? "right-3" : "left-3",
          )}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("documents.searchPlaceholder")}
          className={cn(
            "w-full rounded-xl border border-border bg-[hsl(var(--background)/0.55)] py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]",
            isRTL ? "pr-10 pl-3 text-right" : "pl-10 pr-3 text-left",
          )}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {DOC_TYPES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "chip-soft transition-all",
              category === cat &&
                "bg-[hsl(var(--accent)/0.2)] border-[hsl(var(--accent)/0.4)] text-foreground font-semibold",
            )}
          >
            {t(`documents.categories.${cat}`)}
          </button>
        ))}
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-2xl border-2 border-dashed border-border bg-[hsl(var(--card)/0.5)] p-6 text-center backdrop-blur sm:p-8"
    >
      <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{t("documents.upload.dropzone")}</p>
      <button type="button" className="action-btn-outline mt-3 text-sm">
        <Plus className="h-4 w-4" />
        {t("documents.upload.action")}
      </button>
    </motion.div>

    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.04 }}
            className="card-premium group cursor-pointer p-4"
          >
            <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse")}>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border/60 bg-[hsl(var(--background)/0.55)]">
                <FolderOpen className="h-5 w-5 text-[hsl(var(--accent))]" />
              </div>
              <div className={cn("min-w-0 flex-1", isRTL ? "text-right" : "text-left")}>
                <p className="truncate text-sm font-semibold text-foreground">{doc.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                      classificationColors[doc.classification],
                    )}
                  >
                    {t(`documents.classification.${doc.classification}`)}
                  </span>
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  className="rounded-lg p-1.5 transition hover:bg-muted"
                  title={t("documents.view")}
                >
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  className="rounded-lg p-1.5 transition hover:bg-muted"
                  title={t("documents.download")}
                >
                  <Download className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>

    {filtered.length === 0 && (
      <div className="mt-8 text-center text-sm text-muted-foreground">{t("documents.empty")}</div>
    )}
  </>
);

const DocumentsHubPage = () => {
  const { t, isRTL } = useLanguage();
  const { permissions } = useSecurity();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const canInternal = hasPermission(permissions, permissionMap.reports.view);
  const canPoa = hasPermission(permissions, permissionMap.legalCases.list);
  const canCourt = hasPermission(permissions, permissionMap.reports.view);

  const tabs = useMemo(() => {
    const list = [];
    if (canInternal) {
      list.push({ key: "internal", label: t("documents.tabs.internal"), icon: FileText });
    }
    if (canPoa) {
      list.push({ key: "power_of_attorney", label: t("navigation.powerOfAttorney"), icon: Stamp });
    }
    if (canCourt) {
      list.push({
        key: "court_inquiry",
        label: t("documents.tabs.courtInquiry"),
        icon: Landmark,
      });
    }
    return list;
  }, [t, canInternal, canPoa, canCourt]);

  const allowedKeys = useMemo(() => tabs.map((tab) => tab.key), [tabs]);

  const tabFromUrl = searchParams.get("tab");
  const activeTab = useMemo(() => {
    if (!allowedKeys.length) return null;
    return allowedKeys.includes(tabFromUrl) ? tabFromUrl : allowedKeys[0];
  }, [allowedKeys, tabFromUrl]);

  useEffect(() => {
    if (!allowedKeys.length) return;
    if (!allowedKeys.includes(tabFromUrl)) {
      setSearchParams({ tab: allowedKeys[0] }, { replace: true });
    }
  }, [allowedKeys, tabFromUrl, setSearchParams]);

  const filtered = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || doc.type === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const headerSubtitle =
    activeTab && allowedKeys.length ? t(`documents.tabSubtitles.${activeTab}`) : t("documents.subtitle");

  if (!allowedKeys.length) {
    return null;
  }

  return (
    <div className="mt-12 w-full p-4 sm:p-6">
      <SectionHeader
        sectionKey="documents"
        title={t("documents.title")}
        subtitle={headerSubtitle}
        icon={<FileText className="h-6 w-6 text-[hsl(var(--accent))]" />}
        showBack={false}
        primaryAction={
          activeTab === "internal" ? (
            <AddActionButton icon={Upload} label={t("documents.upload.action")} />
          ) : null
        }
      />

      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)] p-2 shadow-sm backdrop-blur">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSearchParams({ tab: tab.key }, { replace: true })}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition sm:px-4",
                activeTab === tab.key
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  : "border-border/70 bg-background text-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {activeTab === "internal" && (
          <InternalDocumentsPanel
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            filtered={filtered}
            t={t}
            isRTL={isRTL}
          />
        )}
        {activeTab === "power_of_attorney" && (
          <div className="rounded-2xl border border-border/60 bg-card/40 p-1 sm:p-2">
            <PowerOfAttorneyPage embedded />
          </div>
        )}
        {activeTab === "court_inquiry" && (
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/30">
            <SearchCourt />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsHubPage;
