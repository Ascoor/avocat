import api from '@shared/services/api/axiosConfig';

const COLLECTION_KEYS = ['data', 'rows', 'clients', 'services', 'procedures', 'legalSessions', 'sessions', 'cases', 'leg_cases'];

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of COLLECTION_KEYS) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  if (payload.data && typeof payload.data === 'object') {
    for (const key of COLLECTION_KEYS) {
      if (Array.isArray(payload.data[key])) return payload.data[key];
    }
  }

  const firstArrayValue = Object.values(payload).find((value) => Array.isArray(value));
  return Array.isArray(firstArrayValue) ? firstArrayValue : [];
};

const cleanParams = (params) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value != null));

const includesText = (source, term) => String(source || '').toLowerCase().includes(String(term || '').trim().toLowerCase());

const inDateRange = (value, fromDate, toDate) => {
  if (!value) return false;
  const valueDate = new Date(value);
  if (Number.isNaN(valueDate.getTime())) return false;

  if (fromDate) {
    const from = new Date(`${fromDate}T00:00:00`);
    if (!Number.isNaN(from.getTime()) && valueDate < from) return false;
  }

  if (toDate) {
    const to = new Date(`${toDate}T23:59:59`);
    if (!Number.isNaN(to.getTime()) && valueDate > to) return false;
  }

  return true;
};


const resolveLegCase = (row) => row?.leg_case || row?.legcase || row?.legCase || null;

const normalizeRow = (tabKey, row) => {
  if (tabKey === 'cases') {
    return {
      id: row?.id,
      title: row?.title || '-',
      slug: row?.slug || row?.file_number || '-',
      client_name: row?.client?.name || row?.clients?.[0]?.name || '-',
      status: row?.status || '-',
      type_id: row?.case_type_id || row?.caseType?.id || row?.caseSubType?.case_type_id || '',
      type_name: row?.caseSubType?.name || row?.caseType?.name || '-',
      row_date: row?.created_at || row?.updated_at || null,
      _raw: row,
    };
  }

  if (tabKey === 'services') {
    const legCase = resolveLegCase(row);
    return {
      id: row?.id,
      title: row?.description || row?.serviceType?.name || '-',
      slug: row?.slug || legCase?.slug || row?.file_number || '-',
      client_name: row?.client?.name || row?.clients?.[0]?.name || row?.unclients?.[0]?.name || '-',
      status: row?.status || '-',
      type_id: row?.service_type_id || row?.serviceType?.id || '',
      type_name: row?.serviceType?.name || '-',
      row_date: row?.created_at || row?.updated_at || null,
      _raw: row,
    };
  }

  if (tabKey === 'procedures') {
    const legCase = resolveLegCase(row);
    return {
      id: row?.id,
      title: row?.procedure_type?.name || row?.procedureType?.name || row?.job || '-',
      slug: legCase?.slug || row?.slug || '-',
      client_name: row?.client?.name || legCase?.clients?.[0]?.name || '-',
      status: row?.status || '-',
      type_id: row?.procedure_type_id || row?.procedure_type?.id || row?.procedureType?.id || '',
      type_name: row?.procedure_type?.name || row?.procedureType?.name || '-',
      lawyer_id: row?.lawyer_id || row?.lawyer?.id || '',
      row_date: row?.date_start || row?.date_end || row?.created_at || null,
      legcase_id: row?.legcase_id || row?.leg_case_id || legCase?.id || null,
      _raw: row,
    };
  }

  if (tabKey === 'sessions') {
    const legCase = resolveLegCase(row);
    return {
      id: row?.id,
      title: row?.session_type?.name || row?.legalSessionType?.name || row?.court_session || '-',
      slug: legCase?.slug || row?.slug || '-',
      client_name: row?.client?.name || legCase?.clients?.[0]?.name || '-',
      status: row?.status || '-',
      type_id: row?.session_type_id || row?.legal_session_type_id || row?.session_type?.id || row?.legalSessionType?.id || '',
      type_name: row?.session_type?.name || row?.legalSessionType?.name || '-',
      lawyer_id: row?.lawyer_id || row?.lawyer?.id || '',
      row_date: row?.session_date || row?.created_at || null,
      legcase_id: row?.legcase_id || row?.leg_case_id || legCase?.id || null,
      _raw: row,
    };
  }

  return {
    id: row?.id,
    slug: row?.slug || '-',
    name: row?.name || '-',
    client_name: row?.name || '-',
    client_type: row?.client_type || '-',
    status: row?.status || '-',
    phone_number: row?.phone_number || row?.phone || '-',
    row_date: row?.created_at || row?.updated_at || null,
    _raw: row,
  };
};

