import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchReportRows, getReportsMetadata } from '@features/reports/services/reportsApi';

// Define status keys for different report types
const STATUS_KEYS = {
  cases: 'case_status',
  services: 'service_status',
  procedures: 'procedure_status',
  sessions: 'session_status',
  clients: 'client_status',
};

// Define report tabs
export const REPORT_TABS = [
  { key: 'cases', label: 'القضايا', icon: 'briefcase', to: '/dashboard/reports/cases' },
  { key: 'services', label: 'الخدمات', icon: 'scales', to: '/dashboard/reports/services' },
  { key: 'procedures', label: 'الإجراءات', icon: 'document', to: '/dashboard/reports/procedures' },
  { key: 'sessions', label: 'الجلسات', icon: 'calendar', to: '/dashboard/reports/sessions' },
  { key: 'clients', label: 'الموكلين', icon: 'client', to: '/dashboard/reports/clients' },
];

// Define common date fields for filtering
const baseDateFields = [
  { name: 'from_date', type: 'date', label: 'من' },
  { name: 'to_date', type: 'date', label: 'إلى' },
];

// Define filter schema for each report type
export const FILTER_SCHEMA = {
  cases: [
    { name: 'client_name', type: 'text', label: 'اسم الموكل' },
    { name: 'file_number', type: 'text', label: 'رقم الملف' },
    { name: 'case_type_id', type: 'select', label: 'نوع القضية' },
    ...baseDateFields,
    { name: 'case_status', type: 'select', label: 'الحالة' },
  ],
  services: [
    { name: 'client_name', type: 'text', label: 'اسم الموكل' },
    { name: 'file_number', type: 'text', label: 'رقم الملف' },
    { name: 'service_type_id', type: 'select', label: 'نوع الخدمة' },
    ...baseDateFields,
    { name: 'service_status', type: 'select', label: 'الحالة' },
  ],
  procedures: [
    { name: 'client_name', type: 'text', label: 'اسم الموكل' },
    { name: 'lawyer_id', type: 'select', label: 'المحامي' },
    { name: 'file_number', type: 'text', label: 'رقم الملف' },
    { name: 'procedure_type_id', type: 'select', label: 'نوع الإجراء' },
    ...baseDateFields,
    { name: 'procedure_status', type: 'select', label: 'الحالة' },
  ],
  sessions: [
    { name: 'client_name', type: 'text', label: 'اسم الموكل' },
    { name: 'lawyer_id', type: 'select', label: 'المحامي' },
    { name: 'file_number', type: 'text', label: 'رقم الملف' },
    { name: 'session_type_id', type: 'select', label: 'نوع الجلسة' },
    ...baseDateFields,
    { name: 'session_status', type: 'select', label: 'الحالة' },
  ],
  clients: [
    { name: 'client_name', type: 'text', label: 'اسم الموكل' },
    ...baseDateFields,
    { name: 'client_status', type: 'select', label: 'الحالة' },
  ],
};

// Get initial filters based on the selected tab
const getInitialFilters = (tabKey) =>
  FILTER_SCHEMA[tabKey].reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
const INITIAL_ROWS_QUERY = {
  limit: 5,
  per_page: 5,
  sort_by: 'created_at',  // Use a valid field
  sort_dir: 'desc',
};
// Check if there are any active filters
const hasActiveFilters = (filters = {}) =>
  Object.values(filters).some((value) => value !== '' && value != null);

// Get request parameters based on filters or fallback to default query
const getRequestParams = (filters) => (hasActiveFilters(filters) ? filters : { ...filters, ...INITIAL_ROWS_QUERY });

// Convert rows to status options based on the tab
const toStatusOptions = (rows, tabKey) => {
  const statusKey = STATUS_KEYS[tabKey];
  if (!statusKey) return [];
  const values = new Set((rows || []).map((row) => row?.status).filter(Boolean));
  return [...values].map((value) => ({ value, label: value }));
};

// Custom hook to fetch report data
export const useReportsQuery = (tabKey) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [metadata, setMetadata] = useState({ lawyers: [], caseTypes: [], serviceTypes: [], procedureTypes: [], sessionTypes: [] });
  const [filters, setFilters] = useState(() => getInitialFilters(tabKey));

  // Function to load report rows based on filters
  const loadRows = useCallback(
    async (nextFilters) => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchReportRows(tabKey, getRequestParams(nextFilters));
        setRows(data);
      } catch (err) {
        setRows([]);
        setError(err?.message || 'حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    },
    [tabKey]
  );

  // Initialize filters and load rows on tab change
  useEffect(() => {
    const initial = getInitialFilters(tabKey);
    setFilters(initial);
    loadRows(initial);
  }, [loadRows, tabKey]);

  // Fetch metadata (e.g., lawyers, case types) when component mounts
  useEffect(() => {
    let mounted = true;
    getReportsMetadata()
      .then((data) => {
        if (mounted) setMetadata(data);
      })
      .catch(() => {
        if (mounted)
          setMetadata({ lawyers: [], caseTypes: [], serviceTypes: [], procedureTypes: [], sessionTypes: [] });
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Prepare filter options based on metadata and rows data
  const options = useMemo(() => {
    const statusOptions = toStatusOptions(rows, tabKey);
    return {
      case_type_id: metadata.caseTypes.map((item) => ({ value: String(item.id), label: item.name })),
      service_type_id: metadata.serviceTypes.map((item) => ({ value: String(item.id), label: item.name })),
      lawyer_id: metadata.lawyers.map((item) => ({ value: String(item.id), label: item.name })),
      procedure_type_id: metadata.procedureTypes.map((item) => ({ value: String(item.id), label: item.name })),
      session_type_id: metadata.sessionTypes.map((item) => ({ value: String(item.id), label: item.name })),
      [STATUS_KEYS.cases]: tabKey === 'cases' ? statusOptions : [],
      [STATUS_KEYS.services]: tabKey === 'services' ? statusOptions : [],
      [STATUS_KEYS.procedures]: tabKey === 'procedures' ? statusOptions : [],
      [STATUS_KEYS.sessions]: tabKey === 'sessions' ? statusOptions : [],
      [STATUS_KEYS.clients]: tabKey === 'clients' ? statusOptions : [],
    };
  }, [metadata, rows, tabKey]);

  // Submit filters and reload rows with new filters
  const submitFilters = useCallback(
    (nextFilters) => {
      setFilters(nextFilters);
      loadRows(nextFilters);
    },
    [loadRows]
  );

  // Reset filters to initial state
  const resetFilters = useCallback(() => {
    const clean = getInitialFilters(tabKey);
    setFilters(clean);
    loadRows(clean);
    return clean;
  }, [loadRows, tabKey]);

  return {
    schema: FILTER_SCHEMA[tabKey],
    filters,
    rows,
    loading,
    error,
    options,
    submitFilters,
    resetFilters,
    retry: () => loadRows(filters),
  };
};