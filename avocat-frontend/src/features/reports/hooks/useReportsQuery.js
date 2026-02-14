import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  fetchReportRows,
  fetchReportsMetadata,
} from '@features/reports/services/reportsApi';
import {
  buildReportsQueryParams,
  parseReportsStateFromSearch,
} from '@features/reports/services/buildReportsQueryParams';
import {
  FILTER_SCHEMA,
  getDefaultReportState,
  getFilterKeysForTab,
} from '@features/reports/services/reportsFilterSchema';

export const REPORT_TABS = [
  {
    key: 'cases',
    label: 'القضايا',
    icon: 'briefcase',
    to: '/dashboard/reports/cases',
  },
  {
    key: 'services',
    label: 'الخدمات',
    icon: 'scales',
    to: '/dashboard/reports/services',
  },
  {
    key: 'procedures',
    label: 'الإجراءات',
    icon: 'document',
    to: '/dashboard/reports/procedures',
  },
  {
    key: 'sessions',
    label: 'الجلسات',
    icon: 'calendar',
    to: '/dashboard/reports/sessions',
  },
  {
    key: 'clients',
    label: 'الموكلين',
    icon: 'client',
    to: '/dashboard/reports/clients',
  },
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

const EMPTY_META = { page: 1, per_page: 20, total: 0, last_page: 1 };

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
  const [metadata, setMetadata] = useState({
    lawyers: [],
    caseTypes: [],
    procedureTypes: [],
    sessionTypes: [],
  });

  const tabSchema = useMemo(
    () =>
      FILTER_SCHEMA[tabKey] || {
        groups: [],
        fields: {},
        layout: [],
        defaultValues: {},
      },
    [tabKey],
  );
  const allowedFilterKeys = useMemo(
    () => getFilterKeysForTab(tabKey),
    [tabKey],
  );

  const defaults = useMemo(() => getDefaultReportState(tabKey), [tabKey]);
  const [queryState, setQueryState] = useState(() =>
    parseReportsStateFromSearch(searchParams, defaults),
  );

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
      .catch(
        () =>
          mounted &&
          setMetadata({
            lawyers: [],
            caseTypes: [],
            procedureTypes: [],
            sessionTypes: [],
          }),
      );

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
      setSearchParams(buildReportsQueryParams(nextState, allowedFilterKeys));
    },
    [allowedFilterKeys, setSearchParams],
  );

  const submitFilters = useCallback(
    (nextFilters) => {
      const sanitizedFilters = Object.fromEntries(
        allowedFilterKeys.map((key) => [key, nextFilters[key] ?? '']),
      );
      const nextState = {
        filters: sanitizedFilters,
        pagination: { ...queryState.pagination, page: 1 },
      };
      setQueryState(nextState);
      syncToUrl(nextState);
      loadRows(nextState);
    },
    [allowedFilterKeys, loadRows, queryState.pagination, syncToUrl],
  );

  const changePage = useCallback(
    (page) => {
      const nextState = {
        ...queryState,
        pagination: { ...queryState.pagination, page },
      };
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
    [
      metadata.caseTypes,
      metadata.lawyers,
      metadata.procedureTypes,
      metadata.sessionTypes,
    ],
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