const filterRows = (rows, params) => {
  const {
    slug,
    client_name: clientName,
    case_type_id: caseTypeId,
    service_type_id: serviceTypeId,
    lawyer_id: lawyerId,
    procedure_type_id: procedureTypeId,
    session_type_id: sessionTypeId,
    client_type: clientType,
    case_status: caseStatus,
    service_status: serviceStatus,
    procedure_status: procedureStatus,
    session_status: sessionStatus,
    client_status: clientStatus,
    from_date: fromDate,
    to_date: toDate,
  } = params;

  return rows.filter((row) => {
    if (slug && !includesText(row?.slug, slug)) return false;
    if (clientName && !includesText(row?.client_name, clientName)) return false;

    if (caseTypeId && String(row?.type_id || '') !== String(caseTypeId)) return false;
    if (serviceTypeId && String(row?.type_id || '') !== String(serviceTypeId)) return false;
    if (procedureTypeId && String(row?.type_id || '') !== String(procedureTypeId)) return false;
    if (sessionTypeId && String(row?.type_id || '') !== String(sessionTypeId)) return false;

    if (lawyerId && String(row?.lawyer_id || '') !== String(lawyerId)) return false;
    if (clientType && String(row?.client_type || '') !== String(clientType)) return false;

    const status = String(row?.status || '');
    if (caseStatus && status !== String(caseStatus)) return false;
    if (serviceStatus && status !== String(serviceStatus)) return false;
    if (procedureStatus && status !== String(procedureStatus)) return false;
    if (sessionStatus && status !== String(sessionStatus)) return false;
    if (clientStatus && status !== String(clientStatus)) return false;

    if ((fromDate || toDate) && !inDateRange(row?.row_date, fromDate, toDate)) return false;

    return true;
  });
};

const endpoints = {
  cases: '/legal-cases',
  services: '/services',
  procedures: '/procedures-search',
  sessions: '/legal_sessions',
  clients: '/clients',
};

const buildBackendRequest = (tabKey, params) => {
  if (tabKey === 'procedures') {
    return {
      endpoint: endpoints[tabKey],
      params: cleanParams({
        procedure_type_id: params.procedure_type_id,
        lawyer_id: params.lawyer_id,
        date_start: params.from_date,
        date_end: params.to_date,
      }),
    };
  }

  const BACKEND_SAFE_FILTERS = {
    cases: ['slug', 'client_name'],
    services: ['slug', 'client_name'],
    sessions: [],
    clients: ['slug', 'client_name'],
  };

  const allowedKeys = BACKEND_SAFE_FILTERS[tabKey] || [];
  return {
    endpoint: endpoints[tabKey],
    params: Object.fromEntries(Object.entries(params).filter(([key]) => allowedKeys.includes(key))),
  };
};

export const fetchReportRows = async (tabKey, params = {}) => {
  const sanitizedParams = cleanParams(params);
  const backendRequest = buildBackendRequest(tabKey, sanitizedParams);
  const response = await api.get(backendRequest.endpoint, { params: backendRequest.params });
  const rows = extractRows(response?.data).map((row) => normalizeRow(tabKey, row));
  return filterRows(rows, sanitizedParams);
};

export const fetchReportsMetadata = async () => {
  const [lawyersRes, caseTypesRes, serviceTypesRes, procedureTypesRes, sessionTypesRes] = await Promise.all([
    api.get('/lawyers'),
    api.get('/case_types'),
    api.get('/service-types'),
    api.get('/procedure_types'),
    api.get('/legal_session_types'),
  ]);

  return {
    lawyers: extractRows(lawyersRes?.data),
    caseTypes: extractRows(caseTypesRes?.data),
    serviceTypes: extractRows(serviceTypesRes?.data),
    procedureTypes: extractRows(procedureTypesRes?.data),
    sessionTypes: extractRows(sessionTypesRes?.data),
  };
};
