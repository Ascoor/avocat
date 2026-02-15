import api from '@shared/services/api/axiosConfig';

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

const endpoints = {
  cases: '/legal-cases',
  services: '/services',
  procedures: '/procedures',
  sessions: '/legal_sessions',
  clients: '/clients',
};

export const fetchReportRows = async (tabKey, params = {}) => {
  const response = await api.get(endpoints[tabKey], { params: cleanParams(params) });
  return extractRows(response?.data);
};

export const fetchReportsMetadata = async () => {
  const [lawyersRes, caseTypesRes, procedureTypesRes, sessionTypesRes] = await Promise.all([
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
