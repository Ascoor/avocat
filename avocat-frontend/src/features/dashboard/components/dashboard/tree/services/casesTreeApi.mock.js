import { getCaseProcedures, getCaseSessions } from '@shared/services/api/legalCases';
import { getServiceProceduresByServiceId } from '@shared/services/api/services';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

export const buildCasesTreeApi = ({ clients = [], delay = 0 } = {}) => {
  const clientsById = new Map(clients.map((client) => [String(client.id), client]));

  const normalizeCase = (item, entityType = 'case') => ({
    id: String(item.id),
    clientId: String(item.clientId ?? item.client_id ?? item.client?.id ?? ''),
    title: item.title || item.name || 'بدون عنوان',
    number: item.number || item.slug || '—',
    status: item.status || 'غير محدد',
    court: item.court?.name || item.court_name || item.court || 'غير محدد',
    nextDate: item.nextDate || item.next_session_date || item.next_date || null,
    entityType,
  });

  const normalizeSession = (session) => ({
    id: String(session.id),
    caseId: String(session.caseId ?? session.leg_case_id ?? session.legCaseId ?? ''),
    date: session.date || session.session_date || null,
    status: session.status || 'غير محدد',
    notes: session.notes || session.decision || '—',
    court: session.court?.name || session.court_name || '—',
  });

  const normalizeAction = (action) => ({
    id: String(action.id),
    caseId: String(action.caseId ?? action.leg_case_id ?? action.legCaseId ?? action.service_id ?? ''),
    type: action.type || action.title || action.procedure_type?.name || action.procedureType?.name || 'إجراء',
    date: action.date || action.procedure_date || action.start_date || null,
    status: action.status || 'غير محدد',
    assignee: action.assignee || action.lawyer?.name || action.assigned_to?.name || 'غير محدد',
  });

  const getCasesByClient = async (clientId) => {
    if (delay) await wait(delay);

    const client = clientsById.get(String(clientId));
    if (!client) return [];

    const legCases = (client.leg_cases || []).map((item) =>
      normalizeCase({ ...item, clientId: client.id }, 'case'),
    );
    const services = (client.services || []).map((item) =>
      normalizeCase({ ...item, clientId: client.id }, 'service'),
    );

    return [...legCases, ...services];
  };

  const getCaseChildren = async (caseItem) => {
    const caseId = typeof caseItem === 'object' ? caseItem?.id : caseItem;
    const entityType = typeof caseItem === 'object' ? caseItem?.entityType : 'case';

    if (!caseId) {
      throw new Error('تعذر تحميل عناصر القضية، حاول مجددًا.');
    }

    if (delay) await wait(delay + 120);

    if (entityType === 'service') {
      const proceduresResponse = await getServiceProceduresByServiceId(caseId);
      const actions = asArray(proceduresResponse.data).map(normalizeAction);
      return { sessions: [], actions, attachments: [] };
    }

    const [sessionsResponse, proceduresResponse] = await Promise.all([
      getCaseSessions(caseId),
      getCaseProcedures(caseId),
    ]);

    const sessions = asArray(sessionsResponse.data).map(normalizeSession);
    const actions = asArray(proceduresResponse.data).map(normalizeAction);

    return { sessions, actions, attachments: [] };
  };

  return { getCasesByClient, getCaseChildren };
};

export const mockTreeClients = [
  {
    id: 'client-demo-1',
    name: 'شركة الإتقان للمقاولات',
    leg_cases: [
      {
        id: 'case-demo-1',
        slug: 'LC-2026-101',
        title: 'مطالبة مالية - عقد توريد',
        status: 'مفتوحة',
        court: 'محكمة جدة التجارية',
        next_session_date: '2026-03-01',
      },
    ],
    services: [
      {
        id: 'srv-demo-1',
        slug: 'SV-2026-77',
        title: 'خدمة مراجعة عقد شراكة',
        status: 'نشطة',
        court: 'خدمة استشارية',
      },
    ],
  },
];
