import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSpinner } from '@shared/contexts/SpinnerContext';
import GlobalSpinner from '@shared/components/common/Spinners/GlobalSpinner';
import PermissionGuard from '@shared/security/PermissionGuard';
import { permissionMap } from '@shared/security/permission-map';

const Home = lazy(
  () => import('@features/dashboard/components/dashboard/Dashboard'),
);
const ClientsAndUnClients = lazy(
  () => import('@features/clients/pages/ClientUnClientList'),
);
const LegalServiceList = lazy(
  () => import('@features/legal-services/pages/LegalServicList'),
);
const CourtSearch = lazy(
  () => import('@features/reports/components/Reports/SearchCourt'),
);
const CaseTypeSet = lazy(
  () => import('@features/courts/components/Courts/case_index.component'),
);
const FinanceLedgerPage = lazy(
  () => import('@features/finance/pages/FinanceLedgerPage'),
);
const CaseFinanceSummaryPage = lazy(
  () => import('@features/finance/pages/CaseFinanceSummaryPage'),
);
const CreateTransactionPage = lazy(
  () => import('@features/finance/pages/CreateTransactionPage'),
);
const LegalCasesIndex = lazy(
  () => import('@features/legal-cases/pages/LegalCaseList'),
);
const LegCaseDetails = lazy(
  () => import('@features/legal-cases/components/LegalCases/LegalCaseDetails'),
);
const ProfileUser = lazy(
  () => import('@features/settings/components/Settings/ProfileUser'),
);
const LawyerList = lazy(() => import('@features/lawyers/pages/LawyerList'));
const ManagmentSettings = lazy(
  () => import('@features/settings/pages/ManagmentSettings'),
);
const SearchCourtsApi = lazy(
  () => import('@features/courts/pages/SearchCourtsApi.jsx'),
);
const IconsGalleryPage = lazy(
  () => import('@features/icons-gallery/pages/IconsGalleryPage'),
);
const UiQaPage = lazy(() => import('@features/ui-qa/pages/UiQaPage'));
const AdminAccessManagementPage = lazy(
  () => import('@features/admin/pages/AdminAccessManagementPage'),
);
const QaRbacPage = lazy(() => import('@features/admin/pages/QaRbacPage'));
const ReportsIndex = lazy(() => import('@features/reports/pages/ReportsIndex'));
const SessionsReport = lazy(
  () => import('@features/reports/pages/SessionsReport'),
);
const ProceduresReport = lazy(
  () => import('@features/reports/pages/ProceduresReport'),
);
const ClientsReport = lazy(
  () => import('@features/reports/pages/ClientsReport'),
);
const CasesReport = lazy(() => import('@features/reports/pages/CasesReport'));
const ServicesReport = lazy(
  () => import('@features/reports/pages/ServicesReport'),
);

/**
 * Backward/forward compatible wrapper:
 * - supports both prop names: `permissions` (old) and `require` (new)
 * - passes both down to PermissionGuard so either implementation works.
 */
