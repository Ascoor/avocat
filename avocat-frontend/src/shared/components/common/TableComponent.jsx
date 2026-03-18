import React, { useEffect, useMemo, useState, useCallback } from "react";
import { LexicraftIcon } from "@shared/icons/lexicraft";
import AddActionButton from "@shared/components/common/AddActionButton";
import { Button } from "@shared/ui/button";

/**
 * Header:
 * {
 *   key: string,
 *   text: string,
 *   searchable?: boolean (default true),
 *   sortable?: boolean (default true),
 *   getValue?: (row) => any,
 *   sortValue?: (row) => any,
 *   searchValue?: (row) => any,
 *   tdClassName?: string,
 *   thClassName?: string,
 *   mobileLabel?: string,
 *   align?: "start" | "center" | "end" // optional per-column alignment override
 * }
 */

const normalize = (v) => {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") {
    try {
      return normalize(JSON.stringify(v));
    } catch {
      return "";
    }
  }
  return String(v)
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "") // tashkeel + tatweel
    .replace(/[إأآٱ]/g, "ا")
    .replace(/[ى]/g, "ي")
    .replace(/[ة]/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
};

const defaultGetValue = (row, header) => {
  if (!row || !header) return "";
  if (typeof header.getValue === "function") return header.getValue(row);
  return row?.[header.key];
};

const defaultSearchValue = (row, header) => {
  if (!row || !header) return "";
  if (typeof header.searchValue === "function") return header.searchValue(row);
  return defaultGetValue(row, header);
};

const defaultSortValue = (row, header) => {
  if (!row || !header) return "";
  if (typeof header.sortValue === "function") return header.sortValue(row);
  return defaultGetValue(row, header);
};

const toComparable = (v) => {
  if (v === null || v === undefined) return "";
  const s = String(v).trim();
  const n = Number(s.replace(/,/g, ""));
  if (s !== "" && !Number.isNaN(n)) return n;
  return s;
};

const collator = new Intl.Collator("ar", { numeric: true, sensitivity: "base" });

const compareValues = (a, b) => {
  const av = toComparable(a);
  const bv = toComparable(b);
  if (typeof av === "number" && typeof bv === "number") return av - bv;
  return collator.compare(String(av), String(bv));
};

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

/** small helper for micro-animations (no extra libs) */
const cx = (...parts) => parts.filter(Boolean).join(" ");

function EmptyState({ label }) {
  return (
    <div className="table-shell rounded-2xl p-6 text-sm text-muted-foreground">
      {label}
    </div>
  );
}

