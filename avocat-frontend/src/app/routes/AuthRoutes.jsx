import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
const LawyerList = lazy(() => import('@features/lawyers/pages/LawyerList'));
const SearchCourtsApi = lazy(() => import('@features/courts/pages/SearchCourtsApi.jsx'));
const IconsGalleryPage = lazy(() => import('@features/icons-gallery/pages/IconsGalleryPage'));
const UiQaPage = lazy(() => import('@features/ui-qa/pages/UiQaPage'));
const AdminUsersPage = lazy(() => import('@features/admin/pages/AdminUsersPage'));
const AdminRolesPage = lazy(() => import('@features/admin/pages/AdminRolesPage'));
const AdminPermissionsPage = lazy(() => import('@features/admin/pages/AdminPermissionsPage'));
const QaRbacPage = lazy(() => import('@features/admin/pages/QaRbacPage'));
const ReportsIndex = lazy(() => import('@features/reports/pages/ReportsIndex'));
const SessionsReport = lazy(() => import('@features/reports/pages/SessionsReport'));
const ProceduresReport = lazy(() => import('@features/reports/pages/ProceduresReport'));
const ClientsReport = lazy(() => import('@features/reports/pages/ClientsReport'));
const CasesReport = lazy(() => import('@features/reports/pages/CasesReport'));
const ServicesReport = lazy(() => import('@features/reports/pages/ServicesReport'));

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
          <Route path="search-courts-api" element={<SearchCourtsApi />} />
          <Route path="reports" element={<ReportsIndex />}>
            <Route index element={<Navigate to="sessions" replace />} />
            <Route path="sessions" element={<SessionsReport />} />
            <Route path="procedures" element={<ProceduresReport />} />
            <Route path="clients" element={<ClientsReport />} />
            <Route path="cases" element={<CasesReport />} />
            <Route path="services" element={<ServicesReport />} />
          </Route>

          <Route path="legal-sessions" element={<Navigate to="/dashboard/reports/sessions" replace />} />
          <Route path="procedures" element={<Navigate to="/dashboard/reports/procedures" replace />} />
          <Route path="tools/icons" element={<IconsGalleryPage />} />
          <Route path="tools/qa" element={<UiQaPage />} />
          <Route path="tools/qa-rbac" element={<QaRbacPage />} />
          <Route path="admin/users" element={<AdminUsersPage />} />
          <Route path="admin/roles" element={<AdminRolesPage />} />
          <Route path="admin/permissions" element={<AdminPermissionsPage />} />
          <Route path="financial-dashboard" element={<FinancialDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AuthRoutes;
