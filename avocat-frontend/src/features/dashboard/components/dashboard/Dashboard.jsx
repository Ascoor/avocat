import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  AlertTriangle,
  CalendarClock,
  FileWarning,
  UserMinus,
  ListFilter,
  ExternalLink,
} from 'lucide-react';
import { fetchClients } from '@app/store/clientsSlice';
import api from '@shared/services/api/axiosConfig';
import DashboardSearch from './DashboardSearch';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
);

const FILTER_CONFIG = [
  { key: 'branch', label: 'الفرع', options: ['كل الفروع', 'الفرع الرئيسي', 'فرع الشمال', 'فرع الجنوب'] },
  { key: 'caseType', label: 'نوع القضية', options: ['كل الأنواع', 'مدني', 'تجاري', 'عمالي', 'جنائي'] },
  { key: 'responsible', label: 'المسؤول', options: ['الكل', 'المحامي أحمد', 'المحامية ريم', 'المحامي ياسر'] },
  { key: 'range', label: 'النطاق الزمني', options: ['آخر 30 يوم', 'آخر 90 يوم', 'هذا العام'] },
  { key: 'status', label: 'الحالة', options: ['كل الحالات', 'نشطة', 'معلقة', 'في المخاطر'] },
];

const KPI_DEFINITIONS = [
  { key: 'activeMatters', label: 'القضايا النشطة', format: 'number' },
  { key: 'newMatters', label: 'القضايا الجديدة هذا الشهر', format: 'number' },
  { key: 'upcomingHearings', label: 'جلسات قادمة', format: 'number' },
  { key: 'overdueTasks', label: 'المهام المتأخرة', format: 'number' },
  { key: 'wip', label: 'العمل قيد الإنجاز (WIP)', format: 'currency' },
  { key: 'billedMtd', label: 'الفواتير هذا الشهر', format: 'currency' },
  { key: 'collectedMtd', label: 'المحصّل هذا الشهر', format: 'currency' },
  { key: 'collectionRate', label: 'معدل التحصيل', format: 'percent' },
];

const STAGE_DISTRIBUTION = [
  { stage: 'Intake', lowRisk: 7, mediumRisk: 4, highRisk: 2 },
  { stage: 'Investigation', lowRisk: 11, mediumRisk: 6, highRisk: 3 },
  { stage: 'Litigation', lowRisk: 14, mediumRisk: 7, highRisk: 5 },
  { stage: 'Negotiation', lowRisk: 9, mediumRisk: 4, highRisk: 2 },
  { stage: 'Closed', lowRisk: 18, mediumRisk: 2, highRisk: 1 },
];

const TREND_DATA = {
  labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
  billed: [42000, 46000, 51000, 49000, 54000, 57000],
  collected: [35000, 39000, 42000, 45000, 47000, 50000],
};

const FUNNEL_DATA = [
  { stage: 'Leads', value: 120 },
  { stage: 'Qualified', value: 88 },
  { stage: 'Consultation', value: 56 },
  { stage: 'Proposal', value: 34 },
  { stage: 'Retained', value: 23 },
];

const SMART_ACTION_ROWS = [
  {
    id: 'MAT-2024-091',
    matter: 'نزاع تعاقدي - شركة الندى',
    risk: 'مرتفع',
    nextDeadline: 'خلال يومين',
    owner: 'المحامي أحمد',
    amount: 'SAR 12,500 غير مفوتر',
    href: '/dashboard/legcases',
  },
  {
    id: 'MAT-2024-074',
    matter: 'مطالبة عمالية - فيصل',
    risk: 'متوسط',
    nextDeadline: 'متأخر 3 أيام',
    owner: 'المحامية ريم',
    amount: 'SAR 8,900 A/R',
    href: '/dashboard/legcases',
  },
  {
    id: 'MAT-2024-043',
    matter: 'تحصيل تجاري - مؤسسة مدار',
    risk: 'مرتفع',
    nextDeadline: 'جلسة خلال 5 أيام',
    owner: 'غير معيّن',
    amount: 'SAR 21,300 WIP',
    href: '/dashboard/legcases',
  },
];

const formatValue = (value, format, currencyCode = 'SAR') => {
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (format === 'percent') {
    return `${value}%`;
  }

  return new Intl.NumberFormat('en-US').format(value);
};

