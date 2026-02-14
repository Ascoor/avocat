import api from '@shared/services/api/axiosConfig';
import { buildReportsQueryParams } from '@features/reports/services/buildReportsQueryParams';
import { getFilterKeysForTab } from '@features/reports/services/reportsFilterSchema';
import { normalizeReportRow } from '@features/reports/services/reportRowNormalizer';

const COLLECTION_KEYS = [
  'data',
  'rows',
  'clients',
  'services',
  'procedures',
  'legalSessions',
  'sessions',
  'cases',
  'leg_cases',
];

const REPORT_ENDPOINTS = {
  cases: '/api/reports/cases',
  services: '/api/reports/services',
  procedures: '/api/reports/procedures',
  sessions: '/api/reports/sessions',
  clients: '/api/reports/clients',
};

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of COLLECTION_KEYS) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  const firstArrayValue = Object.values(payload).find((value) =>
    Array.isArray(value),
  );
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
    last_page: Number(
      meta.last_page ?? Math.max(1, Math.ceil(total / safePerPage)),
    ),
  };
};

const applyLocalContract = (rows, queryState) => {
  const total = rows.length;
  const start =
    (queryState.pagination.page - 1) * queryState.pagination.per_page;
  const data = rows.slice(start, start + queryState.pagination.per_page);

  return {
    data,
    meta: {
      page: queryState.pagination.page,
      per_page: queryState.pagination.per_page,
      total,
      last_page: Math.max(1, Math.ceil(total / queryState.pagination.per_page)),
    },
  };
};

export const fetchReportRows = async (tabKey, queryState) => {
  const endpoint = REPORT_ENDPOINTS[tabKey];
  const params = buildReportsQueryParams(
    queryState,
    getFilterKeysForTab(tabKey),
  );
  const response = await api.get(endpoint, { params });

  const payload = response?.data || {};
  const normalizedRows = extractRows(payload).map((row) =>
    normalizeReportRow(tabKey, row),
  );

  if (payload?.meta) {
    return {
      data: normalizedRows,
      meta: extractMeta(
        payload,
        normalizedRows.length,
        queryState.pagination.page,
        queryState.pagination.per_page,
      ),
    };
  }

  return applyLocalContract(normalizedRows, queryState);
};

export const fetchReportsMetadata = async () => {
  const [lawyersRes, caseTypesRes, procedureTypesRes, sessionTypesRes] =
    await Promise.all([
      api.get('/lawyers'),
      api.get('/case_types'),
      api.get('/procedure_types'),
      api.get('/legal_session_types'),
    ]);

  return {
    lawyers: extractRows(lawyersRes?.data),
    caseTypes: extractRows(caseTypesRes?.data),
    procedureTypes: extractRows(procedureTypesRes?.data),
    sessionTypes: extractRows(sessionTypesRes?.data),
  };
};
