import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  FileText,
  FolderKanban,
  Gavel,
  Plus,
  RefreshCcw,
  Scale,
} from 'lucide-react';
import { useCasesTreeState } from './hooks/useCasesTreeState';
import './CasesTreeList.css';

const STATUS_STYLES = {
  مفتوحة: 'bg-emerald-100 text-emerald-700',
  نشطة: 'bg-emerald-100 text-emerald-700',
  مغلقة: 'bg-rose-100 text-rose-700',
};

const SkeletonChildren = () => (
  <div className="cases-tree-indent mt-2 space-y-2 py-2">
    {Array.from({ length: 2 }).map((_, index) => (
      <div key={index} className="h-10 animate-pulse rounded-lg bg-slate-200/80" />
    ))}
  </div>
);

const ChildButton = ({ icon: Icon, title, subtitle, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-right transition hover:border-blue-200 hover:bg-blue-50"
  >
    <Icon className="mt-0.5 h-4 w-4 text-blue-600" />
    <span>
      <span className="block text-sm font-semibold text-slate-700">{title}</span>
      <span className="block text-xs text-slate-500">{subtitle}</span>
    </span>
  </button>
);

const ChildrenList = ({ caseItem, childrenData, onItemSelect }) => {
  const sessions = childrenData?.sessions || [];
  const actions = childrenData?.actions || [];

  if (!sessions.length && !actions.length) {
    return (
      <div className="cases-tree-indent mt-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3 text-xs text-slate-500">
        لا توجد جلسات أو إجراءات لهذه القضية حاليًا.
      </div>
    );
  }

  return (
    <div className="cases-tree-indent mt-2 space-y-3 py-2">
      <div>
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold text-slate-500">
          <CalendarDays className="h-4 w-4" /> الجلسات
        </p>
        <div className="space-y-2">
          {sessions.map((session) => (
            <ChildButton
              key={session.id}
              icon={CalendarDays}
              title={`${session.status} · ${session.date || 'بدون تاريخ'}`}
              subtitle={session.notes || 'لا توجد ملاحظات'}
              onClick={() => onItemSelect({ type: 'session', ...session, caseId: caseItem.id })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold text-slate-500">
          <ClipboardList className="h-4 w-4" /> الإجراءات
        </p>
        <div className="space-y-2">
          {actions.map((action) => (
            <ChildButton
              key={action.id}
              icon={ClipboardList}
              title={`${action.type} · ${action.status}`}
              subtitle={`${action.date || 'بدون تاريخ'} · ${action.assignee || 'غير محدد'}`}
              onClick={() => onItemSelect({ type: 'action', ...action, caseId: caseItem.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CaseRow = ({
  caseItem,
  isExpanded,
  isSelected,
  onToggle,
  isLoading,
  error,
  onRetry,
  childrenData,
  onItemSelect,
}) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-right transition ${
        isSelected ? 'case-row-active' : 'hover:bg-slate-50'
      }`}
    >
      <span className="inline-flex items-center gap-2 text-slate-500">
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        {caseItem.entityType === 'service' ? <Scale className="h-4 w-4" /> : <Gavel className="h-4 w-4" />}
      </span>

      <span className="flex-1">
        <span className="block text-sm font-semibold text-slate-800">{caseItem.title}</span>
        <span className="mt-0.5 block text-xs text-slate-500">
          رقم: {caseItem.number} · {caseItem.court}
        </span>
      </span>

      <span className={`tree-badge ${STATUS_STYLES[caseItem.status] || 'bg-slate-100 text-slate-600'}`}>
        {caseItem.status}
      </span>
    </button>

    <div className="mt-2 flex justify-end gap-2">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
      >
        <Plus className="h-3.5 w-3.5" /> إضافة جلسة
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
      >
        <Plus className="h-3.5 w-3.5" /> إضافة إجراء
      </button>
    </div>

    {isExpanded && (
      <>
        {isLoading && <SkeletonChildren />}

        {!isLoading && error && (
          <div className="cases-tree-indent mt-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            <p>{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 inline-flex items-center gap-1 rounded-md border border-rose-300 bg-white px-2 py-1"
            >
              <RefreshCcw className="h-3.5 w-3.5" /> إعادة المحاولة
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <ChildrenList caseItem={caseItem} childrenData={childrenData} onItemSelect={onItemSelect} />
        )}
      </>
    )}
  </div>
);

const ItemDetailsPanel = ({ selectedChildItem }) => {
  if (!selectedChildItem) {
    return (
      <aside className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
        اختر جلسة أو إجراء لعرض التفاصيل هنا.
      </aside>
    );
  }

  return (
    <aside className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 shadow-sm">
      <p className="text-xs font-bold text-blue-700">
        {selectedChildItem.type === 'session' ? 'تفاصيل الجلسة' : 'تفاصيل الإجراء'}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">
        {selectedChildItem.type === 'session' ? selectedChildItem.notes : selectedChildItem.type}
      </p>
      <ul className="mt-3 space-y-2 text-xs text-slate-600">
        {Object.entries(selectedChildItem)
          .filter(([key]) => !['type'].includes(key))
          .map(([key, value]) => (
            <li key={key} className="rounded-md bg-white px-2 py-1">
              <span className="font-semibold">{key}:</span> {String(value || '—')}
            </li>
          ))}
      </ul>
    </aside>
  );
};

const CasesTreeList = ({ selectedClient, clientsPool = [], expansionMode = 'single', pageSize = 8 }) => {
  const {
    cases,
    isCasesLoading,
    casesError,
    expandedCaseIds,
    selectedCaseId,
    selectedChildItem,
    loadingByCaseId,
    errorByCaseId,
    childrenCacheByCaseId,
    loadCases,
    toggleCaseExpansion,
    loadCaseChildren,
    setSelectedChildItem,
  } = useCasesTreeState({
    client: selectedClient,
    clientsPool,
    expansionMode,
  });

  const [page, setPage] = useState(1);

  const pagination = useMemo(() => {
    const total = Math.max(1, Math.ceil(cases.length / pageSize));
    const start = (page - 1) * pageSize;
    return {
      total,
      visibleRows: cases.slice(start, start + pageSize),
    };
  }, [cases, page, pageSize]);

  if (!selectedClient) return null;

  return (
    <section className="cases-tree-rtl mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]" dir="rtl">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm">
        <header className="mb-4 flex items-center justify-between">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">القضايا والخدمات · {selectedClient.name}</p>
            <p className="text-xs text-slate-500">عرض متدرج داخل نفس القائمة (بدون تبويبات).</p>
          </div>
          <button
            type="button"
            onClick={loadCases}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600"
          >
            <RefreshCcw className="h-3.5 w-3.5" /> تحديث
          </button>
        </header>

        {isCasesLoading && <SkeletonChildren />}

        {!isCasesLoading && casesError && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{casesError}</div>
        )}

        {!isCasesLoading && !casesError && !cases.length && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            لا توجد قضايا أو خدمات لهذا الموكل.
          </div>
        )}

        <div className="space-y-3">
          {pagination.visibleRows.map((caseItem) => (
            <CaseRow
              key={caseItem.id}
              caseItem={caseItem}
              isExpanded={expandedCaseIds.includes(caseItem.id)}
              isSelected={selectedCaseId === caseItem.id}
              onToggle={() => toggleCaseExpansion(caseItem.id)}
              isLoading={Boolean(loadingByCaseId[caseItem.id])}
              error={errorByCaseId[caseItem.id]}
              onRetry={() => loadCaseChildren(caseItem.id)}
              childrenData={childrenCacheByCaseId[caseItem.id]}
              onItemSelect={setSelectedChildItem}
            />
          ))}
        </div>

        {pagination.total > 1 && (
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              className="rounded border border-slate-200 bg-white px-2 py-1 disabled:opacity-40"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              السابق
            </button>
            <span>
              صفحة {page} من {pagination.total}
            </span>
            <button
              type="button"
              className="rounded border border-slate-200 bg-white px-2 py-1 disabled:opacity-40"
              disabled={page === pagination.total}
              onClick={() => setPage((prev) => Math.min(pagination.total, prev + 1))}
            >
              التالي
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <ItemDetailsPanel selectedChildItem={selectedChildItem} />
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500 shadow-sm">
          <p className="mb-2 inline-flex items-center gap-2 text-slate-700">
            <FolderKanban className="h-4 w-4" /> إعداد التوسيع
          </p>
          <p>expansionMode: {expansionMode === 'single' ? 'single (قضية واحدة)' : 'multi (عدة قضايا)'}</p>
          <p className="mt-2">يمكن تغييره بريروبس بدون تعديل البنية.</p>
          <p className="mt-2 inline-flex items-center gap-2"><FileText className="h-4 w-4" /> Lazy loading + cache مفعل.</p>
        </div>
      </div>
    </section>
  );
};

export default CasesTreeList;
