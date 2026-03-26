import { Link } from 'react-router-dom';
import ReportStatusBadge from '@features/reports/components/Reports/ReportStatusBadge';
import { useLanguage } from '@shared/contexts/LanguageContext';

// Function to get the detail link for the corresponding report section (cases, clients, etc.)
const getDetailLink = (tabKey, row) => {
  if (tabKey === 'cases') return `/dashboard/legcases/${row?.id}`;
  if (tabKey === 'clients') return `/dashboard/clients/${row?.id}`;
  const caseId = row?.legcase_id || row?.legcase?.id || row?.case_id;
  return caseId ? `/dashboard/legcases/${caseId}` : '#';
};

// Column definitions for different report types
const REPORT_COLUMNS = {
  services: [
    { 
      key: 'name', 
      label: 'الخدمة', 
      value: (row) => row.service_type?.name || '-' 
    },
    { 
      key: 'file_number', 
      label: 'رقم الملف', 
      value: (row) => row?.file_number || row.slug || '-' 
    },
    { 
      key: 'client_name', 
      label: 'اسم الموكل', 
      value: (row) => row?.clients?.map(client => client.name).join(", ") || '-'  // Join client names if there are multiple clients
    },
    { 
      key: 'status', 
      label: 'الحالة', 
      value: (row) => row?.status || '-' 
    },
  ],
  procedures: [
    { 
      key: 'type', 
      label: 'نوع الإجراء', 
      value: (row) => row?.procedure_type?.name || '-' 
    },
    { 
      key: 'file_number', 
      label: 'رقم الملف', 
      value: (row) => row?.leg_case?.slug || row?.file_number || '-' 
    },
    { 
      key: 'client_names', 
      label: 'اسماء الموكلين', 
      value: (row) => row?.leg_case?.clients?.map(client => client.name).join(", ") || '-'  // Join client names if there are multiple clients
    },
    { 
      key: 'status', 
      label: 'الحالة', 
      value: (row) => row?.status || '-' 
    },
  ],
  sessions: [
    { key: 'session_date', label: 'تاريخ الجلسة', value: (row) => new Date(row?.session_date).toLocaleDateString() || '-' },
    { key: 'court_name', label: 'اسم المحكمة', value: (row) => row?.court?.name || '-' },
    { key: 'orders', label: 'الأوامر', value: (row) => row?.orders || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  clients: [
    { key: 'name', label: 'اسم الموكل', value: (row) => row?.name || '-' },
    { key: 'phone', label: 'الهاتف', value: (row) => row?.phone_number || '-' },
    { key: 'address', label: 'العنوان', value: (row) => row?.address || '-' },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],
  cases: [
    { key: 'title', label: 'عنوان القضية', value: (row) => row?.title || '-' },
    { key: 'file_number', label: 'رقم الملف', value: (row) => row?.slug || row?.file_number || '-' },
    { 
      key: 'client_name', 
      label: 'اسم الموكل',    
      value: (row) => row?.clients?.map(client => client.name).join(", ") || '-' // Display client names
    },
    { key: 'status', label: 'الحالة', value: (row) => row?.status || '-' },
  ],

};

// Main component for displaying report results
const ReportResults = ({ tabKey, rows, loading, error, onRetry }) => {
  const { direction } = useLanguage();
  const columns = REPORT_COLUMNS[tabKey] || [];

  // Handle loading state
  if (loading) {
    return <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 text-sm">جاري التحميل...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm" dir={direction}>
        <p className="mb-3">{error}</p>
        <button type="button" onClick={onRetry} className="rounded-lg border border-border/70 px-3 py-1.5">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  // Handle empty data state
  if (!rows.length) {
    return <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 text-sm">لا توجد نتائج مطابقة.</div>;
  }

  // Render report results table
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)]">
      <table className="min-w-full text-sm" dir={direction}>
        <thead>
          <tr className="border-b border-border/70 bg-[hsl(var(--muted)/0.4)] text-start">
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
                <td key={column.key} className="px-3 py-2 text-start">
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