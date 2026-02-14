import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchReportRows, fetchReportsMetadata } from '@features/reports/services/reportsApi';
import { buildReportsQueryParams, parseReportsStateFromSearch } from '@features/reports/services/buildReportsQueryParams';

export const REPORT_TABS = [
  { key: 'cases', label: 'القضايا', icon: 'briefcase', to: '/dashboard/reports/cases' },
  { key: 'services', label: 'الخدمات', icon: 'scales', to: '/dashboard/reports/services' },
  { key: 'procedures', label: 'الإجراءات', icon: 'document', to: '/dashboard/reports/procedures' },
  { key: 'sessions', label: 'الجلسات', icon: 'calendar', to: '/dashboard/reports/sessions' },
  { key: 'clients', label: 'الموكلين', icon: 'client', to: '/dashboard/reports/clients' },
];

const STATIC_OPTIONS = {
  case_status: [
    { value: 'open', label: 'مفتوحة' },
    { value: 'closed', label: 'مغلقة' },
    { value: 'pending', label: 'قيد الانتظار' },
  ],
  service_status: [
    { value: 'active', label: 'نشطة' },
    { value: 'completed', label: 'مكتملة' },
    { value: 'cancelled', label: 'ملغية' },
  ],
  procedure_status: [
    { value: 'active', label: 'نشط' },
    { value: 'completed', label: 'مكتمل' },
    { value: 'postponed', label: 'مؤجل' },
  ],
  session_status: [
    { value: 'scheduled', label: 'مجدولة' },
    { value: 'completed', label: 'منتهية' },
    { value: 'adjourned', label: 'مؤجلة' },
  ],
  client_type: [
    { value: 'without_attorney', label: 'بدون توكيل' },
    { value: 'with_attorney', label: 'بوكالة' },
  ],
  client_status: [
    { value: 'active', label: 'نشط' },
    { value: 'inactive', label: 'غير نشط' },
  ],
};

const FIELD_DEFINITIONS = {
  client_name: { label: 'اسم الموكل', type: 'text' },
  file_number: { label: 'رقم الملف', type: 'text' },
  case_type_id: { label: 'انواع القضايا', type: 'select' },
  from_date: { label: 'من', type: 'date' },
  to_date: { label: 'إلى', type: 'date' },
  case_status: { label: 'حالة القضية', type: 'select' },
  service_status: { label: 'حالة الخدمة', type: 'select' },
  lawyer_id: { label: 'المحامين', type: 'select' },
  procedure_type_id: { label: 'انواع الإجراءات', type: 'select' },
  procedure_status: { label: 'حالة الإجراء', type: 'select' },
  session_type_id: { label: 'انواع الجلسات', type: 'select' },
  session_status: { label: 'حالة الجلسة', type: 'select' },
  client_type: { label: 'انواع الموكلين', type: 'select' },
  client_status: { label: 'حالة الموكل', type: 'select' },
};

