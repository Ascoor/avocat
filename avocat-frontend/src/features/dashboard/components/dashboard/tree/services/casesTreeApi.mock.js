const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const buildCasesTreeApi = ({ clients = [], delay = 450 } = {}) => {
  const clientsById = new Map(clients.map((client) => [String(client.id), client]));

  const normalizeCase = (item, entityType = 'case') => ({
    id: String(item.id),
    clientId: String(item.clientId ?? item.client_id ?? item.client?.id ?? ''),
    title: item.title || item.name || 'بدون عنوان',
    number: item.number || item.slug || '—',
    status: item.status || 'غير محدد',
    court: item.court || item.court_name || 'غير محدد',
    nextDate: item.nextDate || item.next_session_date || item.next_date || null,
    entityType,
  });

  const normalizeSession = (session) => ({
    id: String(session.id),
    caseId: String(session.caseId ?? session.leg_case_id ?? session.legCaseId ?? ''),
    date: session.date || session.session_date || null,
    status: session.status || 'غير محدد',
    notes: session.notes || session.decision || '—',
  });

  const normalizeAction = (action) => ({
    id: String(action.id),
    caseId: String(action.caseId ?? action.leg_case_id ?? action.legCaseId ?? ''),
    type: action.type || action.title || action.procedure_type?.name || 'إجراء',
    date: action.date || action.start_date || null,
    status: action.status || 'غير محدد',
    assignee: action.assignee || action.assigned_to?.name || 'غير محدد',
  });

  const getCasesByClient = async (clientId) => {
    await wait(delay);
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

  const getCaseChildren = async (caseId) => {
    await wait(delay + 250);

    const foundCase = clients
      .flatMap((client) => [...(client.leg_cases || []), ...(client.services || [])])
      .find((item) => String(item.id) === String(caseId));

    if (!foundCase) {
      throw new Error('تعذر تحميل عناصر القضية، حاول مجددًا.');
    }

    const sessions = (foundCase.sessions || foundCase.legal_sessions || []).map(normalizeSession);
    const actions = (foundCase.actions || foundCase.procedures || []).map(normalizeAction);
    const attachments = foundCase.attachments || [];

    return { sessions, actions, attachments };
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
        sessions: [
          { id: 's-1', date: '2026-02-14', status: 'مؤجلة', notes: 'تأجيل لتبادل المذكرات' },
        ],
        procedures: [
          { id: 'a-1', type: 'تقديم مذكرة رد', date: '2026-02-15', status: 'قيد التنفيذ', assignee: 'أ/ خالد' },
        ],
      },
    ],
    services: [
      {
        id: 'srv-demo-1',
        slug: 'SV-2026-77',
        title: 'خدمة مراجعة عقد شراكة',
        status: 'نشطة',
        court: 'خدمة استشارية',
        procedures: [
          { id: 'a-2', type: 'مراجعة أولية', date: '2026-02-16', status: 'تم', assignee: 'أ/ ريم' },
        ],
      },
    ],
  },
];
