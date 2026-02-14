import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '@app/store/clientsSlice';
import api from '@shared/services/api/axiosConfig';
import DashboardSearch from './DashboardSearch';
import DashboardSectionHeader from './ui/DashboardSectionHeader';
import KpiCard from './ui/KpiCard';
import DashboardSkeleton from './ui/DashboardSkeleton';
import {
  MainSessions,
  MainLegalCases,
  MainProcedures,
  MainClients,
} from '@assets/icons/index';

const DashboardCard01 = lazy(() => import('./dashboard/DashboardCard01'));
const DashboardCard02 = lazy(() => import('./dashboard/DashboardCard02'));
const DashboardCard03 = lazy(() => import('./dashboard/DashboardCard03'));
const DashboardCard04 = lazy(() => import('./dashboard/DashboardCard04'));
const DashboardCard05 = lazy(() => import('./dashboard/DashboardCard05'));
const DashboardCard06 = lazy(() => import('./dashboard/DashboardCard06'));
const CalendarPage = lazy(() => import('@features/calendar/CalendarPage'));

const Home = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.clients);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [counts, setCounts] = useState({
    clientCount: 0,
    legCaseCount: 0,
    procedureCount: 0,
    legalSessionCount: 0,
  });

  useEffect(() => {
    dispatch(fetchClients());
    fetchOfficeCount();
  }, [dispatch]);

  const fetchOfficeCount = async () => {
    try {
      const response = await api.get('/all_count_office');
      setCounts({
        clientCount: response.data.client_count || 0,
        legCaseCount: response.data.leg_case_count || 0,
        procedureCount: response.data.procedure_count || 0,
        legalSessionCount: response.data.legal_session_count || 0,
      });
    } catch (fetchError) {
      console.error('Error fetching office count:', fetchError);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClients([]);
      return;
    }

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const result = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(normalizedSearchTerm) ||
        client.slug.includes(normalizedSearchTerm),
    );

    setFilteredClients(result.slice(0, 5));
  }, [searchTerm, clients]);

  return (
    <div className="w-full space-y-6 pt-16 xl:mx-auto xl:max-w-7xl">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-custom-sm">
        <DashboardSectionHeader
          icon="🏛️"
          title="لوحة التحكم"
          description="متابعة القضايا والجلسات والموكلين من مكان واحد بتصميم هادئ ومتسق."
          badge="نظرة عامة"
          tone="info"
        />
        <div className="mt-5 flex w-full items-center overflow-hidden rounded-xl border border-border bg-surface-raised">
          <input
            type="text"
            placeholder="بحث بالإسم، رقم الهاتف، رقم الموكل"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full bg-transparent px-4 py-3 text-center text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <span className="border-s border-border bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
            بحث
          </span>
        </div>
      </section>

      {searchTerm ? (
        <DashboardSearch
          filteredClients={filteredClients}
          loading={loading}
          error={error}
        />
      ) : (
        <>
          <section className="space-y-4">
            <DashboardSectionHeader
              icon="📌"
              title="المؤشرات الرئيسية"
              description="أرقام محدثة تعكس حجم العمل الحالي داخل المكتب."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard
                count={counts.legalSessionCount}
                icon={MainSessions}
                label="الجلسات"
                route="/legal-sessions"
              />
              <KpiCard count={counts.legCaseCount} icon={MainLegalCases} label="القضايا" />
              <KpiCard count={counts.procedureCount} icon={MainProcedures} label="الإجراءات" />
              <KpiCard count={counts.clientCount} icon={MainClients} label="العملاء" />
            </div>
          </section>

          <section className="space-y-4">
            <DashboardSectionHeader
              icon="📈"
              title="التحليلات"
              description="رؤية دقيقة للأداء الشهري وتوزيع الأعمال ومؤشرات الكفاءة."
            />
            <Suspense fallback={<DashboardSkeleton />}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DashboardCard01 />
                <DashboardCard02 />
                <DashboardCard03 />
                <DashboardCard04 />
                <DashboardCard05 />
                <DashboardCard06 />
              </div>
            </Suspense>
          </section>

          <Suspense fallback={<DashboardSkeleton />}>
            <section className="space-y-4">
              <DashboardSectionHeader
                icon="🗓️"
                title="التقويم"
                description="عرض سريع للمهام والجلسات القادمة لضمان الجاهزية."
              />
              <div className="rounded-2xl border border-border bg-card p-5 shadow-custom-sm">
                <CalendarPage />
              </div>
            </section>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Home;
