import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchReportRows, fetchReportsMetadata } from '@features/reports/services/reportsApi';

const STATUS_KEYS = {
  cases: 'case_status',
  services: 'service_status',
  procedures: 'procedure_status',
  sessions: 'session_status',
  clients: 'client_status',
};

export const REPORT_TABS = [
  { key: 'cases', label: 'القضايا', icon: 'briefcase', to: '/dashboard/reports/cases' },
  { key: 'services', label: 'الخدمات', icon: 'scales', to: '/dashboard/reports/services' },
  { key: 'procedures', label: 'الإجراءات', icon: 'document', to: '/dashboard/reports/procedures' },
  { key: 'sessions', label: 'الجلسات', icon: 'calendar', to: '/dashboard/reports/sessions' },
  { key: 'clients', label: 'الموكلين', icon: 'client', to: '/dashboard/reports/clients' },
];

const baseDateFields = [
  { name: 'from_date', type: 'date', label: 'من' },
  { name: 'to_date', type: 'date', label: 'إلى' },
];

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
    { name: 'case_type_id', type: 'select', label: 'نوع الخدمة' },
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
    { name: 'client_type', type: 'select', label: 'نوع الموكل' },
    ...baseDateFields,
    { name: 'client_status', type: 'select', label: 'الحالة' },
  ],
};

const getInitialFilters = (tabKey) =>
  FILTER_SCHEMA[tabKey].reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});

const toStatusOptions = (rows, tabKey) => {
  const statusKey = STATUS_KEYS[tabKey];
  if (!statusKey) return [];
  const values = new Set((rows || []).map((row) => row?.status).filter(Boolean));
  return [...values].map((value) => ({ value, label: value }));
};

export const useReportsQuery = (tabKey) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [metadata, setMetadata] = useState({ lawyers: [], caseTypes: [], procedureTypes: [], sessionTypes: [] });
  const [filters, setFilters] = useState(() => getInitialFilters(tabKey));

  const loadRows = useCallback(
    async (nextFilters) => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchReportRows(tabKey, nextFilters);
        setRows(data);
      } catch (err) {
        setRows([]);
        setError(err?.message || 'حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    },
    [tabKey],
  );

  useEffect(() => {
    const initial = getInitialFilters(tabKey);
    setFilters(initial);
    loadRows(initial);
  }, [loadRows, tabKey]);

  useEffect(() => {
    let mounted = true;
    fetchReportsMetadata()
      .then((data) => {
        if (mounted) setMetadata(data);
      })
      .catch(() => {
        if (mounted) setMetadata({ lawyers: [], caseTypes: [], procedureTypes: [], sessionTypes: [] });
      });
    return () => {
      mounted = false;
    };
  }, []);

  const options = useMemo(() => {
    const statusOptions = toStatusOptions(rows, tabKey);
    return {
      case_type_id: metadata.caseTypes.map((item) => ({ value: String(item.id), label: item.name })),
      lawyer_id: metadata.lawyers.map((item) => ({ value: String(item.id), label: item.name })),
      procedure_type_id: metadata.procedureTypes.map((item) => ({ value: String(item.id), label: item.name })),
      session_type_id: metadata.sessionTypes.map((item) => ({ value: String(item.id), label: item.name })),
      client_type: [
        { value: 'without_authorization', label: 'بدون توكيل' },
        { value: 'authorized', label: 'بوكالة' },
      ],
      [STATUS_KEYS.cases]: tabKey === 'cases' ? statusOptions : [],
      [STATUS_KEYS.services]: tabKey === 'services' ? statusOptions : [],
      [STATUS_KEYS.procedures]: tabKey === 'procedures' ? statusOptions : [],
      [STATUS_KEYS.sessions]: tabKey === 'sessions' ? statusOptions : [],
      [STATUS_KEYS.clients]: tabKey === 'clients' ? statusOptions : [],
    };
  }, [metadata, rows, tabKey]);

  const submitFilters = useCallback(
    (nextFilters) => {
      setFilters(nextFilters);
      loadRows(nextFilters);
    },
    [loadRows],
  );

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
