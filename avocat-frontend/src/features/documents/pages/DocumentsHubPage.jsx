import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, FolderOpen, Search, Plus, Eye, Download } from "lucide-react";
import SectionHeader from "@shared/components/common/SectionHeader";
import AddActionButton from "@shared/components/common/AddActionButton";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { cn } from "@shared/lib/utils";

const MOCK_DOCUMENTS = [
  { id: 1, name: "عقد توكيل - أحمد محمد", type: "contract", size: "2.4 MB", date: "2025-12-01", classification: "confidential" },
  { id: 2, name: "حكم محكمة الاستئناف", type: "ruling", size: "1.8 MB", date: "2025-11-28", classification: "internal" },
  { id: 3, name: "مذكرة دفاع - قضية 2024/345", type: "memo", size: "540 KB", date: "2025-11-15", classification: "client-ready" },
  { id: 4, name: "إفادة شاهد - محمود علي", type: "statement", size: "320 KB", date: "2025-10-20", classification: "confidential" },
  { id: 5, name: "تقرير خبير هندسي", type: "report", size: "4.1 MB", date: "2025-10-10", classification: "internal" },
  { id: 6, name: "صورة بطاقة الرقم القومي", type: "identity", size: "1.2 MB", date: "2025-09-05", classification: "confidential" },
];

const CATEGORIES = ["all", "contract", "ruling", "memo", "statement", "report", "identity"];

const classificationColors = {
  confidential: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  internal: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "client-ready": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const DocumentsHubPage = () => {
  const { t, isRTL } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || doc.type === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <div className="p-6 mt-12 w-full">
      <SectionHeader
        sectionKey="documents"
        title={t("documents.title")}
        subtitle={t("documents.subtitle")}
        icon={<FileText className="h-6 w-6 text-[hsl(var(--accent))]" />}
        showBack={false}
        primaryAction={<AddActionButton icon={Upload} label={t("documents.upload.action")} />}
      />

      {/* Toolbar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("documents.searchPlaceholder")} // Ensure this returns a string
            className={cn(
              "w-full rounded-xl border border-border bg-[hsl(var(--background)/0.55)] py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]",
              isRTL ? "pr-10 pl-3 text-right" : "pl-10 pr-3 text-left"
            )}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "chip-soft transition-all",
                category === cat && "bg-[hsl(var(--accent)/0.2)] border-[hsl(var(--accent)/0.4)] text-foreground font-semibold"
              )}
            >
              {t(`documents.categories.${cat}`)} {/* Ensure this returns a string */}
            </button>
          ))}
        </div>
      </div>

      {/* Upload zone */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl border-2 border-dashed border-border bg-[hsl(var(--card)/0.5)] p-8 text-center backdrop-blur"
      >
        <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">{t("documents.upload.dropzone")}</p>
        <button className="mt-3 action-btn-outline text-sm">
          <Plus className="h-4 w-4" />
          {t("documents.upload.action")}
        </button>
      </motion.div>

      {/* Documents grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04 }}
              className="card-premium p-4 group cursor-pointer"
            >
              <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse")}>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border/60 bg-[hsl(var(--background)/0.55)]">
                  <FolderOpen className="h-5 w-5 text-[hsl(var(--accent))]" />
                </div>
                <div className={cn("flex-1 min-w-0", isRTL ? "text-right" : "text-left")}>
                  <p className="text-sm font-semibold text-foreground truncate">{doc.name}</p>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", classificationColors[doc.classification])}>
                      {t(`documents.classification.${doc.classification}`)}
                    </span>
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                    <span className="text-xs text-muted-foreground">{doc.date}</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-muted transition" title={t("documents.view")}>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-muted transition" title={t("documents.download")}>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {t("documents.empty")} {/* Ensure this returns a string */}
        </div>
      )}
    </div>
  );
};

export default DocumentsHubPage;