function ErrorState({ label, onRetry, retryLabel, isRTL }) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
      <div className="space-y-3 text-center">
        <div className="font-semibold">{label}</div>
        {onRetry && (
          <Button
            type="button"
            variant="dangerOutline"
            size="sm"
            onClick={onRetry}
            className="pressable rounded-full"
          >
            <LexicraftIcon
              name="arrow-forward"
              size={14}
              isDirectional
              dir={isRTL ? "rtl" : "ltr"}
            />
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

function LoadingRows({ colSpan, rows = 6 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={`sk-${idx}`} className="border-b border-border/40">
          <td colSpan={colSpan} className="p-3">
            <div className="h-10 w-full rounded-xl skeleton-shimmer" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function Pagination({
  isRTL,
  currentPage,
  totalPages,
  onPrev,
  onNext,
  pageLabel,
  prevLabel,
  nextLabel,
}) {
  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={onPrev}
        disabled={currentPage <= 1}
        className="rounded-full px-4"
      >
        {prevLabel}
      </Button>

      <span className="text-sm text-muted-foreground">
        {pageLabel} {currentPage} / {totalPages}
      </span>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="rounded-full px-4"
      >
        {nextLabel}
      </Button>
    </div>
  );
}

export default function TableComponent({
  data = [],
  headers = [],
  customRenderers = {},

  onView,
  onEdit,
  onDelete,
  onRowAction,
  actionColumns = [],
  actionsMode = "multiColumn",

  // add
  onAdd,
  addLabel = "إضافة جديدة",
  renderAddButton,

  // search/pagination
  itemsPerPage = 10,
  searchPlaceholder = "ابحث...",
  emptyLabel = "لا يوجد بيانات",
  loadingLabel = "جارٍ التحميل...",
  errorLabel = "تعذر تحميل البيانات.",
  retryLabel = "إعادة المحاولة",
  loading = false,
  error,
  onRetry,

  // row identity
  rowKey = "id",
  getRowId,

  // layout
  title,

  // qa
  qaMode = false,

  permissions,

  // Direction
  isRTL = true,

  // Labels (optional i18n overrides)
  viewLabel = "عرض",
  editLabel = "تعديل",
  deleteLabel = "حذف",
  prevLabel = "سابق",
  nextLabel = "التالي",
  pageLabel = "الصفحة",
}) {
  const dir = isRTL ? "rtl" : "ltr";
  const thAlign = isRTL ? "text-right" : "text-left";
  const tdAlign = isRTL ? "text-right" : "text-left";
  const cellJustify = isRTL ? "justify-end" : "justify-start";

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const canView = permissions?.view !== false;
  const canCreate = permissions?.create !== false;
  const canUpdate = permissions?.update !== false;
  const canDelete = permissions?.delete !== false;

  const legacyActions = useMemo(
    () => [
      {
        key: "view",
        header: viewLabel,
        icon: "view",
        isVisible: () => canView && typeof onView === "function",
        onClick: (row, id) => {
          onView(id);
          onRowAction?.("view", id, row);
        },
      },
      {
        key: "edit",
        header: editLabel,
        icon: "edit",
        isVisible: () => canUpdate && typeof onEdit === "function",
        onClick: (row, id) => {
          onEdit(id);
          onRowAction?.("edit", id, row);
        },
      },
      {
        key: "delete",
        header: deleteLabel,
        icon: "trash",
        danger: true,
        isVisible: () => canDelete && typeof onDelete === "function",
        onClick: (row, id) => {
          onDelete(id, row);
          onRowAction?.("delete", id, row);
        },
      },
    ],
    [canDelete, canUpdate, canView, deleteLabel, editLabel, onDelete, onEdit, onRowAction, onView, viewLabel]
  );

  const effectiveActionColumns = useMemo(() => {
    if (Array.isArray(actionColumns) && actionColumns.length > 0) return actionColumns;
    return legacyActions;
  }, [actionColumns, legacyActions]);

  const visibleActionColumns = useMemo(
    () =>
      effectiveActionColumns.filter((action) => {
        if (!action?.key || typeof action?.onClick !== "function") return false;
        if (typeof action.isVisible !== "function") return true;
        if (!data.length) return Boolean(action.isVisible(undefined));
        return data.some((row) => action.isVisible(row));
      }),
    [data, effectiveActionColumns]
  );

  const showActionColumns = actionsMode !== "singleColumn";
  const showGroupedActions = !showActionColumns && visibleActionColumns.length > 0;

  const searchableHeaders = useMemo(
    () => headers.filter((h) => h?.key && h.searchable !== false && h.key !== "actions"),
    [headers]
  );

  useEffect(() => setCurrentPage(1), [searchQuery, sortKey, sortDirection]);

  const filteredData = useMemo(() => {
    const q = normalize(searchQuery);
    if (!q) return data;

    const keywords = q.split(" ").filter(Boolean);

    return data.filter((row) =>
      keywords.every((kw) =>
        searchableHeaders.some((header) =>
          normalize(defaultSearchValue(row, header)).includes(kw)
        )
      )
    );
  }, [data, searchQuery, searchableHeaders]);

  const handleSort = useCallback(
    (key) => {
      const header = headers.find((h) => h.key === key);
      if (!header || header.sortable === false) return;

      if (sortKey === key) setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
      else {
        setSortKey(key);
        setSortDirection("asc");
      }
    },
    [headers, sortKey]
  );

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const header = headers.find((h) => h.key === sortKey);
    if (!header || header.sortable === false) return filteredData;

    const dirMul = sortDirection === "asc" ? 1 : -1;

    return filteredData
      .map((row, idx) => ({ row, idx }))
      .sort((a, b) => {
        const aVal = defaultSortValue(a.row, header);
        const bVal = defaultSortValue(b.row, header);
        const cmp = compareValues(aVal, bVal);
        if (cmp !== 0) return cmp * dirMul;
        return a.idx - b.idx;
      })
      .map((x) => x.row);
  }, [filteredData, headers, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const safePage = clamp(currentPage, 1, totalPages);

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, safePage, itemsPerPage]);

  const resolveIdMeta = (row, index) => {
    const rawId = typeof getRowId === "function" ? getRowId(row) : row?.[rowKey];
    return { id: rawId ?? index, isMissing: rawId === null || rawId === undefined };
  };

  const renderAdd = () => {
    if (typeof renderAddButton === "function") return renderAddButton();
    if (!onAdd || !canCreate) return null;

    return <AddActionButton onClick={onAdd} label={addLabel} />;
  };

  const ActionBtn = ({ onClick, title: tt, children, tone = "neutral", disabled = false }) => {
    const variant =
      tone === "danger" ? "dangerOutline" : tone === "primary" ? "outline" : "ghost";

    return (
      <Button
        type="button"
        size="icon-sm"
        variant={variant}
        onClick={onClick}
        title={tt}
        disabled={disabled}
        className={cx(
          "rounded-xl border-[hsl(var(--border)/0.78)] bg-[hsl(var(--surface-raised)/0.7)]",
          tone === "primary" ? "text-primary hover:border-[hsl(var(--accent)/0.3)]" : "",
          tone === "danger" ? "text-destructive" : "",
          disabled ? "cursor-not-allowed" : ""
        )}
      >
        {children}
      </Button>
    );
  };

  const colSpan = headers.length + (showActionColumns ? visibleActionColumns.length : Number(showGroupedActions));
  const showEmptyState = !loading && !error && filteredData.length === 0;

  // Actions columns order: LTR -> actions first, RTL -> actions last (so they appear on the right)
  const renderHeadActions = (pos) => {
    if (!showActionColumns || visibleActionColumns.length === 0) return null;
    if (pos === "start") {
      if (isRTL) return null;
      return (
        <>
          {visibleActionColumns.map((action) => (
            <th
              key={`head-${action.key}`}
              className="px-3 py-3 text-center text-xs font-bold text-foreground"
              style={{ width: action.width }}
            >
              {action.header || action.key}
            </th>
          ))}
        </>
      );
    }

    // end
    if (!isRTL) return null;
    return (
      <>
        {visibleActionColumns.map((action) => (
          <th
            key={`head-${action.key}`}
            className="px-3 py-3 text-center text-xs font-bold text-foreground"
            style={{ width: action.width }}
          >
            {action.header || action.key}
          </th>
        ))}
      </>
    );
  };

  const renderRowActions = (pos, id, row) => {
    if (!showActionColumns || visibleActionColumns.length === 0) return null;
    const rowActions = visibleActionColumns.filter((action) =>
      typeof action.isVisible === "function" ? Boolean(action.isVisible(row)) : true
    );

    const btns = (
      <>
        {visibleActionColumns.map((action) => {
          const hidden = !rowActions.some((a) => a.key === action.key);
          const disabled = typeof action.disabled === "function" ? action.disabled(row) : action.disabled;
          const tone = action.danger ? "danger" : "primary";
          const iconName = action.icon || "view";

          return (
            <td
              key={`action-${action.key}-${id}`}
              className="px-3 py-3 text-center"
              style={{ width: action.width }}
            >
              {!hidden && (
                <ActionBtn
                  onClick={() => action.onClick(row, id)}
                  title={action.tooltip || action.header || action.key}
                  tone={tone}
                  disabled={Boolean(disabled)}
                >
                  <LexicraftIcon name={iconName} size={16} />
                </ActionBtn>
              )}
            </td>
          );
        })}
      </>
    );

    if (pos === "start") {
      if (isRTL) return null;
      return btns;
    }
    if (!isRTL) return null;
    return btns;
  };

  const renderGroupedRowActions = (id, row) => {
    if (!showGroupedActions) return null;
    const rowActions = visibleActionColumns.filter((action) =>
      typeof action.isVisible === "function" ? Boolean(action.isVisible(row)) : true
    );
    if (!rowActions.length) return <td className="px-4 py-3 text-center" />;

    return (
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          {rowActions.map((action) => {
            const disabled = typeof action.disabled === "function" ? action.disabled(row) : action.disabled;
            return (
              <ActionBtn
                key={`group-${id}-${action.key}`}
                onClick={() => action.onClick(row, id)}
                title={action.tooltip || action.header || action.key}
                tone={action.danger ? "danger" : "primary"}
                disabled={Boolean(disabled)}
              >
                <LexicraftIcon name={action.icon || "view"} size={16} />
              </ActionBtn>
            );
          })}
        </div>
      </td>
    );
  };

  const colAlignClass = (h, fallback) => {
    // allow per-column overrides
    if (h?.align === "center") return "text-center";
    if (h?.align === "end") return isRTL ? "text-left" : "text-right"; // end relative to dir
    if (h?.align === "start") return isRTL ? "text-right" : "text-left";
    return fallback;
  };

  return (
    <section className="w-full" dir={dir}>
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className={cx("flex items-center gap-3", isRTL ? "flex-row-reverse" : "")}>
          {title && (
            <h3 className="text-lg font-bold text-foreground tracking-tight">
              {title}
            </h3>
          )}
          {renderAdd()}
        </div>

        <div className="w-full sm:w-[360px]">
          <div className="relative">
            <span
              className={cx(
                "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
                isRTL ? "right-3" : "left-3"
              )}
            >
              <LexicraftIcon name="search" size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              placeholder={searchPlaceholder}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cx(
                "field-shell w-full py-2 text-sm text-foreground outline-none transition",
                isRTL ? "pr-10 pl-3 text-right" : "pl-10 pr-3 text-left"
              )}
            />
          </div>
        </div>
      </div>

      {showEmptyState ? (
        <EmptyState label={emptyLabel} />
      ) : (
        <>
          {/* Desktop table */}
          <div className="table-shell hidden w-full overflow-x-auto md:block">
            <table className="w-full table-auto table-soft-shadow" dir={dir}>
              <thead className="border-b border-border/70 bg-[linear-gradient(180deg,hsl(var(--muted)),hsl(var(--surface-raised)))]">
                <tr>
                  {renderHeadActions("start")}

                  {headers.map((h) => {
                    const sortable = h.sortable !== false;
                    const active = sortKey === h.key;
                    const align = colAlignClass(h, thAlign);

                    return (
                      <th
                        key={h.key}
                        onClick={() => sortable && handleSort(h.key)}
                        className={cx(
                          "px-4 py-3 text-xs font-bold text-foreground",
                          align,
                          sortable ? "cursor-pointer select-none hover:opacity-90" : "opacity-80",
                          "transition",
                          h.thClassName
                        )}
                        title={sortable ? (isRTL ? "ترتيب" : "Sort") : undefined}
                      >
                        <span className={cx("inline-flex items-center gap-2", isRTL ? "flex-row-reverse" : "")}>
                          {h.text}
                          {active &&
                            (sortDirection === "asc" ? (
                              <LexicraftIcon name="sort-up" size={14} />
                            ) : (
                              <LexicraftIcon name="sort-down" size={14} />
                            ))}
                        </span>
                      </th>
                    );
                  })}

                  {renderHeadActions("end")}
                </tr>
              </thead>

              {loading ? (
                <LoadingRows colSpan={colSpan} rows={Math.min(itemsPerPage, 6)} />
              ) : error ? (
                <tbody>
                  <tr>
                    <td colSpan={colSpan} className="p-4">
                      <ErrorState
                        label={errorLabel}
                        onRetry={onRetry}
                        retryLabel={retryLabel}
                        isRTL={isRTL}
                      />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {paginatedData.map((row, index) => {
                    const { id, isMissing } = resolveIdMeta(row, index);
                    const warnId = qaMode && isMissing;

                    return (
                      <tr
                        key={id}
                        className={cx(
                          "border-b border-border/50 transition",
                          "hover:bg-[hsl(var(--surface-highlight))]",
                          "animate-in fade-in duration-200"
                        )}
                      >
                        {showActionColumns ? renderRowActions("start", id, row) : !isRTL && renderGroupedRowActions(id, row)}

                        {headers.map((h, headerIndex) => {
                          const align = colAlignClass(h, tdAlign);

                          return (
                            <td
                              key={`${id}-${h.key}`}
                              className={cx(
                                "px-4 py-3 text-sm text-foreground",
                                headerIndex === 0 ? (isRTL ? "sticky right-0 z-10 bg-[hsl(var(--card)/0.95)]" : "sticky left-0 z-10 bg-[hsl(var(--card)/0.95)]") : "",
                                align,
                                h.tdClassName
                              )}
                            >
                              <div className={cx("flex flex-wrap items-center gap-2", cellJustify)}>
                                <span className="min-w-0">
                                  {typeof customRenderers?.[h.key] === "function"
                                    ? customRenderers[h.key](row)
                                    : defaultGetValue(row, h) ?? ""}
                                </span>

                                {warnId && headerIndex === 0 && (
                                  <span className="rounded-full border border-amber-400/50 bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                    Missing ID
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}

                        {showActionColumns ? renderRowActions("end", id, row) : isRTL && renderGroupedRowActions(id, row)}
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-3 md:hidden">
            {loading &&
              Array.from({ length: Math.min(itemsPerPage, 6) }).map((_, idx) => (
                <div key={`loading-card-${idx}`} className="h-28 rounded-2xl skeleton-shimmer" />
              ))}

            {!loading && error && (
              <ErrorState label={errorLabel} onRetry={onRetry} retryLabel={retryLabel} isRTL={isRTL} />
            )}

            {!loading &&
              !error &&
              paginatedData.map((row, index) => {
                const { id, isMissing } = resolveIdMeta(row, index);
                const warnId = qaMode && isMissing;

                const topHeader = headers[0];

                return (
                  <div
                    key={id}
                    className={cx("table-shell rounded-2xl p-4", "animate-in fade-in duration-200")}
                  >
                    <div className={cx("flex items-start justify-between gap-3", isRTL ? "flex-row-reverse" : "")}>
                      <div className="min-w-0">
                        <p className={cx("text-sm font-bold text-foreground", isRTL ? "text-right" : "text-left")}>
                          {topHeader?.text}:{" "}
                          <span className="font-semibold">
                            {typeof customRenderers?.[topHeader?.key] === "function"
                              ? customRenderers[topHeader?.key](row)
                              : defaultGetValue(row, topHeader) ?? ""}
                          </span>
                        </p>

                        <p className={cx("mt-1 text-xs text-muted-foreground flex items-center gap-2", isRTL ? "flex-row-reverse" : "")}>
                          <span>ID: {id}</span>
                          {warnId && (
                            <span className="rounded-full border border-amber-400/50 bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                              Missing ID
                            </span>
                          )}
                        </p>
                      </div>

                      {visibleActionColumns.length > 0 && (
                        <div className={cx("flex shrink-0 items-center gap-2", isRTL ? "flex-row-reverse" : "")}>
                          {visibleActionColumns
                            .filter((action) => (typeof action.isVisible === "function" ? action.isVisible(row) : true))
                            .map((action) => (
                              <ActionBtn
                                key={`mobile-${id}-${action.key}`}
                                onClick={() => action.onClick(row, id)}
                                title={action.tooltip || action.header || action.key}
                                tone={action.danger ? "danger" : "primary"}
                                disabled={Boolean(typeof action.disabled === "function" ? action.disabled(row) : action.disabled)}
                              >
                                <LexicraftIcon name={action.icon || "view"} size={16} />
                              </ActionBtn>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 grid gap-2">
                      {headers.slice(1).map((h) => (
                        <div
                          key={`${id}-m-${h.key}`}
                          className={cx("flex items-start justify-between gap-3", isRTL ? "flex-row-reverse" : "")}
                        >
                          <span className="text-xs font-semibold text-muted-foreground">
                            {h.mobileLabel || h.text}
                          </span>
                          <span className={cx("text-xs text-foreground", isRTL ? "text-right" : "text-left")}>
                            {typeof customRenderers?.[h.key] === "function"
                              ? customRenderers[h.key](row)
                              : defaultGetValue(row, h) ?? ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

          <Pagination
            isRTL={isRTL}
            currentPage={safePage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((p) => clamp(p - 1, 1, totalPages))}
            onNext={() => setCurrentPage((p) => clamp(p + 1, 1, totalPages))}
            pageLabel={pageLabel}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
          />
        </>
      )}
    </section>
  );
}
