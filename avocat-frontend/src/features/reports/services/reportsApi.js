import api from '@shared/services/api/axiosConfig';
import { buildReportsQueryParams } from '@features/reports/services/buildReportsQueryParams';
import { normalizeReportRow } from '@features/reports/services/reportRowNormalizer';

const COLLECTION_KEYS = ['data', 'rows', 'clients', 'services', 'procedures', 'legalSessions', 'sessions', 'cases', 'leg_cases'];

const REPORT_ENDPOINTS = {
  cases: '/legal-cases',
  services: '/services',
  procedures: '/procedures-search',
  sessions: '/legal_sessions',
  clients: '/clients',
};

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of COLLECTION_KEYS) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  const firstArrayValue = Object.values(payload).find((value) => Array.isArray(value));
  return Array.isArray(firstArrayValue) ? firstArrayValue : [];
};

const extractMeta = (payload, fallbackCount, page, perPage) => {
  const meta = payload?.meta || {};
  const total = Number(meta.total ?? fallbackCount);
  const safePerPage = Number(meta.per_page ?? perPage ?? 20);
  const safePage = Number(meta.page ?? page ?? 1);
  return {
    page: safePage,
    per_page: safePerPage,
    total,
    last_page: Number(meta.last_page ?? Math.max(1, Math.ceil(total / safePerPage))),
  };
};

const applyLocalContract = (rows, queryState) => {
  const { sort, pagination } = queryState;
  const direction = sort.sort_dir === 'asc' ? 1 : -1;
  const sorted = [...rows].sort((a, b) => {
    const left = String(a?.[sort.sort_by] ?? a?.row_date ?? '');
    const right = String(b?.[sort.sort_by] ?? b?.row_date ?? '');
    return left.localeCompare(right, 'ar', { numeric: true }) * direction;
  });

  const total = sorted.length;
  const start = (pagination.page - 1) * pagination.per_page;
  const data = sorted.slice(start, start + pagination.per_page);
  const statuses = [...new Set(rows.map((item) => item?.status).filter(Boolean))].map((value) => ({ value, label: value }));

  return {
    data,
    meta: {
      page: pagination.page,
      per_page: pagination.per_page,
      total,
      last_page: Math.max(1, Math.ceil(total / pagination.per_page)),
    },
    facets: { statuses },
  };
};

export const fetchReportRows = async (tabKey, queryState) => {
  const endpoint = REPORT_ENDPOINTS[tabKey];
  const params = buildReportsQueryParams(queryState);
  const response = await api.get(endpoint, { params });

  const payload = response?.data || {};
  const normalizedRows = extractRows(payload).map((row) => normalizeReportRow(tabKey, row));

  if (payload?.meta) {
    return {
      data: normalizedRows,
      meta: extractMeta(payload, normalizedRows.length, queryState.pagination.page, queryState.pagination.per_page),
      facets: payload?.facets || {},
    };
  }

  return applyLocalContract(normalizedRows, queryState);
};

export const fetchReportsMetadata = async () => {
  const [lawyersRes, caseTypesRes, serviceTypesRes, procedureTypesRes, sessionTypesRes, courtsRes] = await Promise.all([
    api.get('/lawyers'),
    api.get('/case_types'),
    api.get('/service-types'),
    api.get('/procedure_types'),
    api.get('/legal_session_types'),
    api.get('/courts'),
  ]);

  return {
    lawyers: extractRows(lawyersRes?.data),
    caseTypes: extractRows(caseTypesRes?.data),
    serviceTypes: extractRows(serviceTypesRes?.data),
    procedureTypes: extractRows(procedureTypesRes?.data),
    sessionTypes: extractRows(sessionTypesRes?.data),
    courts: extractRows(courtsRes?.data),
  };
};
