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

const filterByTab = (rows, params) => {
  const {
    slug,
    client_name: clientName,
    case_type_id: caseTypeId,
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
    if (slug) {
      const rowSlug = row?.slug || row?.file_number || row?.legcase?.slug || row?.legCase?.slug;
      if (!includesText(rowSlug, slug)) return false;
    }

    if (clientName) {
      const rowClientName = row?.client?.name || row?.name || row?.clients?.[0]?.name || '';
      if (!includesText(rowClientName, clientName)) return false;
    }

    if (caseTypeId) {
      const rowCaseType = row?.case_type_id || row?.caseType?.id || row?.service_type_id;
      if (String(rowCaseType || '') !== String(caseTypeId)) return false;
    }

    if (lawyerId) {
      const rowLawyerId = row?.lawyer_id || row?.lawyer?.id;
      if (String(rowLawyerId || '') !== String(lawyerId)) return false;
    }

    if (procedureTypeId) {
      const rowProcedureType = row?.procedure_type_id || row?.procedure_type?.id;
      if (String(rowProcedureType || '') !== String(procedureTypeId)) return false;
    }

    if (sessionTypeId) {
      const rowSessionType = row?.session_type_id || row?.session_type?.id;
      if (String(rowSessionType || '') !== String(sessionTypeId)) return false;
    }

    if (clientType && String(row?.client_type || '') !== String(clientType)) return false;

    const rowStatus = row?.status || '';
    if (caseStatus && String(rowStatus) !== String(caseStatus)) return false;
    if (serviceStatus && String(rowStatus) !== String(serviceStatus)) return false;
    if (procedureStatus && String(rowStatus) !== String(procedureStatus)) return false;
    if (sessionStatus && String(rowStatus) !== String(sessionStatus)) return false;
    if (clientStatus && String(rowStatus) !== String(clientStatus)) return false;

    if (fromDate || toDate) {
      const rowDate = row?.created_at || row?.updated_at || row?.date;
      if (!inDateRange(rowDate, fromDate, toDate)) return false;
    }

    return true;
  });
};

const endpoints = {
  cases: '/legal-cases',
  services: '/services',
  procedures: '/procedures',
  sessions: '/legal_sessions',
  clients: '/clients',
};

export const fetchReportRows = async (tabKey, params = {}) => {
  const sanitizedParams = cleanParams(params);
  const response = await api.get(endpoints[tabKey], { params: sanitizedParams });
  const rows = extractRows(response?.data);
  return filterByTab(rows, sanitizedParams);
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