const renderStateBlock = ({ loading, error, empty, children, loadingText, emptyText }) => {
  if (loading) {
    return <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">{loadingText}</p>;
  }

  if (error) {
    return <p className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">{error}</p>;
  }

  if (empty) {
    return <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">{emptyText}</p>;
  }

  return children;
};

const Home = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.clients);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [officeLoading, setOfficeLoading] = useState(true);
  const [officeError, setOfficeError] = useState('');
  const [counts, setCounts] = useState({
    clientCount: 0,
    legCaseCount: 0,
    procedureCount: 0,
    legalSessionCount: 0,
  });
  const [displayCurrency, setDisplayCurrency] = useState('SAR');
  const [filters, setFilters] = useState({
    branch: 'كل الفروع',
    caseType: 'كل الأنواع',
    responsible: 'الكل',
    range: 'آخر 30 يوم',
    status: 'كل الحالات',
  });

  useEffect(() => {
    dispatch(fetchClients());
    fetchOfficeCount();
  }, [dispatch]);

  const fetchOfficeCount = async () => {
    setOfficeLoading(true);
    setOfficeError('');

    try {
      const response = await api.get('/all_count_office');
      setCounts({
        clientCount: response.data.client_count || 0,
        legCaseCount: response.data.leg_case_count || 0,
        procedureCount: response.data.procedure_count || 0,
        legalSessionCount: response.data.legal_session_count || 0,
      });
    } catch (requestError) {
      setOfficeError('تعذر تحميل بيانات لوحة العمليات. يتم عرض بيانات احتياطية.');
    } finally {
      setOfficeLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);


  useEffect(() => {
    const officeCurrency = localStorage.getItem('office.defaultCurrencyCode');
    if (officeCurrency) {
      setDisplayCurrency(officeCurrency);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setFilteredClients([]);
      return;
    }
    const normalizedSearchTerm = debouncedSearchTerm.trim().toLowerCase();
    const result = clients.filter((client) => {
      const name = client.name?.toLowerCase() || '';
      const slug = String(client.slug || '').toLowerCase();
      const phoneNumber = String(client.phone_number || '').toLowerCase();
      return (
        name.includes(normalizedSearchTerm) ||
        slug.includes(normalizedSearchTerm) ||
        phoneNumber.includes(normalizedSearchTerm)
      );
    });
    setFilteredClients(result.slice(0, 5));
  }, [debouncedSearchTerm, clients]);

  const kpiValues = useMemo(() => {
    const activeMatters = counts.legCaseCount || 132;
    const upcomingHearings = counts.legalSessionCount || 26;
    const overdueTasks = Math.max(Math.round((counts.procedureCount || 48) * 0.23), 8);
    const billedMtd = 287000;
    const collectedMtd = 231000;

    return {
      activeMatters,
      newMatters: Math.max(Math.round(activeMatters * 0.12), 9),
      upcomingHearings,
      overdueTasks,
      wip: 345000,
      billedMtd,
      collectedMtd,
      collectionRate: Math.round((collectedMtd / billedMtd) * 100),
    };
  }, [counts]);

  const alertItems = useMemo(
    () => [
      {
        key: 'overdue',
        icon: AlertTriangle,
        tone: 'destructive',
        label: 'مهام متأخرة',
        value: `${kpiValues.overdueTasks} مهمة تتطلب تدخل الآن`,
        href: '/dashboard/reports/procedures',
      },
      {
        key: 'hearings',
        icon: CalendarClock,
        tone: 'warning',
        label: 'جلسات خلال 7 أيام',
        value: `${Math.max(12, Math.round(kpiValues.upcomingHearings * 0.65))} جلسة`,
        href: '/dashboard/legal-sessions',
      },
      {
        key: 'stale',
        icon: FileWarning,
        tone: 'warning',
        label: 'ملفات بلا نشاط',
        value: '17 ملف بلا تحديث منذ 21 يوم',
        href: '/dashboard/legcases',
      },
      {
        key: 'leads',
        icon: UserMinus,
        tone: 'info',
        label: 'Leads غير معيّنة',
        value: '9 طلبات جديدة بدون مسؤول',
        href: '/dashboard/customer-service?tab=unclients',
      },
    ],
    [kpiValues.overdueTasks, kpiValues.upcomingHearings],
  );

  const stageChartData = {
    labels: STAGE_DISTRIBUTION.map((item) => item.stage),
    datasets: [
      {
        label: 'منخفض المخاطر',
        data: STAGE_DISTRIBUTION.map((item) => item.lowRisk),
        backgroundColor: 'rgba(34, 197, 94, 0.75)',
        borderRadius: 6,
      },
      {
        label: 'متوسط المخاطر',
        data: STAGE_DISTRIBUTION.map((item) => item.mediumRisk),
        backgroundColor: 'rgba(245, 158, 11, 0.75)',
        borderRadius: 6,
      },
      {
        label: 'عالي المخاطر',
        data: STAGE_DISTRIBUTION.map((item) => item.highRisk),
        backgroundColor: 'rgba(239, 68, 68, 0.75)',
        borderRadius: 6,
      },
    ],
  };

  const trendChartData = {
    labels: TREND_DATA.labels,
    datasets: [
      {
        label: 'Billed MTD',
        data: TREND_DATA.billed,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.35,
        pointRadius: 3,
      },
      {
        label: 'Collected MTD',
        data: TREND_DATA.collected,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  };

  const funnelChartData = {
    labels: FUNNEL_DATA.map((item) => item.stage),
    datasets: [
      {
        label: 'Lead Funnel',
        data: FUNNEL_DATA.map((item) => item.value),
        backgroundColor: ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'],
        borderRadius: 8,
      },
    ],
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(113 113 122)',
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgb(113 113 122)', font: { size: 11 } },
        grid: { color: 'rgba(148, 163, 184, 0.2)' },
      },
      y: {
        ticks: { color: 'rgb(113 113 122)', font: { size: 11 } },
        grid: { color: 'rgba(148, 163, 184, 0.2)' },
      },
    },
  };

  const funnelOptions = {
    ...commonChartOptions,
    indexAxis: 'y',
    plugins: {
      ...commonChartOptions.plugins,
      legend: { display: false },
    },
    scales: {
      x: {
        ...commonChartOptions.scales.x,
        beginAtZero: true,
      },
      y: {
        ...commonChartOptions.scales.y,
        grid: { display: false },
      },
    },
  };

  const hasActionRows = SMART_ACTION_ROWS.length > 0;

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl app-panel p-3 sm:p-4">
          <input
            type="text"
            placeholder="بحث بالإسم، رقم الهاتف، رقم الموكل"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-2.5 text-center text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {searchTerm ? (
        <DashboardSearch
          filteredClients={filteredClients}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
        />
      ) : (
        <div className="space-y-5 sm:space-y-6">
          <section className="sticky top-2 z-20 rounded-2xl border border-border/80 bg-background/95 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <ListFilter size={16} aria-hidden="true" />
              <span>فلاتر العمليات العامة</span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
              {FILTER_CONFIG.map((filter) => (
                <label key={filter.key} className="flex flex-col gap-1 text-xs text-muted-foreground">
                  {filter.label}
                  <select
                    aria-label={filter.label}
                    value={filters[filter.key]}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        [filter.key]: event.target.value,
                      }))
                    }
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {filter.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </section>

          <section className="app-panel p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-foreground">تنبيهات التشغيل الفورية</h2>
            {renderStateBlock({
              loading: officeLoading,
              error: '',
              empty: alertItems.length === 0,
              loadingText: 'جاري تحميل التنبيهات عالية الأولوية...',
              emptyText: 'لا توجد تنبيهات حرجة حاليًا.',
              children: (
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  {alertItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.key}
                        to={item.href}
                        className="group flex items-start gap-3 rounded-xl border border-border bg-background px-3 py-3 transition hover:border-primary/40 hover:bg-muted/30"
                      >
                        <span
                          className={`mt-0.5 rounded-full p-1.5 ${
                            item.tone === 'destructive'
                              ? 'bg-destructive/15 text-destructive'
                              : item.tone === 'warning'
                                ? 'bg-amber-500/15 text-amber-600'
                                : 'bg-primary/15 text-primary'
                          }`}
                        >
                          <Icon size={15} aria-hidden="true" />
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.value}</p>
                        </div>
                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              ),
            })}
          </section>

          <section className="space-y-3">
            {officeError && <p className="rounded-xl border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">{officeError}</p>}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {renderStateBlock({
                loading: officeLoading,
                error: '',
                empty: KPI_DEFINITIONS.length === 0,
                loadingText: 'جاري تجهيز مؤشرات الأداء الرئيسية...',
                emptyText: 'لا توجد مؤشرات للعرض حالياً.',
                children: KPI_DEFINITIONS.map((kpi) => (
                  <article key={kpi.key} className="card-premium p-4 sm:p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">{kpi.label}</p>
                    <p className="mt-3 text-2xl font-bold text-foreground">{formatValue(kpiValues[kpi.key], kpi.format, displayCurrency)}</p>
                  </article>
                )),
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {renderStateBlock({
              loading: officeLoading,
              error: '',
              empty: false,
              loadingText: 'جاري تحميل الرسوم التحليلية الأساسية...',
              emptyText: '',
              children: (
                <>
                  <article className="app-panel p-4 sm:p-5">
                    <h3 className="text-sm font-semibold text-foreground">Caseload by Stage</h3>
                    <p className="mb-3 text-xs text-muted-foreground">Stacked Bar • توزيع القضايا حسب المرحلة ومستوى المخاطر.</p>
                    <div className="h-72">
                      <Bar data={stageChartData} options={{ ...commonChartOptions, scales: { ...commonChartOptions.scales, x: { ...commonChartOptions.scales.x, stacked: true }, y: { ...commonChartOptions.scales.y, stacked: true } } }} />
                    </div>
                  </article>

                  <article className="app-panel p-4 sm:p-5">
                    <h3 className="text-sm font-semibold text-foreground">Billed vs Collected Trend</h3>
                    <p className="mb-3 text-xs text-muted-foreground">Line • مراقبة الأداء الشهري للتحصيل مقابل الفوترة.</p>
                    <div className="h-72">
                      <Line data={trendChartData} options={commonChartOptions} />
                    </div>
                  </article>

                  <article className="app-panel p-4 sm:p-5">
                    <h3 className="text-sm font-semibold text-foreground">Lead-to-Client Funnel</h3>
                    <p className="mb-3 text-xs text-muted-foreground">Horizontal Bar • رصد التسرب خلال مراحل التحويل.</p>
                    <div className="h-72">
                      <Bar data={funnelChartData} options={funnelOptions} />
                    </div>
                  </article>
                </>
              ),
            })}
          </section>

          <section className="app-panel p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">جدول المتابعة الذكي: الملفات الأكثر حاجة للتدخل</h3>
              <Link to="/dashboard/reports/cases" className="text-xs font-medium text-primary hover:underline">
                عرض جميع الملفات
              </Link>
            </div>
            {renderStateBlock({
              loading: officeLoading,
              error: '',
              empty: !hasActionRows,
              loadingText: 'جاري تحميل عناصر المتابعة العاجلة...',
              emptyText: 'لا توجد عناصر عاجلة حالياً.',
              children: (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[760px] border-collapse text-sm">
                    <thead className="bg-muted/40 text-foreground">
                      <tr>
                        <th className="px-3 py-2 text-start">رقم الملف</th>
                        <th className="px-3 py-2 text-start">الملف</th>
                        <th className="px-3 py-2 text-start">مستوى المخاطر</th>
                        <th className="px-3 py-2 text-start">الاستحقاق القادم</th>
                        <th className="px-3 py-2 text-start">المسؤول</th>
                        <th className="px-3 py-2 text-start">الأثر المالي</th>
                        <th className="px-3 py-2 text-start">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SMART_ACTION_ROWS.map((row) => (
                        <tr key={row.id} className="border-t border-border/80 hover:bg-muted/20">
                          <td className="px-3 py-2 font-semibold">{row.id}</td>
                          <td className="px-3 py-2">{row.matter}</td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                row.risk === 'مرتفع'
                                  ? 'bg-destructive/15 text-destructive'
                                  : 'bg-amber-500/15 text-amber-700'
                              }`}
                            >
                              {row.risk}
                            </span>
                          </td>
                          <td className="px-3 py-2">{row.nextDeadline}</td>
                          <td className="px-3 py-2">{row.owner}</td>
                          <td className="px-3 py-2">{row.amount}</td>
                          <td className="px-3 py-2">
                            <Link
                              to={row.href}
                              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium hover:bg-muted"
                            >
                              فتح الملف
                              <ExternalLink size={12} aria-hidden="true" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            })}
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
