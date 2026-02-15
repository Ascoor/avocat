import { Link } from 'react-router-dom';
import ReportStatusBadge from '@features/reports/components/Reports/ReportStatusBadge';

const getDetailLink = (tabKey, row) => {
  if (tabKey === 'cases') return `/dashboard/legcases/${row?.id}`;
  if (tabKey === 'clients') return `/dashboard/clients/${row?.id}`;
  const caseId = row?.legcase_id || row?.legcase?.id || row?.case_id;
  return caseId ? `/dashboard/legcases/${caseId}` : '#';
};

const REPORT_COLUMNS = {
  cases: [
    { key: 'title', label: 'عنوان القضية', value: (row) => row?.title || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.slug || row?.file_number || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.client?.name || row?.clients?.[0]?.name || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  services: [
    { key: 'name', label: 'الخدمة', value: (row) => row?.name || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.file_number || row?.legcase?.slug || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.client?.name || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  procedures: [
    { key: 'type', label: 'نوع الإجراء', value: (row) => row?.procedure_type?.name || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.legcase?.slug || row?.file_number || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.client?.name || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  sessions: [
    { key: 'type', label: 'نوع الجلسة', value: (row) => row?.session_type?.name || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.legcase?.slug || row?.file_number || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.client?.name || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  clients: [
    { key: 'name', label: 'اسم الموكل', value: (row) => row?.name || '-' },
    { key: 'type', label: 'نوع الموكل', value: (row) => row?.client_type || '-' },
    { key: 'phone', label: 'الهاتف', value: (row) => row?.phone || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
};

const ReportResults = ({ tabKey, rows, loading, error, onRetry }) => {
  const columns = REPORT_COLUMNS[tabKey] || [];

  if (loading) {
    return <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 text-sm">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm" dir="rtl">
        <p className="mb-3">{error}</p>
        <button type="button" onClick={onRetry} className="rounded-lg border border-border/70 px-3 py-1.5">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!rows.length) {
    return <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 text-sm">لا توجد نتائج مطابقة.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)]">
      <table className="min-w-full text-sm" dir="rtl">
        <thead>
          <tr className="border-b border-border/70 bg-[hsl(var(--muted)/0.4)] text-right">
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-2 font-semibold">
                {column.label}
              </th>
            ))}
            <th className="px-3 py-2 font-semibold">تفاصيل</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row?.id || JSON.stringify(row)} className="border-b border-border/50 last:border-b-0">
              {columns.map((column) => (
                <td key={column.key} className="px-3 py-2 text-right">
                  {column.key === 'status' ? <ReportStatusBadge status={column.value(row)} /> : column.value(row)}
                </td>
              ))}
              <td className="px-3 py-2">
                <Link to={getDetailLink(tabKey, row)} className="inline-flex rounded-lg border border-border/70 px-3 py-1.5 text-xs font-semibold">
                  عرض
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportResults;
