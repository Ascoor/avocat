const CATEGORY_META = {
  hearing: {
    color: '#1d4ed8',
    label: { ar: 'جلسة', en: 'Hearing' },
  },
  consultation: {
    color: '#9333ea',
    label: { ar: 'استشارة', en: 'Consultation' },
  },
  filing: {
    color: '#ea580c',
    label: { ar: 'إيداع', en: 'Filing Deadline' },
  },
  contract: {
    color: '#0f766e',
    label: { ar: 'عقد', en: 'Contract Review' },
  },
};

const EVENT_TEMPLATES = [
  {
    id: 'legal-1',
    category: 'hearing',
    title: { ar: 'جلسة قضية النفقة - محكمة الأسرة', en: 'Family Court Hearing - Alimony Case' },
    details: { ar: 'تحضير المرافعة وإرفاق تقرير الخبير.', en: 'Prepare pleadings and attach expert report.' },
    startOffsetDays: 1,
    hour: 10,
    durationHours: 2,
  },
  {
    id: 'legal-2',
    category: 'consultation',
    title: { ar: 'استشارة عميل شركة الهدى', en: 'Client Consultation - Al Huda Co.' },
    details: { ar: 'مراجعة المخاطر القانونية في عقد التوريد.', en: 'Review legal risks in supplier contract.' },
    startOffsetDays: 2,
    hour: 13,
    durationHours: 1,
  },
  {
    id: 'legal-3',
    category: 'filing',
    title: { ar: 'آخر موعد لتقديم مذكرة الاستئناف', en: 'Appeal Memo Filing Deadline' },
    details: { ar: 'ملف القضية رقم 213/2025.', en: 'Case file #213/2025.' },
    startOffsetDays: 3,
    hour: 9,
    durationHours: 1,
  },
  {
    id: 'legal-4',
    category: 'contract',
    title: { ar: 'مراجعة عقد شراكة - شركة الشرق', en: 'Partnership Contract Review - Al Sharq LLC' },
    details: { ar: 'تدقيق البنود المالية والجزائية.', en: 'Audit financial and penalty clauses.' },
    startOffsetDays: 5,
    hour: 11,
    durationHours: 2,
  },
  {
    id: 'legal-5',
    category: 'hearing',
    title: { ar: 'جلسة تنفيذ حكم - المحكمة التجارية', en: 'Judgment Enforcement Session - Commercial Court' },
    details: { ar: 'متابعة أوامر التنفيذ مع كاتب الضبط.', en: 'Follow up enforcement orders with clerk.' },
    startOffsetDays: 7,
    hour: 12,
    durationHours: 2,
  },
];

const createDate = (baseDate, offsetDays, hour) => {
  const next = new Date(baseDate);
  next.setDate(baseDate.getDate() + offsetDays);
  next.setHours(hour, 0, 0, 0);
  return next;
};

export const createDemoLegalEvents = () => {
  const now = new Date();

  return EVENT_TEMPLATES.map((template) => {
    const startDate = createDate(now, template.startOffsetDays, template.hour);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + template.durationHours);

    return {
      id: template.id,
      title: template.title,
      details: template.details,
      category: template.category,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      backgroundColor: CATEGORY_META[template.category].color,
      borderColor: CATEGORY_META[template.category].color,
      textColor: '#ffffff',
    };
  });
};

export const calendarCategoryMeta = CATEGORY_META;
