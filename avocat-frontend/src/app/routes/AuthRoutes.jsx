import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSpinner } from '@shared/contexts/SpinnerContext';
import GlobalSpinner from '@shared/components/common/Spinners/GlobalSpinner';
import PermissionGuard from '@shared/security/PermissionGuard';
import { permissionMap } from '@shared/security/permission-map';
import {
  AdminAccessRoutePage,
  CaseFinanceSummaryRoutePage,
  CasesReportRoutePage,
  CaseSettingsRoutePage,
  ClientsReportRoutePage,
  CourtSearchRoutePage,
  CreateTransactionRoutePage,
  CustomerServiceRoutePage,
  DashboardHomeRoutePage,
  DocumentsRoutePage,
  FinanceLedgerRoutePage,
  IconsGalleryRoutePage,
  LawyersRoutePage,
  LegalCaseDetailsRoutePage,
  LegalCasesRoutePage,
  LegalServicesRoutePage,
  OfficeSettingsRoutePage,
  PowerOfAttorneysRoutePage,
  ProceduresReportRoutePage,
  ProfileRoutePage,
  QaRbacRoutePage,
  ReportsOverviewRoutePage,
  ReportsRoutePage,
  SearchCourtsApiRoutePage,
  ServicesReportRoutePage,
  SessionsReportRoutePage,
  UiQaRoutePage,
} from '@pages/dashboard/DashboardRoutePages';

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

      <Routes>
        <Route index element={<DashboardHomeRoutePage />} />

        <Route
          path="customer-service"
          element={
            <Guarded
              require={permissionMap.clients.list}
              moduleLabel="Customer Service"
            >
              <CustomerServiceRoutePage />
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
              <LegalServicesRoutePage />
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
              <CourtSearchRoutePage />
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
              <OfficeSettingsRoutePage />
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
              <CaseSettingsRoutePage />
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
              <LawyersRoutePage />
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
              <LegalCaseDetailsRoutePage />
            </Guarded>
          }
        />

        <Route path="profile/:userId" element={<ProfileRoutePage />} />

        <Route
          path="legcases"
          element={
            <Guarded
              require={permissionMap.legalCases.list}
              moduleLabel="Legal Cases"
            >
              <LegalCasesRoutePage />
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
              <SearchCourtsApiRoutePage />
            </Guarded>
          }
        />

        <Route
          path="power-of-attorneys"
          element={
            <Guarded
              require={permissionMap.legalCases.list}
              moduleLabel="Power of Attorneys"
            >
              <PowerOfAttorneysRoutePage />
            </Guarded>
          }
        />

        <Route
          path="documents"
          element={
            <Guarded
              require={permissionMap.reports.view}
              moduleLabel="Documents Center"
            >
              <DocumentsRoutePage />
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
              <ReportsRoutePage />
            </Guarded>
          }
        >
          <Route index element={<ReportsOverviewRoutePage />} />
          <Route path="sessions" element={<SessionsReportRoutePage />} />
          <Route path="procedures" element={<ProceduresReportRoutePage />} />
          <Route path="clients" element={<ClientsReportRoutePage />} />
          <Route path="cases" element={<CasesReportRoutePage />} />
          <Route path="services" element={<ServicesReportRoutePage />} />
        </Route>

        <Route
          path="legal-sessions"
          element={<Navigate to="/dashboard/reports/sessions" replace />}
        />
        <Route
          path="procedures"
          element={<Navigate to="/dashboard/reports/procedures" replace />}
        />

        <Route path="tools/icons" element={<IconsGalleryRoutePage />} />
        <Route path="tools/qa" element={<UiQaRoutePage />} />
        <Route path="tools/qa-rbac" element={<QaRbacRoutePage />} />

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
              <AdminAccessRoutePage />
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
              <FinanceLedgerRoutePage />
            </Guarded>
          }
        />
        <Route
          path="finance/case-summary"
          element={
            <Guarded require={permissionMap.expenses.view} moduleLabel="Case Finance Summary">
              <CaseFinanceSummaryRoutePage />
            </Guarded>
          }
        />
        <Route
          path="finance/create-transaction"
          element={
            <Guarded require={permissionMap.expenses.create} moduleLabel="Create Finance Transaction">
              <CreateTransactionRoutePage />
            </Guarded>
          }
        />

        <Route path="financial-dashboard" element={<Navigate to="/dashboard/finance/ledger" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
