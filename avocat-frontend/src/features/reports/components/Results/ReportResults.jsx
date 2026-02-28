import { Link } from 'react-router-dom';
import ReportStatusBadge from '@features/reports/components/Reports/ReportStatusBadge';

const getDetailLink = (tabKey, row) => {
  if (tabKey === 'cases') return `/dashboard/legcases/${row?.id}`;
  if (tabKey === 'clients') return `/dashboard/clients/${row?.id}`;
  const caseId = row?.legcase_id || row?.legcase?.id || row?.case_id;
  return caseId ? `/dashboard/legcases/${caseId}` : '#';
};

const formatLastUpdated = (value) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return new Intl.DateTimeFormat('ar-EG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed);
};

const REPORT_COLUMNS = {
  cases: [
    { key: 'title', label: 'عنوان القضية', value: (row) => row?.displayTitle || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.displayFileNumber || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.displayClientName || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.displayStatus || '-' },
  ],
  services: [
    { key: 'name', label: 'الخدمة', value: (row) => row?.displayTitle || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.displayFileNumber || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.displayClientName || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.displayStatus || '-' },
  ],
  procedures: [
    { key: 'type', label: 'نوع الإجراء', value: (row) => row?.displayTitle || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.displayFileNumber || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.displayClientName || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.displayStatus || '-' },
  ],
  sessions: [
    { key: 'type', label: 'نوع الجلسة', value: (row) => row?.displayTitle || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.displayFileNumber || '-' },
    { key: 'client_name', label: 'اسم الموكل', value: (row) => row?.displayClientName || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.displayStatus || '-' },
  ],
  clients: [
    { key: 'name', label: 'اسم الموكل', value: (row) => row?.displayTitle || '-' },
    { key: 'type', label: 'نوع الموكل', value: (row) => row?.displayClientType || '-' },
    { key: 'phone', label: 'الهاتف', value: (row) => row?.displayPhone || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.displayStatus || '-' },
  ],
};

const ReportResults = ({ tabKey, rows, loading, error, onRetry, lastUpdatedAt }) => {
  const columns = REPORT_COLUMNS[tabKey] || [];
  const updatedAt = formatLastUpdated(lastUpdatedAt);

  if (loading) {
    return (
      <div className="space-y-3 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 text-sm" dir="rtl">
        <p className="font-medium">جاري تحميل بيانات التقرير...</p>
        <div className="grid gap-2">
          <div className="h-9 animate-pulse rounded-lg bg-[hsl(var(--muted)/0.45)]" />
          <div className="h-9 animate-pulse rounded-lg bg-[hsl(var(--muted)/0.35)]" />
          <div className="h-9 animate-pulse rounded-lg bg-[hsl(var(--muted)/0.25)]" />
        </div>
      </div>
    );
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
    <div className="space-y-2" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-[hsl(var(--card)/0.65)] px-3 py-2 text-xs text-muted-foreground">
        <p>عدد النتائج: {rows.length}</p>
        {updatedAt ? <p>آخر تحديث: {updatedAt}</p> : null}
      </div>
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
    </div>
  );
};

export default ReportResults;
