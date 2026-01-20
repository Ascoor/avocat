import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSpinner } from '../../context/SpinnerContext';
import GlobalSpinner from '../common/Spinners/GlobalSpinner';
import { lazy } from 'react';

const Home = lazy(() => import('../dashboard/Dashboard'));
const ClientsAndUnClients = lazy(
  () => import('../../pages/ClientUnClientList.jsx'),
);
const LegalServiceList = lazy(() => import('../../pages/LegalServicList'));
const CourtSearch = lazy(() => import('../Reports/SearchCourt'));
const CaseTypeSet = lazy(() => import('../Courts/case_index.component'));
const FinancialDashboard = lazy(() => import('../Financially/index'));
const LegalCasesIndex = lazy(() => import('../../pages/LegalCaseList'));
const LegCaseDetails = lazy(() => import('../LegalCases/LegalCaseDetails'));
const ProfileUser = lazy(() => import('../Settings/ProfileUser'));
const Procedures = lazy(() => import('../../pages/ProceduresList'));
const SearchCourtsApi = lazy(() => import('../../pages/SearchCourtsApi.jsx'));
const LegalSessions = lazy(() => import('../Sessions/index.jsx'));

const NotFound = () => (
  <h1 className="text-center text-red-500">404 - Page Not Found</h1>
);

const AuthRoutes = () => {
  const { showSpinner, hideSpinner, loading } = useSpinner();
  const location = useLocation();

  useEffect(() => {
    showSpinner();
    hideSpinner();
  }, [location]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 min-h-screen relative overflow-hidden">
      {}
      {loading && <GlobalSpinner />}

      <Suspense fallback={<GlobalSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<ClientsAndUnClients />} />
          <Route path="/legcase-services" element={<LegalServiceList />} />
          <Route path="/court-search" element={<CourtSearch />} />
          <Route path="/cases_setting" element={<CaseTypeSet />} />
          <Route path="/legcases/show/:id" element={<LegCaseDetails />} />
          <Route path="/profile/:userId" element={<ProfileUser />} />
          <Route path="/legcases" element={<LegalCasesIndex />} />
          <Route path="/legal-sessions" element={<LegalSessions />} />
          <Route path="/search-courts-api" element={<SearchCourtsApi />} />
          <Route
            path="/managment-settings/procedures"
            element={<Procedures />}
          />
          <Route path="/financial-dashboard" element={<FinancialDashboard />} />

          {}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AuthRoutes;
