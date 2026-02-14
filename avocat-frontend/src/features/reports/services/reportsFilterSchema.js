export const FILTER_SCHEMA = {
  cases: {
    fields: {
      client_name: { label: 'اسم الموكل', type: 'text' },
      file_number: { label: 'رقم الملف', type: 'text' },
      case_type_id: { label: 'نوع القضية', type: 'select' },
      from_date: { label: 'من تاريخ', type: 'date' },
      to_date: { label: 'إلى تاريخ', type: 'date' },
      case_status: { label: 'حالة القضية', type: 'select' },
    },
    groups: [
      {
        title: 'بيانات القضية',
        fields: ['client_name', 'file_number', 'case_type_id'],
      },
      { title: 'الحالة', fields: ['case_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'case_type_id'],
      ['case_status', 'from_date', 'to_date'],
    ],
    defaultValues: {
      client_name: '',
      file_number: '',
      case_type_id: '',
      from_date: '',
      to_date: '',
      case_status: '',
    },
  },
  services: {
    fields: {
      client_name: { label: 'اسم الموكل', type: 'text' },
      file_number: { label: 'رقم الملف', type: 'text' },
      case_type_id: { label: 'نوع القضية', type: 'select' },
      from_date: { label: 'من تاريخ', type: 'date' },
      to_date: { label: 'إلى تاريخ', type: 'date' },
      service_status: { label: 'حالة الخدمة', type: 'select' },
    },
    groups: [
      {
        title: 'بيانات الخدمة',
        fields: ['client_name', 'file_number', 'case_type_id'],
      },
      { title: 'الحالة', fields: ['service_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'case_type_id'],
      ['service_status', 'from_date', 'to_date'],
    ],
    defaultValues: {
      client_name: '',
      file_number: '',
      case_type_id: '',
      from_date: '',
      to_date: '',
      service_status: '',
    },
  },
  procedures: {
    fields: {
      client_name: { label: 'اسم الموكل', type: 'text' },
      file_number: { label: 'رقم الملف', type: 'text' },
      lawyer_id: { label: 'المحامي', type: 'select' },
      procedure_type_id: { label: 'نوع الإجراء', type: 'select' },
      from_date: { label: 'من تاريخ', type: 'date' },
      to_date: { label: 'إلى تاريخ', type: 'date' },
      procedure_status: { label: 'حالة الإجراء', type: 'select' },
    },
    groups: [
      {
        title: 'بيانات الإجراء',
        fields: [
          'client_name',
          'file_number',
          'lawyer_id',
          'procedure_type_id',
        ],
      },
      { title: 'الحالة', fields: ['procedure_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'lawyer_id'],
      ['procedure_type_id', 'procedure_status', 'from_date'],
      ['to_date'],
    ],
    defaultValues: {
      client_name: '',
      file_number: '',
      lawyer_id: '',
      procedure_type_id: '',
      from_date: '',
      to_date: '',
      procedure_status: '',
    },
  },
  sessions: {
    fields: {
      client_name: { label: 'اسم الموكل', type: 'text' },
      file_number: { label: 'رقم الملف', type: 'text' },
      lawyer_id: { label: 'المحامي', type: 'select' },
      session_type_id: { label: 'نوع الجلسة', type: 'select' },
      from_date: { label: 'من تاريخ', type: 'date' },
      to_date: { label: 'إلى تاريخ', type: 'date' },
      session_status: { label: 'حالة الجلسة', type: 'select' },
    },
    groups: [
      {
        title: 'بيانات الجلسة',
        fields: ['client_name', 'file_number', 'lawyer_id', 'session_type_id'],
      },
      { title: 'الحالة', fields: ['session_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [
      ['client_name', 'file_number', 'lawyer_id'],
      ['session_type_id', 'session_status', 'from_date'],
      ['to_date'],
    ],
    defaultValues: {
      client_name: '',
      file_number: '',
      lawyer_id: '',
      session_type_id: '',
      from_date: '',
      to_date: '',
      session_status: '',
    },
  },
  clients: {
    fields: {
      client_type: { label: 'نوع الموكل', type: 'select' },
      from_date: { label: 'من تاريخ', type: 'date' },
      to_date: { label: 'إلى تاريخ', type: 'date' },
      client_status: { label: 'حالة الموكل', type: 'select' },
    },
    groups: [
      { title: 'بيانات الموكل', fields: ['client_type', 'client_status'] },
      { title: 'الفترة الزمنية', fields: ['from_date', 'to_date'] },
    ],
    layout: [['client_type', 'client_status', 'from_date'], ['to_date']],
    defaultValues: {
      client_type: '',
      from_date: '',
      to_date: '',
      client_status: '',
    },
  },
};

export const getDefaultReportState = (tabKey) => {
  const schema = FILTER_SCHEMA[tabKey];
  if (!schema) {
    return { filters: {}, pagination: { page: 1, per_page: 20 } };
  }

  return {
    filters: { ...schema.defaultValues },
    pagination: { page: 1, per_page: 20 },
  };
};

export const getFilterKeysForTab = (tabKey) =>
  Object.keys(FILTER_SCHEMA[tabKey]?.fields || {});
