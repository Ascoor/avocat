const fakeData = {
  last_sessions: 8,
  general_procedures: 15,
  announcement_dates: 5,
  sessions: [
    {
      date: '2025-01-10',
      time: '10:00 ص',
      description: 'جلسة استماع لقضية الأحوال الشخصية',
    },
    {
      date: '2025-01-15',
      time: '1:00 م',
      description: 'جلسة استئناف لقضية تجارية',
    },
    { date: '2025-01-20', time: '11:00 ص', description: 'جلسة جنائية' },
    { date: '2025-01-25', time: '12:00 م', description: 'جلسة لمراجعة الأدلة' },
    { date: '2025-01-30', time: '2:00 م', description: 'جلسة تحكيم' },
  ],
  procedures: [
    { title: 'تقديم دعوى', description: 'إجراءات تقديم دعوى جديدة' },
    { title: 'استئناف حكم', description: 'إجراءات استئناف الحكم الصادر' },
    { title: 'التحكيم', description: 'إجراءات التحكيم في المنازعات' },
    { title: 'تسوية ودية', description: 'إجراءات التسوية الودية بين الأطراف' },
    { title: 'تقديم طلبات استئناف', description: 'كيفية تقديم طلب استئناف' },
  ],
  announcement_dates: [
    { date: '2025-01-12', description: 'موعد استلام إعلانات جديدة' },
    { date: '2025-01-19', description: 'موعد تسليم الإعلانات قبل الجلسة' },
    { date: '2025-01-26', description: 'تسليم الإعلانات للجلسات القادمة' },
    { date: '2025-02-02', description: 'موعد استلام إعلانات الطعن' },
    {
      date: '2025-02-09',
      description: 'تسليم الإعلانات المتعلقة بالقضايا الجديدة',
    },
  ],
  tasks: [
    {
      task: 'مراجعة ملف القضية رقم 123',
      dueDate: '2025-01-11',
      status: 'قيد التنفيذ',
    },
    { task: 'إعداد مذكرة الدفاع', dueDate: '2025-01-13', status: 'مكتملة' },
    { task: 'اجتماع مع العميل', dueDate: '2025-01-14', status: 'مجدولة' },
  ],
  documents: [
    { title: 'عقد اتفاق', uploadedDate: '2025-01-05', type: 'PDF' },
    { title: 'مذكرة دفاع', uploadedDate: '2025-01-08', type: 'Word' },
    { title: 'سند قانوني', uploadedDate: '2025-01-09', type: 'PDF' },
  ],
};

export default fakeData;
