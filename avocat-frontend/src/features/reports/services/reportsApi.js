import api from '@shared/services/api/axiosConfig';
import { getLookups } from '@shared/services/api/lookups';

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.rows)) return payload.rows;
  if (payload.data && typeof payload.data === 'object') {
    if (Array.isArray(payload.data.data)) return payload.data.data;
    if (Array.isArray(payload.data.rows)) return payload.data.rows;
  }
  return [];
};

const cleanParams = (params) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value != null));

const DEFAULT_SORT = {
  sort_by: 'updated_at',
  sort_dir: 'desc',
};

const endpoints = {
  cases: {
    path: '/cases/search',
    buildParams: (filters = {}) =>
      cleanParams({
        q: filters.file_number || filters.client_name,
        client_name: filters.client_name,
        status: filters.case_status,
        from_date: filters.from_date,
        to_date: filters.to_date,
        procedure_type: filters.procedure_type_id,
        session_type: filters.session_type_id,
        limit: filters.limit,
        per_page: filters.per_page,
      }),
  },
  services: {
    path: '/services',
    buildParams: (filters = {}) =>
      cleanParams({
        report_mode: 1,
        ...DEFAULT_SORT,
        client_name: filters.client_name,
        service_type_id: filters.service_type_id,
        service_status: filters.service_status,
        from_date: filters.from_date,
        to_date: filters.to_date,
        limit: filters.limit,
        per_page: filters.per_page,
      }),
  },
  procedures: {
    path: '/procedures-search',
    buildParams: (filters = {}) =>
      cleanParams({
        q: filters.client_name,
        sort_by: 'updated_at',
        sort_dir: 'desc',
        'filters[file_no]': filters.file_number,
        'filters[date_from]': filters.from_date,
        'filters[date_to]': filters.to_date,
        'filters[lawyer_id]': filters.lawyer_id,
        'filters[status]': filters.procedure_status,
        limit: filters.limit,
        per_page: filters.per_page,
      }),
  },
  sessions: {
    path: '/legal_sessions',
    buildParams: (filters = {}) =>
      cleanParams({
        report_mode: 1,
        ...DEFAULT_SORT,
        client_name: filters.client_name,
        lawyer_id: filters.lawyer_id,
        session_type_id: filters.session_type_id,
        session_status: filters.session_status,
        from_date: filters.from_date,
        to_date: filters.to_date,
        limit: filters.limit,
        per_page: filters.per_page,
      }),
  },
  clients: {
    path: '/clients',
    buildParams: (filters = {}) =>
      cleanParams({
        ...DEFAULT_SORT,
        client_name: filters.client_name,
        client_status: filters.client_status,
        from_date: filters.from_date,
        to_date: filters.to_date,
        limit: filters.limit,
        per_page: filters.per_page,
      }),
  },
};

export const fetchReportRows = async (tabKey, params = {}) => {
  const endpoint = endpoints[tabKey];
  if (!endpoint) return [];
  const response = await api.get(endpoint.path, { params: endpoint.buildParams(params) });
  return extractRows(response?.data);
};

export const fetchReportsOverview = async () => {
  const tabs = Object.keys(endpoints);
  const requests = tabs.map((tabKey) =>
    fetchReportRows(tabKey, {
      limit: 4,
      sort_by: 'updated_at',
      sort_direction: 'desc',
    }).then((rows) => [tabKey, rows]),
  );

  const entries = await Promise.all(requests);
  return Object.fromEntries(entries);
};

export const fetchReportsMetadata = async () => {
  const requests = await Promise.allSettled([
    api.get('/lawyers').then((res) => extractRows(res?.data)),
    getLookups({ entity: 'case_types' }),
    api.get('/service-types').then((res) => extractRows(res?.data)),
    getLookups({ entity: 'procedure_types' }),
    api.get('/legal_session_types').then((res) => extractRows(res?.data)),
  ]);

  const resolveRows = (index) => (requests[index].status === 'fulfilled' ? requests[index].value : []);

  return {
    lawyers: resolveRows(0),
    caseTypes: resolveRows(1),
    serviceTypes: resolveRows(2),
    procedureTypes: resolveRows(3),
    sessionTypes: resolveRows(4),
  };
};

const metadataCache = {
  data: null,
  promise: null,
};

const defaultMetadata = {
  lawyers: [],
  caseTypes: [],
  serviceTypes: [],
  procedureTypes: [],
  sessionTypes: [],
};

export const getReportsMetadata = async ({ force = false } = {}) => {
  if (!force && metadataCache.data) {
    return metadataCache.data;
  }

  if (!force && metadataCache.promise) {
    return metadataCache.promise;
  }

  metadataCache.promise = fetchReportsMetadata()
    .then((data) => {
      metadataCache.data = data;
      return data;
    })
    .catch(() => defaultMetadata)
    .finally(() => {
      metadataCache.promise = null;
    });

  return metadataCache.promise;
};
