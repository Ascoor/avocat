import { getStoredToken, isDemoToken } from '../auth/authStorage';

export const DEMO_OFFICE_ID = 1;

const demoClients = [
  {
    id: 101,
    slug: 'CL-DEMO-001',
    name: 'شركة النمو التجريبية',
    identity_number: '7000123456001',
    address: 'الرياض، حي العليا',
    phone_number: '+966501112233',
    status: 'active',
    office_id: DEMO_OFFICE_ID,
  },
  {
    id: 102,
    slug: 'CL-DEMO-002',
    name: 'فاطمة العتيبي',
    identity_number: '2000123456',
    address: 'جدة، الروضة',
    phone_number: '+966507778899',
    status: 'active',
    office_id: DEMO_OFFICE_ID,
  },
  {
    id: 103,
    slug: 'CL-DEMO-003',
    name: 'مؤسسة مدار للمقاولات',
    identity_number: '3100123456003',
    address: 'الدمام، الفيصلية',
    phone_number: '+966504441122',
    status: 'inactive',
    office_id: DEMO_OFFICE_ID,
  },
];

const demoUnclients = [
  {
    id: 201,
    slug: 'UC-DEMO-001',
    name: 'عميل محتمل — استشارة عقارية',
    identity_number: '',
    address: '',
    phone_number: '+966509998877',
    status: 'active',
  },
  {
    id: 202,
    slug: 'UC-DEMO-002',
    name: 'طلب متابعة — تحصيل ديون',
    identity_number: '',
    address: '',
    phone_number: '+966503334455',
    status: 'active',
  },
];

const demoLegCasesList = [
  {
    id: 301,
    slug: 'DEMO-2024-001',
    title: 'نزاع تعاقدي — أتعاب مهنية',
    status: 'جارى التنفيذ',
    client_capacity: 'المدعي',
    case_sub_type: { name: 'تجاري' },
    clients: [{ id: 101, name: 'شركة النمو التجريبية' }],
    office_id: DEMO_OFFICE_ID,
  },
  {
    id: 302,
    slug: 'DEMO-2024-002',
    title: 'مطالبة عمالية — مستحقات متأخرة',
    status: 'متداولة',
    client_capacity: 'المدعي',
    case_sub_type: { name: 'عمالي' },
    clients: [{ id: 102, name: 'فاطمة العتيبي' }],
    office_id: DEMO_OFFICE_ID,
  },
  {
    id: 303,
    slug: 'DEMO-2024-003',
    title: 'تحصيل تجاري — شيكات مرتجعة',
    status: 'منتهية',
    client_capacity: 'المدعي',
    case_sub_type: { name: 'تجاري' },
    clients: [{ id: 103, name: 'مؤسسة مدار للمقاولات' }],
    office_id: DEMO_OFFICE_ID,
  },
];

const demoLawyers = [
  {
    id: 401,
    name: 'أحمد المحامي التجريبي',
    birthdate: '1985-03-12',
    identity_number: '1000123456',
    law_reg_num: 'SA-LAW-1001',
    lawyer_class: 'مستشار',
    email: 'ahmed.demo@avocat.app',
    phone_number: '+966501110011',
  },
  {
    id: 402,
    name: 'ريم القانونية التجريبية',
    birthdate: '1990-07-21',
    identity_number: '2000987654',
    law_reg_num: 'SA-LAW-1002',
    lawyer_class: 'محام ممارس',
    email: 'reem.demo@avocat.app',
    phone_number: '+966502220022',
  },
];

const demoServices = [
  {
    id: 501,
    slug: 'SRV-DEMO-001',
    service_type: { name: 'صياغة عقود' },
    service_place_name: 'مكتب الرياض',
    description: 'مراجعة وصياغة عقد توريد (بيانات تجريبية)',
    status: 'جارى التنفيذ',
  },
  {
    id: 502,
    slug: 'SRV-DEMO-002',
    service_type: { name: 'تمثيل أمام المحكمة' },
    service_place_name: 'محكمة التجارة',
    description: 'جلسة استماع أولى — سيناريو تجريبي',
    status: 'متداولة',
  },
];

const demoProcedures = [
  {
    id: 601,
    status: 'قيد التنفيذ',
    procedure_type: { name: 'تبليغ' },
    leg_case: { slug: 'DEMO-2024-001', clients: [{ name: 'شركة النمو التجريبية' }] },
    file_number: 'DEMO-2024-001',
  },
  {
    id: 602,
    status: 'منتهية',
    procedure_type: { name: 'المرافعة الشفهية' },
    leg_case: { slug: 'DEMO-2024-002', clients: [{ name: 'فاطمة العتيبي' }] },
    file_number: 'DEMO-2024-002',
  },
];

const demoLegalSessions = [
  {
    id: 701,
    session_date: new Date(Date.now() + 86400000 * 3).toISOString(),
    orders: 'تأجيل للاطلاع',
    status: 'مجدولة',
    court: { name: 'المحكمة التجارية — الرياض' },
    legcase_id: 301,
    client_name: 'شركة النمو التجريبية',
  },
  {
    id: 702,
    session_date: new Date(Date.now() + 86400000 * 10).toISOString(),
    orders: '—',
    status: 'مجدولة',
    court: { name: 'محكمة العمل — جدة' },
    legcase_id: 302,
    client_name: 'فاطمة العتيبي',
  },
];

