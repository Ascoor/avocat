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

const BASE_FILTERS = ['case_slug', 'file_no', 'date_from', 'date_to', 'court_id', 'status', 'lawyer_id', 'client_id', 'service_id'];

const FILTER_REGISTRY = {
  cases: ['case_slug', 'file_no', 'date_from', 'date_to', 'court_id', 'status', 'client_id'],
  services: ['case_slug', 'file_no', 'date_from', 'date_to', 'status', 'lawyer_id', 'client_id', 'service_id'],
  procedures: ['case_slug', 'file_no', 'date_from', 'date_to', 'court_id', 'status', 'lawyer_id', 'client_id'],
  sessions: ['case_slug', 'file_no', 'date_from', 'date_to', 'court_id', 'status', 'lawyer_id', 'client_id'],
  clients: ['file_no', 'date_from', 'date_to', 'status', 'client_id'],
};

const FILTER_LABELS = {
  case_slug: 'رقم الملف',
  file_no: 'رقم الملف البديل',
  date_from: 'من',
  date_to: 'إلى',
  court_id: 'المحكمة',
  status: 'الحالة',
  lawyer_id: 'المحامي',
  client_id: 'الموكل',
  service_id: 'الخدمة',
};

const FILTER_TYPE = (name) => (name.includes('date') ? 'date' : name.endsWith('_id') || name === 'status' ? 'select' : 'text');

const getInitialFilters = (tabKey) => Object.fromEntries((FILTER_REGISTRY[tabKey] || BASE_FILTERS).map((key) => [key, '']));

export const useReportsQuery = (tabKey) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, per_page: 20, total: 0, last_page: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [metadata, setMetadata] = useState({ lawyers: [], caseTypes: [], serviceTypes: [], procedureTypes: [], sessionTypes: [], courts: [] });

  const defaults = useMemo(
    () => ({
      q: '',
      filters: getInitialFilters(tabKey),
      sort: { sort_by: 'created_at', sort_dir: 'desc' },
      pagination: { page: 1, per_page: 20 },
    }),
    [tabKey],
  );

  const [queryState, setQueryState] = useState(() => parseReportsStateFromSearch(searchParams, defaults));

  useEffect(() => {
    setQueryState(parseReportsStateFromSearch(searchParams, defaults));
  }, [defaults, searchParams, tabKey]);

  useEffect(() => {
    let mounted = true;
    fetchReportsMetadata()
      .then((data) => mounted && setMetadata(data))
      .catch(() => mounted && setMetadata({ lawyers: [], caseTypes: [], serviceTypes: [], procedureTypes: [], sessionTypes: [], courts: [] }));
    return () => {
      mounted = false;
    };
  }, []);

  const loadRows = useCallback(async (nextState) => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      const result = await fetchReportRows(tabKey, nextState);
      setRows(result.data || []);
      setMeta(result.meta || { page: 1, per_page: 20, total: 0, last_page: 1 });
    } catch (err) {
      setRows([]);
      setMeta({ page: 1, per_page: 20, total: 0, last_page: 1 });
      setError(err?.message || 'حدث خطأ أثناء تحميل البيانات');
    } finally {
      setLoading(false);
    }
  }, [tabKey]);

  const syncToUrl = useCallback((nextState) => {
    const built = buildReportsQueryParams(nextState);
    setSearchParams(built);
  }, [setSearchParams]);

  const submitFilters = useCallback((payload) => {
    const nextState = {
      ...queryState,
      q: payload.q || '',
      filters: payload.filters,
      sort: payload.sort,
      pagination: { ...payload.pagination, page: 1 },
    };
    setQueryState(nextState);
    syncToUrl(nextState);
    loadRows(nextState);
  }, [loadRows, queryState, syncToUrl]);

  const changePage = useCallback((page) => {
    const nextState = { ...queryState, pagination: { ...queryState.pagination, page } };
    setQueryState(nextState);
    syncToUrl(nextState);
    loadRows(nextState);
  }, [loadRows, queryState, syncToUrl]);

  const resetFilters = useCallback(() => {
    setQueryState(defaults);
    setRows([]);
    setMeta({ page: 1, per_page: 20, total: 0, last_page: 1 });
    setHasSearched(false);
    setError('');
    setLoading(false);
    setSearchParams({});
    return defaults;
  }, [defaults, setSearchParams]);

  const schema = useMemo(
    () =>
      (FILTER_REGISTRY[tabKey] || BASE_FILTERS).map((name) => ({
        name,
        type: FILTER_TYPE(name),
        label: FILTER_LABELS[name] || name,
      })),
    [tabKey],
  );

  const options = useMemo(() => ({
    lawyer_id: metadata.lawyers.map((item) => ({ value: String(item.id), label: item.name })),
    court_id: metadata.courts.map((item) => ({ value: String(item.id), label: item.name })),
    status: [...new Set(rows.map((item) => item.status).filter(Boolean))].map((value) => ({ value, label: value })),
  }), [metadata.courts, metadata.lawyers, rows]);

  return {
    schema,
    queryState,
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
