import React, { useEffect, useMemo, useState } from "react";
import { LexicraftIcon } from "@shared/icons/lexicraft";

/**
 * Header:
 * {
 *   key: string,
 *   text: string,
 *   searchable?: boolean (default true),
 *   sortable?: boolean (default true),
 *   getValue?: (row) => any, // for search + sort (fallback row[key])
 *   sortValue?: (row) => any, // optional override for sorting
 *   searchValue?: (row) => any, // optional override for searching
 *   tdClassName?: string,
 *   thClassName?: string,
 *   mobileLabel?: string, // optional for card view label
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

const TableComponent = ({
  data = [],
  headers = [],
  customRenderers = {},

  onView,
  onEdit,
  onDelete,
  onRowAction,

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
  getRowId, // optional override: (row) => string|number

  // layout
  title, // optional

  // qa
  qaMode = false,

  permissions,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const canView = permissions?.view !== false;
  const canCreate = permissions?.create !== false;
  const canUpdate = permissions?.update !== false;
  const canDelete = permissions?.delete !== false;

  const showView = canView && typeof onView === "function";
  const showEdit = canUpdate && typeof onEdit === "function";
  const showDelete = canDelete && typeof onDelete === "function";

  const searchableHeaders = useMemo(
    () => headers.filter((h) => h?.key && h.searchable !== false && h.key !== "actions"),
    [headers],
  );

  useEffect(() => setCurrentPage(1), [searchQuery, sortKey, sortDirection]);

  const filteredData = useMemo(() => {
    const q = normalize(searchQuery);
    if (!q) return data;

    const keywords = q.split(" ").filter(Boolean);

    return data.filter((row) =>
      keywords.every((kw) =>
        searchableHeaders.some((header) =>
          normalize(defaultSearchValue(row, header)).includes(kw),
        ),
      ),
    );
  }, [data, searchQuery, searchableHeaders]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const header = headers.find((h) => h.key === sortKey);
    if (!header || header.sortable === false) return filteredData;

    const dir = sortDirection === "asc" ? 1 : -1;

    return filteredData
      .map((row, idx) => ({ row, idx }))
      .sort((a, b) => {
        const aVal = defaultSortValue(a.row, header);
        const bVal = defaultSortValue(b.row, header);
        const cmp = compareValues(aVal, bVal);
        if (cmp !== 0) return cmp * dir;
        return a.idx - b.idx;
      })
      .map((x) => x.row);
  }, [filteredData, headers, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));

  const paginatedData = useMemo(() => {
    const safePage = clamp(currentPage, 1, totalPages);
    const start = (safePage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, totalPages, itemsPerPage]);

  const getId = (row, index) => {
    const id = typeof getRowId === "function" ? getRowId(row) : row?.[rowKey];
    return id ?? index;
  };

  const resolveIdMeta = (row, index) => {
    const rawId = typeof getRowId === "function" ? getRowId(row) : row?.[rowKey];
    return {
      id: rawId ?? index,
      isMissing: rawId === null || rawId === undefined,
    };
  };

  const handleSort = (key) => {
    const header = headers.find((h) => h.key === key);
    if (!header || header.sortable === false) return;

    if (sortKey === key) setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const renderAdd = () => {
    if (typeof renderAddButton === "function") return renderAddButton();
    if (!onAdd || !canCreate) return null;

    return (
      <button
        type="button"
        onClick={onAdd}
        className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-sm transition hover:opacity-90"
      >
        {addLabel}
      </button>
    );
  };

  const ActionBtn = ({ onClick, title: tt, children, tone = "neutral" }) => {
    const toneClass =
      tone === "danger"
        ? "text-[hsl(var(--destructive))]"
        : tone === "primary"
          ? "text-[hsl(var(--primary))]"
          : "text-foreground";

    return (
      <button
        type="button"
        onClick={onClick}
        title={tt}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-[hsl(var(--background)/0.55)] shadow-sm transition hover:opacity-90 ${toneClass}`}
      >
        {children}
      </button>
    );
  };

  const Toolbar = (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {title && <h3 className="text-lg font-bold text-foreground">{title}</h3>}
        {renderAdd()}
      </div>

      <div className="w-full sm:w-[360px]">
        <input
          type="text"
          value={searchQuery}
          placeholder={searchPlaceholder}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-[hsl(var(--background)/0.55)] px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
        />
      </div>
    </div>
  );

  const Pagination = (
    <div className="mt-4 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={() => setCurrentPage((p) => clamp(p - 1, 1, totalPages))}
        disabled={currentPage <= 1}
        className="rounded-full border border-border bg-[hsl(var(--muted))] px-4 py-2 text-sm font-semibold text-foreground transition disabled:opacity-50"
      >
        سابق
      </button>

      <span className="text-sm text-muted-foreground">
        الصفحة {clamp(currentPage, 1, totalPages)} من {totalPages}
      </span>

      <button
        type="button"
        onClick={() => setCurrentPage((p) => clamp(p + 1, 1, totalPages))}
        disabled={currentPage >= totalPages}
        className="rounded-full border border-border bg-[hsl(var(--muted))] px-4 py-2 text-sm font-semibold text-foreground transition disabled:opacity-50"
      >
        التالي
      </button>
    </div>
  );

  const renderLoadingRows = () => (
    <tbody>
      {Array.from({ length: Math.min(itemsPerPage, 6) }).map((_, index) => (
        <tr key={`loading-${index}`} className="border-b border-border/40">
          <td colSpan={headers.length + Number(showView) + Number(showEdit) + Number(showDelete)}>
            <div className="h-10 w-full rounded-xl skeleton-shimmer" />
          </td>
        </tr>
      ))}
    </tbody>
  );

  const renderErrorRow = () => (
    <tbody>
      <tr>
        <td
          colSpan={headers.length + Number(showView) + Number(showEdit) + Number(showDelete)}
          className="px-4 py-6 text-center text-sm text-destructive"
        >
          <div className="space-y-3">
            <div>{errorLabel}</div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-background px-4 py-2 text-xs font-semibold text-destructive"
              >
                <LexicraftIcon name="arrow-forward" size={14} isDirectional />
                {retryLabel}
              </button>
            )}
          </div>
        </td>
      </tr>
    </tbody>
  );

  const showEmptyState = !loading && !error && filteredData.length === 0;

  return (
    <section className="w-full">
      {Toolbar}

      {showEmptyState ? (
        <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-6 text-sm text-muted-foreground shadow-sm backdrop-blur">
          {emptyLabel}
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden w-full overflow-x-auto rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] shadow-sm backdrop-blur md:block">
            <table className="w-full table-auto table-soft-shadow">
              <thead className="border-b border-border/70 bg-[hsl(var(--muted))]">
                <tr>
                  {showView && <th className="px-4 py-3 text-center text-xs font-bold text-foreground">عرض</th>}

                  {headers.map((h) => {
                    const sortable = h.sortable !== false;
                    const active = sortKey === h.key;

                    return (
                      <th
                        key={h.key}
                        onClick={() => sortable && handleSort(h.key)}
                        className={[
                          "px-4 py-3 text-center text-xs font-bold text-foreground",
                          sortable ? "cursor-pointer select-none hover:opacity-90" : "opacity-80",
                          h.thClassName || "",
                        ].join(" ")}
                        title={sortable ? "ترتيب" : undefined}
                      >
                        <span className="inline-flex items-center justify-center gap-2">
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

                  {showEdit && <th className="px-4 py-3 text-center text-xs font-bold text-foreground">تعديل</th>}
                  {showDelete && <th className="px-4 py-3 text-center text-xs font-bold text-foreground">حذف</th>}
                </tr>
              </thead>

              {loading ? (
                renderLoadingRows()
              ) : error ? (
                renderErrorRow()
              ) : (
                <tbody>
                  {paginatedData.map((row, index) => {
                    const { id, isMissing } = resolveIdMeta(row, index);
                    const warnId = qaMode && isMissing;

                    return (
                      <tr key={id} className="border-b border-border/50 transition hover:bg-[hsl(var(--muted)/0.45)]">
                        {showView && (
                          <td className="px-4 py-3 text-center">
                            <ActionBtn
                              onClick={() => {
                                onView(id);
                                onRowAction?.("view", id, row);
                              }}
                              title="عرض"
                              tone="primary"
                            >
                              <LexicraftIcon name="view" size={16} />
                            </ActionBtn>
                          </td>
                        )}

                        {headers.map((h, headerIndex) => (
                          <td
                            key={`${id}-${h.key}`}
                            className={[
                              "px-4 py-3 text-center text-sm text-foreground",
                              h.tdClassName || "",
                            ].join(" ")}
                          >
                            <div className="flex flex-wrap items-center justify-center gap-2">
                              <span>
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
                        ))}

                        {showEdit && (
                          <td className="px-4 py-3 text-center">
                            <ActionBtn
                              onClick={() => {
                                onEdit(id);
                                onRowAction?.("edit", id, row);
                              }}
                              title="تعديل"
                              tone="primary"
                            >
                              <LexicraftIcon name="edit" size={16} />
                            </ActionBtn>
                          </td>
                        )}

                        {showDelete && (
                          <td className="px-4 py-3 text-center">
                            <ActionBtn
                              onClick={() => {
                                onDelete(id, row);
                                onRowAction?.("delete", id, row);
                              }}
                              title="حذف"
                              tone="danger"
                            >
                              <LexicraftIcon name="trash" size={16} />
                            </ActionBtn>
                          </td>
                        )}
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
              Array.from({ length: Math.min(itemsPerPage, 6) }).map((_, index) => (
                <div key={`loading-card-${index}`} className="h-28 rounded-2xl skeleton-shimmer" />
              ))}

            {!loading && error && (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                <div className="space-y-3">
                  <div>{errorLabel}</div>
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-background px-4 py-2 text-xs font-semibold text-destructive"
                    >
                      <LexicraftIcon name="arrow-forward" size={14} isDirectional />
                      {retryLabel}
                    </button>
                  )}
                </div>
              </div>
            )}

            {!loading &&
              !error &&
              paginatedData.map((row, index) => {
              const { id, isMissing } = resolveIdMeta(row, index);
              const warnId = qaMode && isMissing;

              return (
                <div
                  key={id}
                  className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.7)] p-4 shadow-sm backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground">
                        {headers[0]?.text}:{" "}
                        <span className="font-semibold">
                          {typeof customRenderers?.[headers[0]?.key] === "function"
                            ? customRenderers[headers[0]?.key](row)
                            : defaultGetValue(row, headers[0]) ?? ""}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground flex items-center gap-2 justify-between">
                        <span>ID: {id}</span>
                        {warnId && (
                          <span className="rounded-full border border-amber-400/50 bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                            Missing ID
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="table-actions flex shrink-0 items-center gap-2">
                      {showView && (
                        <ActionBtn
                          onClick={() => {
                            onView(id);
                            onRowAction?.("view", id, row);
                          }}
                          title="عرض"
                          tone="primary"
                        >
                          <LexicraftIcon name="view" size={16} />
                        </ActionBtn>
                      )}
                      {showEdit && (
                        <ActionBtn
                          onClick={() => {
                            onEdit(id);
                            onRowAction?.("edit", id, row);
                          }}
                          title="تعديل"
                          tone="primary"
                        >
                          <LexicraftIcon name="edit" size={16} />
                        </ActionBtn>
                      )}
                      {showDelete && (
                        <ActionBtn
                          onClick={() => {
                            onDelete(id, row);
                            onRowAction?.("delete", id, row);
                          }}
                          title="حذف"
                          tone="danger"
                        >
                          <LexicraftIcon name="trash" size={16} />
                        </ActionBtn>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2">
                    {headers.slice(1).map((h) => (
                      <div key={`${id}-m-${h.key}`} className="flex items-start justify-between gap-3">
                        <span className="text-xs font-semibold text-muted-foreground">{h.mobileLabel || h.text}</span>
                        <span className="text-xs text-foreground text-right">
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

          {Pagination}
        </>
      )}
    </section>
  );
};

export default TableComponent;
