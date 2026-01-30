import React, { useEffect, useMemo, useState } from "react";
import { MdEdit, MdVisibility } from "react-icons/md";
import { FaTrashAlt, FaSortUp, FaSortDown } from "react-icons/fa";

/**
 * TableComponent
 * - Search input ONLY (search across ALL columns)
 * - ✅ no scope select
 * - ✅ searches all headers (except searchable:false)
 * - ✅ optional default "إضافة قضية جديدة" button (via onAdd / addLabel)
 *
 * Header shape:
 * {
 *   key: string,
 *   text: string,
 *   searchable?: boolean,   // default true
 *   sortable?: boolean,     // default true
 *   getValue?: (row) => any // used for sorting + search (fallback row[key])
 *   tdClassName?: string,
 *   thClassName?: string,
 * }
 */
const normalize = (v) => {
  if (v === null || v === undefined) return "";

  let s = String(v);

  // لو Object بالغلط
  if (typeof v === "object") {
    try { s = JSON.stringify(v); } catch { s = String(v); }
  }

  return s
    .toLowerCase()
    // إزالة التشكيل + تطويل
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    // توحيد أشكال الألف والهمزات
    .replace(/[إأآٱ]/g, "ا")
    // توحيد الياء/الألف المقصورة
    .replace(/[ى]/g, "ي")
    // توحيد الهاء/التاء المربوطة (اختياري)
    .replace(/[ة]/g, "ه")
    // مسافات زائدة
    .replace(/\s+/g, " ")
    .trim();
};

const defaultGetValue = (row, header) => {
  if (!row || !header) return "";
  if (typeof header.getValue === "function") return header.getValue(row);
  return row?.[header.key];
};

const toComparable = (v) => {
  if (v === null || v === undefined) return "";
  // If it's a number or numeric string
  const n = typeof v === "number" ? v : Number(String(v).replace(/,/g, ""));
  if (!Number.isNaN(n) && String(v).trim() !== "") return n;
  return String(v);
};

const collator = new Intl.Collator("ar", { numeric: true, sensitivity: "base" });

const compareValues = (a, b) => {
  const av = toComparable(a);
  const bv = toComparable(b);

  if (typeof av === "number" && typeof bv === "number") return av - bv;
  return collator.compare(String(av), String(bv));
};

