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

const metadataDefaults = {
  lawyers: [],
  caseTypes: [],
  procedureTypes: [],
  sessionTypes: [],
};

const asString = (value) => (value == null ? '' : String(value));

const normalizeReportRow = (tabKey, row) => {
  if (!row || typeof row !== 'object') return row;

  if (tabKey === 'cases') {
    return {
      ...row,
      displayTitle: row.title || row.case_title || '-',
      displayFileNumber: row.slug || row.file_number || '-',
      displayClientName: row.client?.name || row.clients?.[0]?.name || '-',
      displayStatus: row.status || row.case_status || '-',
    };
  }

  if (tabKey === 'services') {
    return {
      ...row,
      displayTitle: row.name || row.service_name || '-',
      displayFileNumber: row.file_number || row.legcase?.slug || '-',
      displayClientName: row.client?.name || row.legcase?.client?.name || '-',
      displayStatus: row.status || row.service_status || '-',
    };
  }

  if (tabKey === 'procedures') {
    return {
      ...row,
      displayTitle: row.procedure_type?.name || row.procedure_name || '-',
      displayFileNumber: row.legcase?.slug || row.file_number || '-',
      displayClientName: row.client?.name || row.legcase?.client?.name || '-',
      displayStatus: row.status || row.procedure_status || '-',
    };
  }

  if (tabKey === 'sessions') {
    return {
      ...row,
      displayTitle: row.session_type?.name || row.session_name || '-',
      displayFileNumber: row.legcase?.slug || row.file_number || '-',
      displayClientName: row.client?.name || row.legcase?.client?.name || '-',
      displayStatus: row.status || row.session_status || '-',
    };
  }

  if (tabKey === 'clients') {
    return {
      ...row,
      displayTitle: row.name || '-',
      displayClientType: row.client_type || row.type || '-',
      displayPhone: row.phone || row.mobile || '-',
      displayStatus: row.status || row.client_status || '-',
    };
  }

  return row;
};

const normalizeMetadataRows = (rows) =>
  (rows || []).map((item) => ({
    ...item,
    id: asString(item?.id),
    name: item?.name || item?.title || item?.label || '-',
  }));

export const fetchReportRows = async (tabKey, params = {}) => {
  const response = await api.get(endpoints[tabKey], { params: cleanParams(params) });
  return extractRows(response?.data).map((row) => normalizeReportRow(tabKey, row));
};

export const fetchReportsMetadata = async () => {
  try {
    const [lawyersRes, caseTypesRes, procedureTypesRes, sessionTypesRes] = await Promise.all([
      api.get('/lawyers'),
      api.get('/case_types'),
      api.get('/procedure_types'),
      api.get('/legal_session_types'),
    ]);

    return {
      lawyers: normalizeMetadataRows(extractRows(lawyersRes?.data)),
      caseTypes: normalizeMetadataRows(extractRows(caseTypesRes?.data)),
      procedureTypes: normalizeMetadataRows(extractRows(procedureTypesRes?.data)),
      sessionTypes: normalizeMetadataRows(extractRows(sessionTypesRes?.data)),
    };
  } catch {
    return metadataDefaults;
  }
};

export { metadataDefaults };
