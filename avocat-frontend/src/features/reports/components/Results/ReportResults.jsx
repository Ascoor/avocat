import { Link } from 'react-router-dom';
import ReportStatusBadge from '@features/reports/components/Reports/ReportStatusBadge';
import { resolveLegCaseId } from '@features/reports/services/reportRowNormalizer';

const REPORT_COLUMNS = {
  cases: [
    { key: 'title', label: 'عنوان القضية', value: (row) => row?.title || '-' },
    { key: 'slug', label: 'رقم الملف', value: (row) => row?.slug || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.client_name || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  services: [
    { key: 'title', label: 'الخدمة', value: (row) => row?.title || '-' },
    { key: 'slug', label: 'رقم الملف', value: (row) => row?.slug || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.client_name || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  procedures: [
    { key: 'type_name', label: 'نوع الإجراء', value: (row) => row?.type_name || row?.title || '-' },
    { key: 'slug', label: 'رقم الملف', value: (row) => row?.slug || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.client_name || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  sessions: [
    { key: 'type_name', label: 'نوع الجلسة', value: (row) => row?.type_name || row?.title || '-' },
    { key: 'slug', label: 'رقم الملف', value: (row) => row?.slug || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.client_name || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  clients: [
    { key: 'slug', label: 'رقم الموكل', value: (row) => row?.slug || '-' },
    { key: 'name', label: 'اسم الموكل', value: (row) => row?.name || '-' },
    { key: 'client_type', label: 'نوع الموكل', value: (row) => row?.client_type || '-' },
    { key: 'phone_number', label: 'الهاتف', value: (row) => row?.phone_number || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
};

const getDetailLink = (tabKey, row) => {
  if (tabKey === 'cases') return row?.id ? `/dashboard/legcases/${row.id}` : null;
  if (tabKey === 'clients') return row?.id ? `/dashboard/clients/${row.id}` : null;
  const caseId = resolveLegCaseId(row);
  return caseId ? `/dashboard/legcases/${caseId}` : null;
};

const ReportResults = ({ tabKey, rows, meta, loading, error, hasSearched, onRetry, onPageChange }) => {
  const columns = REPORT_COLUMNS[tabKey] || [];

  if (loading) return <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 text-sm">جاري التحميل...</div>;
  if (error) return <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm"><p className="mb-3">{error}</p><button type="button" onClick={onRetry} className="rounded-lg border border-border/70 px-3 py-1.5">إعادة المحاولة</button></div>;
  if (!hasSearched) return <div className="rounded-2xl border border-dashed border-border/70 bg-[hsl(var(--card)/0.65)] p-4 text-sm">أدخل حقول البحث ثم اضغط "بحث".</div>;
  if (!rows.length) return <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 text-sm">لا توجد نتائج مطابقة.</div>;

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground">إجمالي النتائج: {meta.total}</div>
      <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)]">
        <table className="min-w-full text-sm" dir="rtl">
          <thead><tr className="border-b border-border/70 bg-[hsl(var(--muted)/0.4)] text-right">{columns.map((column) => <th key={column.key} className="px-3 py-2 font-semibold">{column.label}</th>)}<th className="px-3 py-2 font-semibold">تفاصيل</th></tr></thead>
          <tbody>
            {rows.map((row) => {
              const detailLink = getDetailLink(tabKey, row);
              return (
                <tr key={row?.id || JSON.stringify(row)} className="border-b border-border/50 last:border-b-0">
                  {columns.map((column) => <td key={column.key} className="px-3 py-2 text-right">{column.key === 'status' ? <ReportStatusBadge status={column.value(row)} /> : column.value(row)}</td>)}
                  <td className="px-3 py-2">
                    {detailLink ? (
                      <Link to={detailLink} className="inline-flex rounded-lg border border-border/70 px-3 py-1.5 text-xs font-semibold">عرض</Link>
                    ) : (
                      <button type="button" disabled title="لا يمكن فتح التفاصيل" className="inline-flex cursor-not-allowed rounded-lg border border-border/40 px-3 py-1.5 text-xs font-semibold opacity-50">عرض</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span>صفحة {meta.page} من {meta.last_page}</span>
        <div className="flex gap-2">
          <button type="button" disabled={meta.page <= 1} onClick={() => onPageChange(meta.page - 1)} className="rounded border px-2 py-1 disabled:opacity-50">السابق</button>
          <button type="button" disabled={meta.page >= meta.last_page} onClick={() => onPageChange(meta.page + 1)} className="rounded border px-2 py-1 disabled:opacity-50">التالي</button>
        </div>
      </div>
    </div>
  );
};

export default ReportResults;
