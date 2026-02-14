export const FILTER_SCHEMA = {
  cases: {
    defaults: {
      client_name: '',
      file_number: '',
      case_type_id: '',
      from_date: '',
      to_date: '',
      case_status: '',
    },
    fields: {
      client_name: { type: 'text', labelKey: 'reports.filters.fields.clientName' },
      file_number: { type: 'text', labelKey: 'reports.filters.fields.fileNumber' },
      case_type_id: { type: 'select', labelKey: 'reports.filters.fields.caseType' },
      from_date: { type: 'date', labelKey: 'reports.filters.fields.fromDate' },
      to_date: { type: 'date', labelKey: 'reports.filters.fields.toDate' },
      case_status: { type: 'select', labelKey: 'reports.filters.fields.caseStatus' },
    },
    groups: [
      { titleKey: 'reports.filters.groups.basic', fields: ['client_name', 'file_number', 'case_type_id'] },
      { titleKey: 'reports.filters.groups.classification', fields: ['case_status'] },
      { titleKey: 'reports.filters.groups.date', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'case_type_id'],
      ['case_status', 'from_date', 'to_date'],
    ],
  },
  services: {
    defaults: {
      client_name: '',
      file_number: '',
      case_type_id: '',
      from_date: '',
      to_date: '',
      service_status: '',
    },
    fields: {
      client_name: { type: 'text', labelKey: 'reports.filters.fields.clientName' },
      file_number: { type: 'text', labelKey: 'reports.filters.fields.fileNumber' },
      case_type_id: { type: 'select', labelKey: 'reports.filters.fields.caseType' },
      from_date: { type: 'date', labelKey: 'reports.filters.fields.fromDate' },
      to_date: { type: 'date', labelKey: 'reports.filters.fields.toDate' },
      service_status: { type: 'select', labelKey: 'reports.filters.fields.serviceStatus' },
    },
    groups: [
      { titleKey: 'reports.filters.groups.basic', fields: ['client_name', 'file_number', 'case_type_id'] },
      { titleKey: 'reports.filters.groups.classification', fields: ['service_status'] },
      { titleKey: 'reports.filters.groups.date', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'case_type_id'],
      ['service_status', 'from_date', 'to_date'],
    ],
  },
  procedures: {
    defaults: {
      client_name: '',
      lawyer_id: '',
      file_number: '',
      procedure_type_id: '',
      from_date: '',
      to_date: '',
      procedure_status: '',
    },
    fields: {
      client_name: { type: 'text', labelKey: 'reports.filters.fields.clientName' },
      lawyer_id: { type: 'select', labelKey: 'reports.filters.fields.lawyer' },
      file_number: { type: 'text', labelKey: 'reports.filters.fields.fileNumber' },
      procedure_type_id: { type: 'select', labelKey: 'reports.filters.fields.procedureType' },
      from_date: { type: 'date', labelKey: 'reports.filters.fields.fromDate' },
      to_date: { type: 'date', labelKey: 'reports.filters.fields.toDate' },
      procedure_status: { type: 'select', labelKey: 'reports.filters.fields.procedureStatus' },
    },
    groups: [
      { titleKey: 'reports.filters.groups.basic', fields: ['client_name', 'lawyer_id', 'file_number', 'procedure_type_id'] },
      { titleKey: 'reports.filters.groups.classification', fields: ['procedure_status'] },
      { titleKey: 'reports.filters.groups.date', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'lawyer_id', 'file_number'],
      ['procedure_type_id', 'procedure_status', 'from_date'],
      ['to_date'],
    ],
  },
  sessions: {
    defaults: {
      client_name: '',
      lawyer_id: '',
      file_number: '',
      session_type_id: '',
      from_date: '',
      to_date: '',
      session_status: '',
    },
    fields: {
      client_name: { type: 'text', labelKey: 'reports.filters.fields.clientName' },
      lawyer_id: { type: 'select', labelKey: 'reports.filters.fields.lawyer' },
      file_number: { type: 'text', labelKey: 'reports.filters.fields.fileNumber' },
      session_type_id: { type: 'select', labelKey: 'reports.filters.fields.sessionType' },
      from_date: { type: 'date', labelKey: 'reports.filters.fields.fromDate' },
      to_date: { type: 'date', labelKey: 'reports.filters.fields.toDate' },
      session_status: { type: 'select', labelKey: 'reports.filters.fields.sessionStatus' },
    },
    groups: [
      { titleKey: 'reports.filters.groups.basic', fields: ['client_name', 'lawyer_id', 'file_number', 'session_type_id'] },
      { titleKey: 'reports.filters.groups.classification', fields: ['session_status'] },
      { titleKey: 'reports.filters.groups.date', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'lawyer_id', 'file_number'],
      ['session_type_id', 'session_status', 'from_date'],
      ['to_date'],
    ],
  },
  clients: {
    defaults: {
      client_type: '',
      from_date: '',
      to_date: '',
      client_status: '',
    },
    fields: {
      client_type: { type: 'select', labelKey: 'reports.filters.fields.clientType' },
      from_date: { type: 'date', labelKey: 'reports.filters.fields.fromDate' },
      to_date: { type: 'date', labelKey: 'reports.filters.fields.toDate' },
      client_status: { type: 'select', labelKey: 'reports.filters.fields.clientStatus' },
    },
    groups: [
      { titleKey: 'reports.filters.groups.classification', fields: ['client_type', 'client_status'] },
      { titleKey: 'reports.filters.groups.date', fields: ['from_date', 'to_date'] },
    ],
    layout: [['client_type', 'client_status', 'from_date'], ['to_date']],
  },
};

export const getDefaultReportState = (tabKey) => {
  const schema = FILTER_SCHEMA[tabKey];
  if (!schema) {
    return { filters: {}, pagination: { page: 1, per_page: 20 } };
  }

  return {
    filters: { ...schema.defaults },
    pagination: { page: 1, per_page: 20 },
  };
};

export const getFilterKeysForTab = (tabKey) => Object.keys(FILTER_SCHEMA[tabKey]?.fields || {});