const demoLookupTypes = [
  { id: 1, name: 'تصنيف تجريبي أ' },
  { id: 2, name: 'تصنيف تجريبي ب' },
];

const demoLedgerItems = [
  {
    id: 801,
    kind: 'expense',
    amount: 2500,
    note: 'رسوم تسجيل دعوى (تجريبي)',
    created_at: '2024-11-02T10:00:00.000Z',
  },
  {
    id: 802,
    kind: 'revenue',
    amount: 15000,
    note: 'أتعاب استشارية — مرحلة أولى (تجريبي)',
    created_at: '2024-11-10T14:30:00.000Z',
  },
  {
    id: 803,
    kind: 'payment',
    amount: 8000,
    note: 'دفعة عميل جزئية (تجريبي)',
    created_at: '2024-11-18T09:15:00.000Z',
  },
];

const buildDemoCaseDetail = (id) => ({
  id: Number(id) || 301,
  slug: `DEMO-2024-${String(id).padStart(3, '0')}`,
  title: 'ملف قضية تجريبي — عرض كامل للتبويبات',
  status: 'جارى التنفيذ',
  clients: demoClients,
  courts: [{ id: 1, name: 'المحكمة التجارية — الرياض' }],
  caseType: { name: 'تجاري' },
  caseSubType: { name: 'منازعات تعاقدية' },
  procedures: [],
  legalSessions: [],
  services: [],
});

const methodOf = (config) => (config.method || 'get').toLowerCase();

const rawPath = (config) => {
  const u = config.url || '';
  return u.split('?')[0];
};

const isReportServicesRequest = (config) => {
  const p = config.params || {};
  return p.report_mode === 1 || p.report_mode === '1';
};

function resolveDemoResponse(config) {
  if (!isDemoToken(getStoredToken())) return null;

  const method = methodOf(config);
  const path = rawPath(config);

  if (method === 'post' && path === '/logout') {
    return { message: 'ok' };
  }

  if (method !== 'get') {
    return { success: true, message: 'demo' };
  }

  if (path === '/all_count_office') {
    return {
      client_count: demoClients.length,
      leg_case_count: demoLegCasesList.length,
      procedure_count: demoProcedures.length + 4,
      legal_session_count: demoLegalSessions.length + 2,
    };
  }

  if (path === '/legcases') {
    return { data: demoLegCasesList };
  }

  if (path === '/clients') {
    const rows = demoClients.map((c) => ({
      ...c,
      phone: c.phone_number,
    }));
    return { clients: demoClients, data: rows };
  }

  if (path === '/unclients') {
    return { unclients: demoUnclients };
  }

  if (path === '/lawyers') {
    return demoLawyers;
  }

  if (path === '/services') {
    if (isReportServicesRequest(config)) {
      return { data: demoServices.map((s) => ({
        ...s,
        name: s.description,
        file_number: s.slug,
        clients: [{ name: 'شركة النمو التجريبية' }],
        status: s.status,
        service_type: s.service_type,
      })) };
    }
    return { services: demoServices };
  }

  if (path === '/procedures' || path === '/procedures-search') {
    return { data: demoProcedures };
  }

  if (path === '/legal_sessions' || path.startsWith('/legal_sessions')) {
    if (path.includes('/leg-case/')) {
      return { data: demoLegalSessions };
    }
    return { data: demoLegalSessions };
  }

  if (path === '/cases/search') {
    return {
      data: demoLegCasesList.map((row) => ({
        ...row,
        file_number: row.slug,
      })),
    };
  }

  const casesMatch = path.match(/^\/cases\/([^/]+)$/);
  if (casesMatch && !path.includes('/procedures') && !path.includes('/sessions')) {
    const caseId = casesMatch[1];
    return { data: buildDemoCaseDetail(caseId) };
  }

  if (path.match(/^\/cases\/[^/]+\/procedures$/)) {
    return { data: [] };
  }

  if (path.match(/^\/cases\/[^/]+\/sessions$/)) {
    return { data: [] };
  }

  if (path.match(/^\/cases\/[^/]+\/clients$/)) {
    return { data: demoClients };
  }

  if (path.match(/^\/legal-cases\/[^/]+$/)) {
    const id = path.split('/').pop();
    return { data: buildDemoCaseDetail(id) };
  }

  if (path.startsWith('/legal-ads/')) {
    return [];
  }

  if (path === '/finance/ledger' || path === '/expenses/search') {
    return { data: { items: demoLedgerItems } };
  }

  if (path.startsWith('/lookups/')) {
    return { data: demoLookupTypes };
  }

  if (path === '/service-types') {
    return { data: [{ id: 1, name: 'نوع خدمة تجريبي' }] };
  }

  if (path === '/legal_session_types' || path === '/legal_session_types/') {
    return [{ id: 1, name: 'جلسة علنية تجريبية' }];
  }

  if (path.startsWith('/notifications/')) {
    return { data: [] };
  }

  if (path.startsWith('/rbac/')) {
    return { data: { user: null, roles: [], permissions: [] } };
  }

  return { data: { data: [], items: [], rows: [] } };
}

const axiosResponse = (config, data) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: { 'content-type': 'application/json' },
  config,
  request: {},
});

export const applyDemoApiMock = (axiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    if (!isDemoToken(getStoredToken())) {
      return config;
    }

    const payload = resolveDemoResponse(config);
    if (payload === null) {
      return config;
    }

    config.adapter = () => Promise.resolve(axiosResponse(config, payload));
    return config;
  });
};
