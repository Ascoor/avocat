import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '@app/store/clientsSlice';
import { useThemeProvider } from '@shared/contexts/ThemeContext';
import api from '@shared/services/api/axiosConfig';
import DashboardSearch from './DashboardSearch';
import MainCard from '@shared/components/common/MainCard';
import HomeSpinner from '@shared/components/common/Spinners/HomeSpinner';
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
    lawyerCount: 0,
    serviceCount: 0,
    legalSessionCount: 0,
  });
  const { currentTheme } = useThemeProvider();
  const isDarkMode = currentTheme === 'dark';

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
        lawyerCount: response.data.lawyer_count || 0,
        serviceCount: response.data.service_count || 0,
        legalSessionCount: response.data.legal_session_count || 0,
      });
    } catch (error) {
      console.error('Error fetching office count:', error);
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
    <div className="p-4 mt-16 xl:max-w-7xl xl:mx-auto w-full">
      {}
      <div className="flex justify-center mb-6">
        <div className="flex w-full max-w-2xl app-panel p-4 animate-fade-in-up">
          <button
            onClick={() => handleSearch(searchTerm)}
            className="px-4 py-2 bg-primary text-white rounded-r-xl hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            بحث
          </button>
          <input
            type="text"
            placeholder="بحث بالإسم، رقم الهاتف، رقم الموكل"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-l-xl text-center bg-surface border-2 border-border text-foreground placeholder:text-muted focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {}
      {searchTerm ? (
        <DashboardSearch
          filteredClients={filteredClients}
          loading={loading}
          error={error}
        />
      ) : (
        <>
          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pb-4 animate-fade-in-up">
            <MainCard
              count={counts.legalSessionCount}
              icon={MainSessions}
              label="الجلسات"
              route="/legal-sessions"
            />
            <MainCard
              count={counts.legCaseCount}
              icon={MainLegalCases}
              label="القضايا"
            />
            <MainCard
              count={counts.procedureCount}
              icon={MainProcedures}
              label="الإجراءات"
            />
            <MainCard
              count={counts.clientCount}
              icon={MainClients}
              label="العملاء"
            />
          </div>

          {}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-4 animate-fade-in-up">
            <DashboardCard01 isDarkMode={isDarkMode} />
            <DashboardCard02 isDarkMode={isDarkMode} />
            <DashboardCard03 isDarkMode={isDarkMode} />
            <DashboardCard04 isDarkMode={isDarkMode} />
            <DashboardCard05 isDarkMode={isDarkMode} />
            <DashboardCard06 isDarkMode={isDarkMode} />
          </div>

          {}
          <Suspense fallback={<HomeSpinner />}>
            <div className="mt-10">
              <CalendarPage />
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Home;
