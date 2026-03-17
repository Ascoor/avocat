import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSpinner } from '@shared/contexts/SpinnerContext';
import GlobalSpinner from '@shared/components/common/Spinners/GlobalSpinner';
import PermissionGuard from '@shared/security/PermissionGuard';
import { permissionMap } from '@shared/security/permission-map';
import { dashboardRoutes } from '@routes/dashboardRoutes';
import { appRoutes } from '@routes/appRoutes';
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
          path={dashboardRoutes.customerService}
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
          path={dashboardRoutes.clientsLegacy}
          element={
            <Navigate to={`${appRoutes.dashboardBase}/${dashboardRoutes.customerService}?tab=clients`} replace />
          }
        />
        <Route
          path={dashboardRoutes.unclientsLegacy}
          element={
            <Navigate
              to={`${appRoutes.dashboardBase}/${dashboardRoutes.customerService}?tab=unclients`}
              replace
            />
          }
        />

        <Route
          path={dashboardRoutes.legalServices}
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
          path={dashboardRoutes.courtSearch}
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
          path={dashboardRoutes.officeSettings}
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
          path={dashboardRoutes.caseSettings}
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
          path={dashboardRoutes.lawyers}
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
          path={dashboardRoutes.legalCaseDetails}
          element={
            <Guarded
              require={permissionMap.legalCases.view}
              moduleLabel="Case Details"
            >
              <LegalCaseDetailsRoutePage />
            </Guarded>
          }
        />

        <Route path={dashboardRoutes.profile} element={<ProfileRoutePage />} />

        <Route
          path={dashboardRoutes.legalCases}
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
          path={dashboardRoutes.searchCourtsApi}
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
          path={dashboardRoutes.powerOfAttorneys}
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
          path={dashboardRoutes.documents}
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
          path={dashboardRoutes.reports}
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
          <Route path={dashboardRoutes.reportsSessions} element={<SessionsReportRoutePage />} />
          <Route path={dashboardRoutes.reportsProcedures} element={<ProceduresReportRoutePage />} />
          <Route path={dashboardRoutes.reportsClients} element={<ClientsReportRoutePage />} />
          <Route path={dashboardRoutes.reportsCases} element={<CasesReportRoutePage />} />
          <Route path={dashboardRoutes.reportsServices} element={<ServicesReportRoutePage />} />
        </Route>

        <Route
          path={dashboardRoutes.legalSessionsLegacy}
          element={<Navigate to={`${appRoutes.dashboardBase}/${dashboardRoutes.reports}/${dashboardRoutes.reportsSessions}`} replace />}
        />
        <Route
          path={dashboardRoutes.proceduresLegacy}
          element={<Navigate to={`${appRoutes.dashboardBase}/${dashboardRoutes.reports}/${dashboardRoutes.reportsProcedures}`} replace />}
        />

        <Route path={dashboardRoutes.toolsIcons} element={<IconsGalleryRoutePage />} />
        <Route path={dashboardRoutes.toolsQa} element={<UiQaRoutePage />} />
        <Route path={dashboardRoutes.toolsQaRbac} element={<QaRbacRoutePage />} />

        <Route
          path={dashboardRoutes.adminAccess}
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
          path={dashboardRoutes.adminUsersLegacy}
          element={
            <Navigate to={`${appRoutes.dashboardBase}/${dashboardRoutes.adminAccess}?tab=users`} replace />
          }
        />
        <Route
          path={dashboardRoutes.adminRolesLegacy}
          element={
            <Navigate to={`${appRoutes.dashboardBase}/${dashboardRoutes.adminAccess}?tab=roles`} replace />
          }
        />
        <Route
          path={dashboardRoutes.adminPermissionsLegacy}
          element={
            <Navigate to={`${appRoutes.dashboardBase}/${dashboardRoutes.adminAccess}?tab=permissions`} replace />
          }
        />

        <Route
          path={dashboardRoutes.financeLedger}
          element={
            <Guarded require={permissionMap.expenses.view} moduleLabel="Finance Ledger">
              <FinanceLedgerRoutePage />
            </Guarded>
          }
        />
        <Route
          path={dashboardRoutes.financeCaseSummary}
          element={
            <Guarded require={permissionMap.expenses.view} moduleLabel="Case Finance Summary">
              <CaseFinanceSummaryRoutePage />
            </Guarded>
          }
        />
        <Route
          path={dashboardRoutes.financeCreateTransaction}
          element={
            <Guarded require={permissionMap.expenses.create} moduleLabel="Create Finance Transaction">
              <CreateTransactionRoutePage />
            </Guarded>
          }
        />

        <Route path={dashboardRoutes.financialDashboardLegacy} element={<Navigate to={`${appRoutes.dashboardBase}/${dashboardRoutes.financeLedger}`} replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