const TableComponent = ({
  data = [],
  headers = [],
  customRenderers = {},

  onView,
  onEdit,
  onDelete,

  // optional default add button
  onAdd,
  addLabel = "إضافة قضية جديدة",
  addButtonClassName = "",

  // optional custom add button renderer (if you want full control)
  renderAddButton,

  // pagination
  itemsPerPage = 10,

  // labels
  searchPlaceholder = "ابحث",
  emptyLabel = "لا يوجد بيانات",

  // optional row key
  rowKey = "id",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const searchableHeaders = useMemo(() => {
    return headers.filter((h) => h?.key && h.searchable !== false && h.key !== "actions");
  }, [headers]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredData = useMemo(() => {
    const q = normalize(searchQuery);
    if (!q) return data;

    const keywords = q.split(" ").filter(Boolean);

    return data.filter((row) => {
      // AND across keywords, each keyword must appear in ANY searchable column
      return keywords.every((kw) => {
        return searchableHeaders.some((header) => {
          const raw = defaultGetValue(row, header);
          const text = normalize(raw);
          return text.includes(kw);
        });
      });
    });
  }, [data, searchQuery, searchableHeaders]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const headers = [
      {
        key: "fullName",
        text: "الاسم",
        getValue: (row) => row.fullName, // أو row.person?.fullName
        searchable: true,
      },
      { key: "caseNumber", text: "رقم القضية" },
      { key: "role", text: "الصفة" },
      { key: "type", text: "النوع" },
      { key: "court", text: "المحكمة" },
      { key: "status", text: "الحالة" },
    ];
    
    const dir = sortDirection === "asc" ? 1 : -1;

    // stable-ish sort by keeping original index
    return filteredData
      .map((row, idx) => ({ row, idx }))
      .sort((a, b) => {
        const aVal = defaultGetValue(a.row, header);
        const bVal = defaultGetValue(b.row, header);
        const cmp = compareValues(aVal, bVal);
        if (cmp !== 0) return cmp * dir;
        return a.idx - b.idx;
      })
      .map((x) => x.row);
  }, [filteredData, headers, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));

  const paginatedData = useMemo(() => {
    const safePage = Math.min(Math.max(1, currentPage), totalPages);
    const start = (safePage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, totalPages, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleSort = (key) => {
    const header = headers.find((h) => h.key === key);
    if (!header || header.sortable === false) return;

    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const renderAdd = () => {
    if (typeof renderAddButton === "function") return renderAddButton();
    if (!onAdd) return null;

    return (
      <button
        type="button"
        onClick={onAdd}
        className={[
          "px-4 py-2 rounded-lg font-semibold",
          "bg-violet-600 hover:bg-violet-700 text-white",
          "transition duration-200 active:scale-[0.99]",
          addButtonClassName,
        ].join(" ")}
      >
        {addLabel}
      </button>
    );
  };

  const showView = typeof onView === "function";
  const showEdit = typeof onEdit === "function";
  const showDelete = typeof onDelete === "function";

  return (
    <section className="container mx-auto p-6 dark:bg-gray-800 rounded-lg shadow-md font-['tajawal']">
      <div className="w-full mb-6 flex flex-col md:flex-row gap-3 md:gap-4 md:justify-between md:items-center">
        <div className="w-full md:w-auto">{renderAdd()}</div>

        <div className="w-full md:w-[360px]">
          <input
            type="text"
            value={searchQuery}
            placeholder={searchPlaceholder}
            className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-violet-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto shadow-md">
            <thead className="text-sm font-semibold tracking-wide text-center text-gray-100 bg-blue-500 dark:bg-gradient-night dark:text-avocat-orange-light uppercase border-b border-gray-600">
              <tr>
                {showView && <th className="px-4 py-3 whitespace-nowrap">عرض</th>}

                {headers.map((header) => {
                  const isSortable = header.sortable !== false;
                  const isActive = sortKey === header.key;

                  return (
                    <th
                      key={header.key}
                      className={[
                        "px-4 py-3 whitespace-nowrap",
                        isSortable ? "cursor-pointer select-none" : "cursor-default opacity-90",
                        header.thClassName || "",
                      ].join(" ")}
                      onClick={() => isSortable && handleSort(header.key)}
                      title={isSortable ? "ترتيب" : undefined}
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        {header.text}
                        {isActive && (
                          <>
                            {sortDirection === "asc" ? (
                              <FaSortUp className="inline-block" />
                            ) : (
                              <FaSortDown className="inline-block" />
                            )}
                          </>
                        )}
                      </span>
                    </th>
                  );
                })}

                {showEdit && <th className="px-4 py-3 whitespace-nowrap">تعديل</th>}
                {showDelete && <th className="px-4 py-3 whitespace-nowrap">حذف</th>}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((row, index) => {
                const key = row?.[rowKey] ?? `${index}`;

                return (
                  <tr
                    key={key}
                    className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 border-b border-gray-200 dark:border-gray-600"
                  >
                    {showView && (
                      <td className="px-4 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => onView(row?.[rowKey] ?? row?.id ?? key)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                          aria-label="عرض"
                        >
                          <MdVisibility />
                        </button>
                      </td>
                    )}

                    {headers.map((header) => (
                      <td
                        key={`${key}-${header.key}`}
                        className={[
                          "px-4 py-2 text-center text-sm md:text-base lg:text-lg",
                          header.tdClassName || "",
                        ].join(" ")}
                      >
                        {typeof customRenderers?.[header.key] === "function"
                          ? customRenderers[header.key](row)
                          : defaultGetValue(row, header) ?? ""}
                      </td>
                    ))}

                    {showEdit && (
                      <td className="px-4 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => onEdit(row?.[rowKey] ?? row?.id ?? key)}
                          className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors duration-300"
                          aria-label="تعديل"
                        >
                          <MdEdit />
                        </button>
                      </td>
                    )}

                    {showDelete && (
                      <td className="px-4 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300"
                          aria-label="حذف"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-800 dark:text-gray-200">{emptyLabel}</p>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 gap-3">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={[
            "px-4 py-2 rounded-full transition duration-200 bg-gray-200 hover:bg-gray-300 text-gray-700",
            currentPage <= 1 ? "opacity-50 cursor-default hover:bg-gray-200" : "hover:scale-105",
          ].join(" ")}
        >
          سابق
        </button>

        <span className="text-gray-700 dark:text-gray-300">
          الصفحة {Math.min(currentPage, totalPages)} من {totalPages}
        </span>

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={[
            "px-4 py-2 rounded-full transition duration-200 bg-gray-200 hover:bg-gray-300 text-gray-700",
            currentPage >= totalPages ? "opacity-50 cursor-default hover:bg-gray-200" : "hover:scale-105",
          ].join(" ")}
        >
          التالي
        </button>
      </div>
    </section>
  );
};

export default TableComponent;