const Guarded = ({ require, permissions, match, moduleLabel, children }) => {
  const req = require ?? permissions;
  return (
    <PermissionGuard
      require={req}
      permissions={req}
      match={match}
      moduleLabel={moduleLabel}
    >
      {children}
    </PermissionGuard>
  );
};

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

          <Route
            path="customer-service"
            element={
              <Guarded
                require={permissionMap.clients.list}
                moduleLabel="Customer Service"
              >
                <ClientsAndUnClients />
              </Guarded>
            }
          />

          <Route
            path="clients"
            element={
              <Navigate to="/dashboard/customer-service?tab=clients" replace />
            }
          />
          <Route
            path="unclients"
            element={
              <Navigate
                to="/dashboard/customer-service?tab=unclients"
                replace
              />
            }
          />

          <Route
            path="legcase-services"
            element={
              <Guarded
                require={permissionMap.services.list}
                moduleLabel="Services"
              >
                <LegalServiceList />
              </Guarded>
            }
          />
          <Route
            path="court-search"
            element={
              <Guarded
                require={permissionMap.reports.view}
                moduleLabel="Court Search"
              >
                <CourtSearch />
              </Guarded>
            }
          />
          <Route
            path="office-settings"
            element={
              <Guarded
                require={permissionMap.settings.manage}
                moduleLabel="Office Settings"
              >
                <ManagmentSettings />
              </Guarded>
            }
          />

          <Route
            path="cases_setting"
            element={
              <Guarded
                require={permissionMap.courts.list}
                moduleLabel="Court Settings"
              >
                <CaseTypeSet />
              </Guarded>
            }
          />
          <Route
            path="lawyers"
            element={
              <Guarded
                require={permissionMap.lawyers.list}
                moduleLabel="Lawyers"
              >
                <LawyerList />
              </Guarded>
            }
          />
          <Route
            path="legcases/show/:id"
            element={
              <Guarded
                require={permissionMap.legalCases.view}
                moduleLabel="Case Details"
              >
                <LegCaseDetails />
              </Guarded>
            }
          />

          <Route path="profile/:userId" element={<ProfileUser />} />

          <Route
            path="legcases"
            element={
              <Guarded
                require={permissionMap.legalCases.list}
                moduleLabel="Legal Cases"
              >
                <LegalCasesIndex />
              </Guarded>
            }
          />

          <Route
            path="search-courts-api"
            element={
              <Guarded
                require={permissionMap.courts.search}
                moduleLabel="Courts"
              >
                <SearchCourtsApi />
              </Guarded>
            }
          />

          <Route
            path="reports"
            element={
              <Guarded
                require={permissionMap.reports.view}
                moduleLabel="Reports"
              >
                <ReportsIndex />
              </Guarded>
            }
          >
            <Route index element={<Navigate to="sessions" replace />} />
            <Route path="sessions" element={<SessionsReport />} />
            <Route path="procedures" element={<ProceduresReport />} />
            <Route path="clients" element={<ClientsReport />} />
            <Route path="cases" element={<CasesReport />} />
            <Route path="services" element={<ServicesReport />} />
          </Route>

          {/* legacy redirects */}
          <Route
            path="legal-sessions"
            element={<Navigate to="/dashboard/reports/sessions" replace />}
          />
          <Route
            path="procedures"
            element={<Navigate to="/dashboard/reports/procedures" replace />}
          />

          {/* tools */}
          <Route path="tools/icons" element={<IconsGalleryPage />} />
          <Route path="tools/qa" element={<UiQaPage />} />
          <Route path="tools/qa-rbac" element={<QaRbacPage />} />

          {/* admin */}
          <Route
            path="admin/access"
            element={
              <Guarded
                require={[
                  permissionMap.adminUsers.list,
                  permissionMap.adminRoles.list,
                  permissionMap.adminPermissions.list,
                ]}
                match="any"
                moduleLabel="Admin Access Management"
              >
                <AdminAccessManagementPage />
              </Guarded>
            }
          />
          <Route
            path="admin/users"
            element={
              <Navigate to="/dashboard/admin/access?tab=users" replace />
            }
          />
          <Route
            path="admin/roles"
            element={
              <Navigate to="/dashboard/admin/access?tab=roles" replace />
            }
          />
          <Route
            path="admin/permissions"
            element={
              <Navigate to="/dashboard/admin/access?tab=permissions" replace />
            }
          />

          <Route
            path="finance/ledger"
            element={
              <Guarded require={permissionMap.expenses.view} moduleLabel="Finance Ledger">
                <FinanceLedgerPage />
              </Guarded>
            }
          />
          <Route
            path="finance/case-summary"
            element={
              <Guarded require={permissionMap.expenses.view} moduleLabel="Case Finance Summary">
                <CaseFinanceSummaryPage />
              </Guarded>
            }
          />
          <Route
            path="finance/create-transaction"
            element={
              <Guarded require={permissionMap.expenses.create} moduleLabel="Create Finance Transaction">
                <CreateTransactionPage />
              </Guarded>
            }
          />

          <Route path="financial-dashboard" element={<Navigate to="/dashboard/finance/ledger" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AuthRoutes;