export const FILTER_SCHEMA = {
  cases: {
    groups: [
      { title: 'بيانات أساسية', fields: ['client_name', 'file_number'] },
      { title: 'تصنيف وحالة', fields: ['case_type_id', 'case_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'case_type_id'],
      ['case_status', 'from_date', 'to_date'],
    ],
  },
  services: {
    groups: [
      { title: 'بيانات أساسية', fields: ['client_name', 'file_number'] },
      { title: 'تصنيف وحالة', fields: ['case_type_id', 'service_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'case_type_id'],
      ['service_status', 'from_date', 'to_date'],
    ],
  },
  procedures: {
    groups: [
      { title: 'بيانات أساسية', fields: ['client_name', 'file_number'] },
      { title: 'التكليف', fields: ['lawyer_id'] },
      { title: 'النوع والحالة', fields: ['procedure_type_id', 'procedure_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'lawyer_id'],
      ['procedure_type_id', 'procedure_status', 'from_date'],
      ['to_date'],
    ],
  },
  sessions: {
    groups: [
      { title: 'بيانات أساسية', fields: ['client_name', 'file_number'] },
      { title: 'التكليف', fields: ['lawyer_id'] },
      { title: 'النوع والحالة', fields: ['session_type_id', 'session_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'lawyer_id'],
      ['session_type_id', 'session_status', 'from_date'],
      ['to_date'],
    ],
  },
  clients: {
    groups: [
      { title: 'بيانات الموكل', fields: ['client_type', 'client_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_type', 'client_status', 'from_date'],
      ['to_date'],
    ],
  },
};

const EMPTY_META = { page: 1, per_page: 20, total: 0, last_page: 1 };

const getDefaultState = (tabKey) => {
  const fieldNames = FILTER_SCHEMA[tabKey]?.layout.flat() || [];
  const filters = Object.fromEntries(fieldNames.map((field) => [field, '']));

  return {
    filters,
    pagination: { page: 1, per_page: 20 },
  };
};

const mapToSelectOptions = (items, labelKey = 'name') =>
  items.map((item) => ({
    value: String(item.id),
    label: item[labelKey] || item.name || item.title || `#${item.id}`,
  }));

export const useReportsQuery = (tabKey) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(EMPTY_META);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [metadata, setMetadata] = useState({ lawyers: [], caseTypes: [], procedureTypes: [], sessionTypes: [] });

  const tabSchema = useMemo(() => {
    const schema = FILTER_SCHEMA[tabKey];
    if (!schema) return { groups: [], fields: {}, layout: [] };

    const usedFieldNames = [...new Set(schema.layout.flat())];
    const fields = Object.fromEntries(usedFieldNames.map((field) => [field, FIELD_DEFINITIONS[field]]));

    return {
      ...schema,
      fields,
    };
  }, [tabKey]);

  const defaults = useMemo(() => getDefaultState(tabKey), [tabKey]);
  const [queryState, setQueryState] = useState(() => parseReportsStateFromSearch(searchParams, defaults));

  useEffect(() => {
    setQueryState(parseReportsStateFromSearch(searchParams, defaults));
  }, [defaults, searchParams]);

  useEffect(() => {
    let mounted = true;
    fetchReportsMetadata()
      .then((data) => {
        if (mounted) {
          setMetadata({
            lawyers: data.lawyers || [],
            caseTypes: data.caseTypes || [],
            procedureTypes: data.procedureTypes || [],
            sessionTypes: data.sessionTypes || [],
          });
        }
      })
      .catch(() => mounted && setMetadata({ lawyers: [], caseTypes: [], procedureTypes: [], sessionTypes: [] }));

    return () => {
      mounted = false;
    };
  }, []);

  const loadRows = useCallback(
    async (nextState) => {
      setLoading(true);
      setError('');
      setHasSearched(true);
      try {
        const result = await fetchReportRows(tabKey, nextState);
        setRows(result.data || []);
        setMeta(result.meta || EMPTY_META);
      } catch (err) {
        setRows([]);
        setMeta(EMPTY_META);
        setError(err?.message || 'حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    },
    [tabKey],
  );

  const syncToUrl = useCallback(
    (nextState) => {
      setSearchParams(buildReportsQueryParams(nextState));
    },
    [setSearchParams],
  );

  const submitFilters = useCallback(
    (nextFilters) => {
      const nextState = {
        filters: nextFilters,
        pagination: { ...queryState.pagination, page: 1 },
      };
      setQueryState(nextState);
      syncToUrl(nextState);
      loadRows(nextState);
    },
    [loadRows, queryState.pagination, syncToUrl],
  );

  const changePage = useCallback(
    (page) => {
      const nextState = { ...queryState, pagination: { ...queryState.pagination, page } };
      setQueryState(nextState);
      syncToUrl(nextState);
      loadRows(nextState);
    },
    [loadRows, queryState, syncToUrl],
  );

  const resetFilters = useCallback(() => {
    setQueryState(defaults);
    syncToUrl(defaults);
    loadRows(defaults);
    return defaults.filters;
  }, [defaults, loadRows, syncToUrl]);

  const options = useMemo(
    () => ({
      case_type_id: mapToSelectOptions(metadata.caseTypes),
      lawyer_id: mapToSelectOptions(metadata.lawyers),
      procedure_type_id: mapToSelectOptions(metadata.procedureTypes),
      session_type_id: mapToSelectOptions(metadata.sessionTypes),
      ...STATIC_OPTIONS,
    }),
    [metadata.caseTypes, metadata.lawyers, metadata.procedureTypes, metadata.sessionTypes],
  );

  return {
    tabSchema,
    filters: queryState.filters,
    rows,
    meta,
    loading,
    error,
    hasSearched,
    options,
    submitFilters,
    resetFilters,
    changePage,
    retry: () => loadRows(queryState),
  };
};
