import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSpinner } from '@shared/contexts/SpinnerContext';
import GlobalSpinner from '@shared/components/common/Spinners/GlobalSpinner';
import { lazy } from 'react';

const Home = lazy(() => import('@features/dashboard/components/dashboard/Dashboard'));
const ClientsAndUnClients = lazy(
  () => import('@features/clients/pages/ClientUnClientList'),
);
const LegalServiceList = lazy(() => import('@features/legal-services/pages/LegalServicList'));
const CourtSearch = lazy(() => import('@features/reports/components/Reports/SearchCourt'));
const CaseTypeSet = lazy(() => import('@features/courts/components/Courts/case_index.component'));
const FinancialDashboard = lazy(() => import('@features/finance/components/Financially/index'));
const LegalCasesIndex = lazy(() => import('@features/legal-cases/pages/LegalCaseList'));
const LegCaseDetails = lazy(() => import('@features/legal-cases/components/LegalCases/LegalCaseDetails'));
const ProfileUser = lazy(() => import('@features/settings/components/Settings/ProfileUser'));
const Procedures = lazy(() => import('@features/procedures/pages/ProceduresList'));
const LawyerList = lazy(() => import('@features/lawyers/pages/LawyerList'));
const SearchCourtsApi = lazy(() => import('@features/courts/pages/SearchCourtsApi.jsx'));
const LegalSessions = lazy(() => import('@features/sessions/components/Sessions/index.jsx'));
const IconsGalleryPage = lazy(() => import('@features/icons-gallery/pages/IconsGalleryPage'));
const UiQaPage = lazy(() => import('@features/ui-qa/pages/UiQaPage'));
const AdminUsersPage = lazy(() => import('@features/admin/pages/AdminUsersPage'));
const AdminRolesPage = lazy(() => import('@features/admin/pages/AdminRolesPage'));
const AdminPermissionsPage = lazy(() => import('@features/admin/pages/AdminPermissionsPage'));
const QaRbacPage = lazy(() => import('@features/admin/pages/QaRbacPage'));
const ProcedureSearch = lazy(() => import('@/features/reports/components/Reports/procedure_search.component'));

const NotFound = () => (
  <h1 className="text-center text-red-500">404 - Page Not Found</h1>
);

const AuthRoutes = () => {
  const { showSpinner, hideSpinner, loading } = useSpinner();
  const location = useLocation();

  useEffect(() => {
    showSpinner();
    hideSpinner();
  }, [location, showSpinner, hideSpinner]);

  return (
    <>
      {loading && <GlobalSpinner />}

      <Suspense fallback={<GlobalSpinner />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="clients" element={<ClientsAndUnClients />} />
          <Route path="legcase-services" element={<LegalServiceList />} />
          <Route path="court-search" element={<CourtSearch />} />
          <Route path="cases_setting" element={<CaseTypeSet />} />
          <Route path="lawyers" element={<LawyerList />} />
          <Route path="legcases/show/:id" element={<LegCaseDetails />} />
          <Route path="profile/:userId" element={<ProfileUser />} />
          <Route path="legcases" element={<LegalCasesIndex />} />
          <Route path="legal-sessions" element={<LegalSessions />} />
          <Route path="search-courts-api" element={<SearchCourtsApi />} />
          <Route path="tools/icons" element={<IconsGalleryPage />} />
          <Route path="tools/qa" element={<UiQaPage />} />
          <Route path="tools/qa-rbac" element={<QaRbacPage />} />
          <Route path="admin/users" element={<AdminUsersPage />} />
          <Route path="admin/roles" element={<AdminRolesPage />} />
          <Route path="admin/permissions" element={<AdminPermissionsPage />} />
          <Route
            path="procedures"
            element={<ProcedureSearch />}
          />
          <Route path="financial-dashboard" element={<FinancialDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AuthRoutes;
