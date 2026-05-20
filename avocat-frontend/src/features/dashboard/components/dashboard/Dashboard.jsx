import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';
import { CalendarClock, AlertTriangle, FileWarning, CheckCircle2 } from 'lucide-react';
import { fetchClients } from '@app/store/clientsSlice';
import api from '@shared/services/api/axiosConfig';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const tabs = ['نظرة عامة', 'القضايا', 'الأداء', 'المالية', 'الفريق'];
const filters = { range: ['آخر 30 يوم', 'آخر 90 يوم', 'هذا العام'], owner: ['الكل', 'أحمد', 'سارة'], type: ['كل الأنواع', 'تجاري', 'مدني'], status: ['كل الحالات', 'نشطة', 'مغلقة'] };

const Dashboard = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector((s) => s.clients);
  const [counts, setCounts] = useState({ clientCount: 0, legCaseCount: 0, procedureCount: 0, legalSessionCount: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('نظرة عامة');

  useEffect(() => { dispatch(fetchClients()); }, [dispatch]);
  useEffect(() => { (async () => { setLoading(true); try { const r = await api.get('/all_count_office'); setCounts({ clientCount: r.data.client_count || 0, legCaseCount: r.data.leg_case_count || 0, procedureCount: r.data.procedure_count || 0, legalSessionCount: r.data.legal_session_count || 0 }); } finally { setLoading(false); } })(); }, []);

  const kpis = useMemo(() => ([
    { title: 'إجمالي القضايا النشطة', value: counts.legCaseCount || 156, delta: '+10%' },
    { title: 'الجلسات القادمة', value: counts.legalSessionCount || 18, delta: '+8%' },
    { title: 'العملاء الجدد هذا الشهر', value: Math.max(8, Math.round((counts.clientCount || 24) * 0.2)), delta: '+14%' },
    { title: 'معدل التحصيل', value: '80%', delta: '+12%' },
    { title: 'الفواتير المستحقة', value: '54,000 ر.س', delta: '-3%' },
    { title: 'المهام المتأخرة', value: Math.max(6, Math.round((counts.procedureCount || 26) * 0.24)), delta: '+5%' },
  ]), [counts]);

  const statusData = { labels: ['قيد التنفيذ', 'جلسة قادمة', 'مغلقة', 'معلقة'], datasets: [{ data: [48, 32, 21, 12], backgroundColor: ['#4f46e5', '#06b6d4', '#14b8a6', '#f59e0b'] }] };
  const trendData = { labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'], datasets: [{ label: 'الإيرادات', data: [220, 310, 280, 365, 420], borderColor: '#6366f1' }, { label: 'التحصيل', data: [180, 250, 230, 320, 360], borderColor: '#14b8a6' }] };
  const pipelineData = { labels: ['استشارة أولية', 'عرض سعر', 'مفاوضة', 'قيد التنفيذ', 'مغلقة'], datasets: [{ data: [540, 420, 360, 280, 85], backgroundColor: ['#a78bfa', '#8b5cf6', '#7c3aed', '#6366f1', '#4f46e5'] }] };

  const alerts = [
    { t: 'خطر', text: 'جلسة خلال 3 أيام - قضية 3056', tone: 'text-red-500' },
    { t: 'تحذير', text: 'فاتورة متأخرة منذ 5 أيام', tone: 'text-amber-500' },
    { t: 'معلومة', text: 'مستند ناقص في قضية 4120', tone: 'text-blue-500' },
    { t: 'مكتمل', text: 'تم إغلاق عقد جديد', tone: 'text-emerald-500' },
  ];

  return <div className="space-y-5" dir="rtl">
    <section className="app-panel p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold">لوحة التحكم</h1><p className="text-sm text-muted-foreground">نظرة شاملة على أداء المكتب والقضايا والالتزامات.</p></div><div className="flex gap-2"><Link to="/dashboard/legcases" className="rounded-xl bg-primary text-primary-foreground px-3 py-2 text-sm">قضية جديدة</Link><Link to="/dashboard/reports/procedures" className="rounded-xl border border-border px-3 py-2 text-sm">جلسة / مهمة</Link></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">{Object.entries(filters).map(([key, opts]) => <select key={key} className="rounded-xl border border-border bg-background px-3 py-2 text-sm">{opts.map((o) => <option key={o}>{o}</option>)}</select>)}</div>
      <div className="overflow-x-auto"><div className="inline-flex min-w-max rounded-xl border border-border bg-muted/20 p-1">{tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}>{tab}</button>)}</div></div>
    </section>

    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">{kpis.map((kpi) => <article key={kpi.title} className="card-premium p-4 rounded-2xl border border-border/60"><p className="text-sm text-muted-foreground">{kpi.title}</p><p className="text-3xl font-bold mt-2">{loading ? '...' : kpi.value}</p><p className="text-xs text-emerald-500 mt-2">{kpi.delta} عن الشهر الماضي</p></article>)}</section>

    <section className="grid grid-cols-1 xl:grid-cols-3 gap-3">
      <article className="app-panel p-4"><h3 className="font-bold mb-3">تنبيهات الأولوية</h3><div className="space-y-2">{alerts.map((a) => <div key={a.text} className="rounded-xl border border-border px-3 py-2 text-sm flex items-center justify-between"><span>{a.text}</span><span className={a.tone}>{a.t}</span></div>)}</div></article>
      <article className="app-panel p-4"><h3 className="font-bold mb-3">جدول اليوم</h3><div className="space-y-3 text-sm"><div className="flex justify-between"><span>09:00</span><span>جلسة أولى - قضية 3056</span></div><div className="flex justify-between"><span>11:30</span><span>اجتماع عميل - شركة النور</span></div><div className="flex justify-between"><span>14:00</span><span>متابعة مستندات - قضية 2108</span></div></div></article>
      <article className="app-panel p-4"><h3 className="font-bold mb-3">النشاط الأخير</h3><ul className="space-y-2 text-sm"><li className="flex items-center justify-between"><span>تم إضافة قضية جديدة</span><CalendarClock className="h-4 w-4 text-blue-500" /></li><li className="flex items-center justify-between"><span>تم تحديث حالة قضية</span><FileWarning className="h-4 w-4 text-violet-500" /></li><li className="flex items-center justify-between"><span>تم إكمال مهمة</span><CheckCircle2 className="h-4 w-4 text-emerald-500" /></li><li className="flex items-center justify-between"><span>فاتورة متأخرة</span><AlertTriangle className="h-4 w-4 text-amber-500" /></li></ul></article>
    </section>

    <section className="grid grid-cols-1 xl:grid-cols-3 gap-3">
      <article className="app-panel p-4"><h3 className="font-bold mb-2">توزيع القضايا حسب الحالة</h3><div className="h-64"><Doughnut data={statusData} options={{ maintainAspectRatio: false }} /></div></article>
      <article className="app-panel p-4"><h3 className="font-bold mb-2">الإيرادات والتحصيل الشهري</h3><div className="h-64"><Line data={trendData} options={{ maintainAspectRatio: false, responsive: true }} /></div></article>
      <article className="app-panel p-4"><h3 className="font-bold mb-2">قيمة القضايا حسب المرحلة</h3><div className="h-64"><Bar data={pipelineData} options={{ maintainAspectRatio: false, indexAxis: 'y' }} /></div></article>
    </section>

    <section className="app-panel p-4"><div className="flex items-center justify-between mb-3"><h3 className="font-bold">أحدث القضايا</h3><Link to="/dashboard/legcases" className="text-sm text-primary">عرض الكل</Link></div><div className="hidden md:block overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-muted-foreground"><th className="py-2 text-start">رقم القضية</th><th className="text-start">عنوان القضية</th><th className="text-start">العميل</th><th className="text-start">المحكمة</th><th className="text-start">المسؤول</th><th className="text-start">الحالة</th><th className="text-start">آخر تحديث</th></tr></thead><tbody>{[1,2,3].map((i)=><tr key={i} className="border-t border-border/60"><td className="py-2">2024-{1100+i}</td><td>مطالبة مالية</td><td>{clients?.[0]?.name || 'شركة الندى'}</td><td>المحكمة التجارية</td><td>أحمد القحطاني</td><td><span className="rounded-full bg-primary/10 text-primary px-2 py-1 text-xs">قيد التنفيذ</span></td><td>منذ ساعتين</td></tr>)}</tbody></table></div><div className="md:hidden space-y-2">{[1,2].map((i)=><article key={i} className="rounded-xl border border-border p-3"><p className="font-semibold">2024-{1200+i} - مطالبة مالية</p><p className="text-xs text-muted-foreground">شركة الندى • المحكمة التجارية • قيد التنفيذ</p></article>)}</div></section>
  </div>;
};

export default Dashboard;
