import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QaSectionCard from '../components/QaSectionCard';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { getStoredToken, getStoredUser } from '@shared/services/auth/authStorage';
import api from '@shared/services/api/axiosConfig';
import TableComponent from '@shared/components/common/TableComponent';
import { runTableChecks } from '../utils/qaChecks';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import {
  deleteLegCase,
  getLegCaseById,
  getLegCases,
} from '@shared/services/api/legalCases';
import {
  deleteClient,
  getClientById,
  getClients,
} from '@shared/services/api/clients';
import {
  deleteProcedure,
  getProcedureById,
  getProcedures,
  getProceduresByLegCaseId,
} from '@shared/services/api/procedures';
import AddEditLegCase from '@features/legal-cases/components/LegalCases/AddEditLegCase';
import AddEditClient from '@features/clients/components/ClientsAndUnClients/clients/AddEditClient';
import ProcedureModal from '@features/legal-cases/components/LegalCases/LegalCaseTools/Modals/ProcedureModal';

const UiQaPage = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [activityLog, setActivityLog] = useState([]);
  const [pingResult, setPingResult] = useState(null);
  const [isPinging, setIsPinging] = useState(false);
  const [testIds, setTestIds] = useState({ caseId: '', clientId: '', procedureId: '' });

  const [qaData, setQaData] = useState({
    legalCases: { data: [], loading: false, error: '' },
    clients: { data: [], loading: false, error: '' },
    procedures: { data: [], loading: false, error: '' },
  });

  const [modalState, setModalState] = useState({
    legalCase: { open: false, isEdit: false, data: null },
    client: { open: false, data: null },
    procedure: { open: false, isEdit: false, data: null },
  });

  const addLog = useCallback((entry) => {
    setActivityLog((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        time: new Date().toLocaleTimeString(),
        ...entry,
      },
      ...prev,
    ].slice(0, 15));
  }, []);

  useEffect(() => {
    addLog({ type: 'route', message: `${t('uiQa.activity.routeChanged')}: ${location.pathname}` });
  }, [addLog, location.pathname, t]);

  useEffect(() => {
    const requestId = api.interceptors.request.use(
      (config) => {
        addLog({
          type: 'api',
          message: `${config.method?.toUpperCase()} ${config.url}`,
        });
        return config;
      },
      (error) => {
        addLog({ type: 'error', message: t('uiQa.activity.requestFailed') });
        return Promise.reject(error);
      },
    );

    const responseId = api.interceptors.response.use(
      (response) => {
        addLog({
          type: 'api',
          message: `${response.status} ${response.config?.url}`,
        });
        return response;
      },
      (error) => {
        addLog({
          type: 'error',
          message: `${t('uiQa.activity.responseFailed')}: ${error?.response?.status || 'Network'}`,
        });
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestId);
      api.interceptors.response.eject(responseId);
    };
  }, [addLog, t]);

  const handlePing = async () => {
    setIsPinging(true);
    const started = performance.now();
    try {
      const res = await api.get('/legal-cases');
      setPingResult({
        ok: true,
        status: res.status,
        duration: Math.round(performance.now() - started),
      });
    } catch (error) {
      setPingResult({
        ok: false,
        status: error?.response?.status || 'Network',
        duration: Math.round(performance.now() - started),
      });
    } finally {
      setIsPinging(false);
    }
  };

  const updateQaData = (key, updater) => {
    setQaData((prev) => ({
      ...prev,
      [key]: typeof updater === 'function' ? updater(prev[key]) : updater,
    }));
  };

  const loadLegalCases = async () => {
    updateQaData('legalCases', { data: [], loading: true, error: '' });
    try {
      const res = await getLegCases();
      updateQaData('legalCases', { data: res.data || [], loading: false, error: '' });
    } catch (error) {
      updateQaData('legalCases', { data: [], loading: false, error: t('uiQa.errors.loadFailed') });
    }
  };

  const loadClients = async () => {
    updateQaData('clients', { data: [], loading: true, error: '' });
    try {
      const res = await getClients();
      updateQaData('clients', { data: res.data?.clients || [], loading: false, error: '' });
    } catch (error) {
      updateQaData('clients', { data: [], loading: false, error: t('uiQa.errors.loadFailed') });
    }
  };

  const loadProcedures = async () => {
    updateQaData('procedures', { data: [], loading: true, error: '' });
    try {
      const res = testIds.caseId
        ? await getProceduresByLegCaseId(testIds.caseId)
        : await getProcedures();
      updateQaData('procedures', { data: res.data || [], loading: false, error: '' });
    } catch (error) {
      updateQaData('procedures', { data: [], loading: false, error: t('uiQa.errors.loadFailed') });
    }
  };

  const viewOne = async (section) => {
    try {
      if (section === 'legalCases' && testIds.caseId) {
        await getLegCaseById(testIds.caseId);
        addLog({ type: 'info', message: t('uiQa.activity.viewSuccess') });
      }
      if (section === 'clients' && testIds.clientId) {
        await getClientById(testIds.clientId);
        addLog({ type: 'info', message: t('uiQa.activity.viewSuccess') });
      }
      if (section === 'procedures' && testIds.procedureId) {
        await getProcedureById(testIds.procedureId);
        addLog({ type: 'info', message: t('uiQa.activity.viewSuccess') });
      }
    } catch (error) {
      addLog({ type: 'error', message: t('uiQa.activity.viewFailed') });
    }
  };

  const confirmDelete = async (section) => {
    const ok = window.confirm(t('uiQa.actions.confirmDelete'));
    if (!ok) return;
    try {
      if (section === 'legalCases') {
        const first = qaData.legalCases.data?.[0];
        if (first?.id) await deleteLegCase(first.id);
      }
      if (section === 'clients') {
        const first = qaData.clients.data?.[0];
        if (first?.id) await deleteClient(first.id);
      }
      if (section === 'procedures') {
        const first = qaData.procedures.data?.[0];
        if (first?.id) await deleteProcedure(first.id);
      }
      addLog({ type: 'info', message: t('uiQa.activity.deleteSuccess') });
    } catch (error) {
      addLog({ type: 'error', message: t('uiQa.activity.deleteFailed') });
    }
  };

  const sectionLinks = useMemo(
    () => [
      { label: t('uiQa.sections.legalCases'), path: '/dashboard/legcases' },
      { label: t('uiQa.sections.clients'), path: '/dashboard/clients' },
      { label: t('uiQa.sections.courts'), path: '/dashboard/court-search' },
      { label: t('uiQa.sections.procedures'), path: '/dashboard/managment-settings/procedures' },
      { label: t('uiQa.sections.sessions'), path: '/dashboard/legal-sessions' },
      { label: t('uiQa.sections.settings'), path: '/dashboard/office-settings' },
      { label: t('uiQa.sections.finance'), path: '/dashboard/financial-dashboard' },
      { label: t('uiQa.sections.reports'), path: '/dashboard/court-search' },
    ],
    [t],
  );

  const tableSampleHeaders = useMemo(
    () => [
      { key: 'id', text: 'ID', sortable: true, searchable: true },
      { key: 'name', text: t('uiQa.tableInspector.columns.name'), sortable: true, searchable: true },
      {
        key: 'status',
        text: t('uiQa.tableInspector.columns.status'),
        sortable: true,
        searchable: true,
        searchValue: (row) => row.statusLabel,
      },
    ],
    [t],
  );

  const tableSampleData = useMemo(
    () => [
      { id: 'QA-001', name: 'Alpha', status: 'open', statusLabel: 'Open' },
      { id: 'QA-002', name: 'Bravo', status: 'closed', statusLabel: 'Closed' },
    ],
    [],
  );

  const tableSampleRenderers = useMemo(
    () => ({
      status: (row) => (
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-2 py-0.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {row.statusLabel}
        </span>
      ),
    }),
    [],
  );

  const legalCaseHeaders = useMemo(
    () => [
      { key: 'slug', text: t('legalCaseDetails.overview.caseNumber'), sortable: true },
      { key: 'title', text: t('legalCaseDetails.editForm.title'), sortable: true },
      { key: 'status', text: t('legalCaseDetails.overview.status'), sortable: true },
    ],
    [t],
  );

  const legalCaseRenderers = useMemo(
    () => ({
      status: (row) => (
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-2 py-0.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {row.status || t('legalCaseDetails.overview.unknown')}
        </span>
      ),
    }),
    [t],
  );

  const clientHeaders = useMemo(
    () => [
      { key: 'slug', text: t('legalCaseDetails.clients.table.slug') },
      { key: 'name', text: t('legalCaseDetails.clients.table.name') },
      { key: 'phone_number', text: t('legalCaseDetails.clients.table.phone') },
    ],
    [t],
  );

  const procedureHeaders = useMemo(
    () => [
      { key: 'procedure_type', text: t('legalCaseDetails.procedures.table.procedure') },
      { key: 'lawyer', text: t('legalCaseDetails.procedures.table.lawyer') },
      { key: 'date_end', text: t('legalCaseDetails.procedures.table.endDate') },
    ],
    [t],
  );

  const procedureRenderers = useMemo(
    () => ({
      procedure_type: (row) => row.procedure_type?.name || '-',
      lawyer: (row) => row.lawyer?.name || '-',
    }),
    [],
  );

  const tableChecks = useMemo(
    () =>
      runTableChecks({
        headers: tableSampleHeaders,
        data: tableSampleData,
        rowKey: 'id',
        customRenderers: tableSampleRenderers,
      }),
    [tableSampleData, tableSampleHeaders, tableSampleRenderers],
  );

  const token = getStoredToken();
  const user = getStoredUser();

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">{t('uiQa.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('uiQa.subtitle')}</p>
      </header>

      <QaSectionCard
        title={t('uiQa.auth.title')}
        description={t('uiQa.auth.subtitle')}
        iconName="shield"
        actions={
          <>
            {!token && (
              <button
                onClick={() => window.location.assign(`/login?next=${encodeURIComponent(location.pathname)}`)}
                className="pressable inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold"
              >
                <LexicraftIcon name="arrow-forward" size={16} isDirectional dir={isRTL ? 'rtl' : 'ltr'} />
                {t('uiQa.auth.openLogin')}
              </button>
            )}
            <button
              onClick={handlePing}
              className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <LexicraftIcon name="search" size={16} />
              {isPinging ? t('uiQa.auth.pinging') : t('uiQa.auth.ping')}
            </button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
            <div className="text-xs text-muted-foreground">{t('uiQa.auth.token')}</div>
            <div className="mt-2 font-semibold text-foreground">
              {token ? t('uiQa.auth.present') : t('uiQa.auth.missing')}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
            <div className="text-xs text-muted-foreground">{t('uiQa.auth.user')}</div>
            <div className="mt-2 font-semibold text-foreground">
              {user?.name || user?.email || t('uiQa.auth.anonymous')}
            </div>
          </div>
        </div>
        {pingResult && (
          <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span>{t('uiQa.auth.pingResult')}</span>
              <span className={pingResult.ok ? 'text-emerald-600' : 'text-destructive'}>
                {pingResult.ok ? t('uiQa.auth.pingOk') : t('uiQa.auth.pingFail')}
              </span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {t('uiQa.auth.status')}: {pingResult.status} · {t('uiQa.auth.duration')}: {pingResult.duration}ms
            </div>
          </div>
        )}
      </QaSectionCard>

      <QaSectionCard
        title={t('uiQa.navigator.title')}
        description={t('uiQa.navigator.subtitle')}
        iconName="briefcase"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {sectionLinks.map((section) => (
            <div key={section.path} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
              <span className="text-sm font-semibold text-foreground">{section.label}</span>
              <button
                onClick={() => navigate(section.path)}
                className="pressable inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold"
              >
                <LexicraftIcon name="arrow-forward" size={14} isDirectional dir={isRTL ? 'rtl' : 'ltr'} />
                {t('uiQa.navigator.openSection')}
              </button>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">{t('uiQa.activity.title')}</span>
            <span className="text-xs text-muted-foreground">{t('uiQa.activity.lastUpdates')}</span>
          </div>
          <div className="mt-3 space-y-2 text-xs text-muted-foreground">
            {activityLog.length === 0 ? (
              <div>{t('uiQa.activity.empty')}</div>
            ) : (
              activityLog.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between gap-4">
                  <span className="truncate">
                    <span className="font-semibold text-foreground">[{entry.type}]</span> {entry.message}
                  </span>
                  <span className="shrink-0">{entry.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </QaSectionCard>

      <QaSectionCard
        title={t('uiQa.crud.title')}
        description={t('uiQa.crud.subtitle')}
        iconName="document"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-sm font-semibold text-foreground">{t('uiQa.sections.legalCases')}</h4>
            <div className="mt-3 space-y-3">
              <input
                value={testIds.caseId}
                onChange={(event) => setTestIds((prev) => ({ ...prev, caseId: event.target.value }))}
                placeholder={t('uiQa.inputs.caseId')}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={loadLegalCases}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.loadList')}
                </button>
                <button
                  onClick={() => viewOne('legalCases')}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.viewOne')}
                </button>
                <button
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      legalCase: { open: true, isEdit: false, data: null },
                    }))
                  }
                  className="pressable rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                >
                  {t('uiQa.actions.openAddModal')}
                </button>
                <button
                  onClick={() => {
                    const first = qaData.legalCases.data?.[0];
                    if (!first) return;
                    setModalState((prev) => ({
                      ...prev,
                      legalCase: { open: true, isEdit: true, data: first },
                    }));
                  }}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.editFirst')}
                </button>
                <button
                  onClick={() => confirmDelete('legalCases')}
                  className="pressable rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
                >
                  {t('uiQa.actions.deleteFirst')}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-sm font-semibold text-foreground">{t('uiQa.sections.clients')}</h4>
            <div className="mt-3 space-y-3">
              <input
                value={testIds.clientId}
                onChange={(event) => setTestIds((prev) => ({ ...prev, clientId: event.target.value }))}
                placeholder={t('uiQa.inputs.clientId')}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={loadClients}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.loadList')}
                </button>
                <button
                  onClick={() => viewOne('clients')}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.viewOne')}
                </button>
                <button
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      client: { open: true, data: null },
                    }))
                  }
                  className="pressable rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                >
                  {t('uiQa.actions.openAddModal')}
                </button>
                <button
                  onClick={() => {
                    const first = qaData.clients.data?.[0];
                    if (!first) return;
                    setModalState((prev) => ({
                      ...prev,
                      client: { open: true, data: first },
                    }));
                  }}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.editFirst')}
                </button>
                <button
                  onClick={() => confirmDelete('clients')}
                  className="pressable rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
                >
                  {t('uiQa.actions.deleteFirst')}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-sm font-semibold text-foreground">{t('uiQa.sections.procedures')}</h4>
            <div className="mt-3 space-y-3">
              <input
                value={testIds.caseId}
                onChange={(event) => setTestIds((prev) => ({ ...prev, caseId: event.target.value }))}
                placeholder={t('uiQa.inputs.caseId')}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs"
              />
              <input
                value={testIds.procedureId}
                onChange={(event) => setTestIds((prev) => ({ ...prev, procedureId: event.target.value }))}
                placeholder={t('uiQa.inputs.procedureId')}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={loadProcedures}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.loadList')}
                </button>
                <button
                  onClick={() => viewOne('procedures')}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.viewOne')}
                </button>
                <button
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      procedure: { open: true, isEdit: false, data: null },
                    }))
                  }
                  className="pressable rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                >
                  {t('uiQa.actions.openAddModal')}
                </button>
                <button
                  onClick={() => {
                    const first = qaData.procedures.data?.[0];
                    if (!first) return;
                    setModalState((prev) => ({
                      ...prev,
                      procedure: { open: true, isEdit: true, data: first },
                    }));
                  }}
                  className="pressable rounded-full border border-border px-3 py-1 text-xs"
                >
                  {t('uiQa.actions.editFirst')}
                </button>
                <button
                  onClick={() => confirmDelete('procedures')}
                  className="pressable rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
                >
                  {t('uiQa.actions.deleteFirst')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </QaSectionCard>

      <QaSectionCard
        title={t('uiQa.adapters.title')}
        description={t('uiQa.adapters.subtitle')}
        iconName="tool"
      >
        <div className="space-y-6">
          <TableComponent
            title={t('uiQa.sections.legalCases')}
            data={qaData.legalCases.data}
            headers={legalCaseHeaders}
            customRenderers={legalCaseRenderers}
            loading={qaData.legalCases.loading}
            error={qaData.legalCases.error}
            onRetry={loadLegalCases}
            onView={(id) => navigate(`/dashboard/legcases/show/${id}`)}
            onEdit={(id) => {
              const row = qaData.legalCases.data?.find((item) => item.id === id);
              if (!row) return;
              setModalState((prev) => ({
                ...prev,
                legalCase: { open: true, isEdit: true, data: row },
              }));
            }}
            onDelete={async (id) => {
              const ok = window.confirm(t('uiQa.actions.confirmDelete'));
              if (!ok) return;
              try {
                await deleteLegCase(id);
                loadLegalCases();
                addLog({ type: 'info', message: t('uiQa.activity.deleteSuccess') });
              } catch (error) {
                addLog({ type: 'error', message: t('uiQa.activity.deleteFailed') });
              }
            }}
            onRowAction={(action, id) => addLog({ type: 'ui', message: `${action} ${id}` })}
          />

          <TableComponent
            title={t('uiQa.sections.clients')}
            data={qaData.clients.data}
            headers={clientHeaders}
            loading={qaData.clients.loading}
            error={qaData.clients.error}
            onRetry={loadClients}
            onView={(id) => navigate(`/dashboard/clients?focus=${id}`)}
            onEdit={(id) => {
              const row = qaData.clients.data?.find((item) => item.id === id);
              if (!row) return;
              setModalState((prev) => ({
                ...prev,
                client: { open: true, data: row },
              }));
            }}
            onDelete={async (id) => {
              const ok = window.confirm(t('uiQa.actions.confirmDelete'));
              if (!ok) return;
              try {
                await deleteClient(id);
                loadClients();
                addLog({ type: 'info', message: t('uiQa.activity.deleteSuccess') });
              } catch (error) {
                addLog({ type: 'error', message: t('uiQa.activity.deleteFailed') });
              }
            }}
            onRowAction={(action, id) => addLog({ type: 'ui', message: `${action} ${id}` })}
          />

          <TableComponent
            title={t('uiQa.sections.procedures')}
            data={qaData.procedures.data}
            headers={procedureHeaders}
            customRenderers={procedureRenderers}
            loading={qaData.procedures.loading}
            error={qaData.procedures.error}
            onRetry={loadProcedures}
            onEdit={(id) => {
              const row = qaData.procedures.data?.find((item) => item.id === id);
              if (!row) return;
              setModalState((prev) => ({
                ...prev,
                procedure: { open: true, isEdit: true, data: row },
              }));
            }}
            onDelete={async (id) => {
              const ok = window.confirm(t('uiQa.actions.confirmDelete'));
              if (!ok) return;
              try {
                await deleteProcedure(id);
                loadProcedures();
                addLog({ type: 'info', message: t('uiQa.activity.deleteSuccess') });
              } catch (error) {
                addLog({ type: 'error', message: t('uiQa.activity.deleteFailed') });
              }
            }}
            onRowAction={(action, id) => addLog({ type: 'ui', message: `${action} ${id}` })}
          />
        </div>
      </QaSectionCard>

      <QaSectionCard
        title={t('uiQa.tableInspector.title')}
        description={t('uiQa.tableInspector.subtitle')}
        iconName="search"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">{t('uiQa.tableInspector.checks')}</h4>
            <ul className="mt-3 space-y-2 text-xs">
              {tableChecks.map((check) => (
                <li key={check.id} className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">{check.label}</span>
                  <span className={check.pass ? 'text-emerald-600' : 'text-destructive'}>
                    {check.pass ? t('uiQa.status.pass') : t('uiQa.status.fail')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <TableComponent
              title={t('uiQa.tableInspector.sampleTable')}
              data={tableSampleData}
              headers={tableSampleHeaders}
              customRenderers={tableSampleRenderers}
              onView={(id) => addLog({ type: 'ui', message: `View ${id}` })}
              onEdit={(id) => addLog({ type: 'ui', message: `Edit ${id}` })}
              onDelete={(id) => addLog({ type: 'ui', message: `Delete ${id}` })}
              onRowAction={(action, id) => addLog({ type: 'ui', message: `${action} ${id}` })}
              qaMode
            />
          </div>
        </div>
      </QaSectionCard>

      {modalState.legalCase.open && (
        <AddEditLegCase
          isEditing={modalState.legalCase.isEdit}
          editingLegCase={modalState.legalCase.data}
          onClose={() => setModalState((prev) => ({ ...prev, legalCase: { open: false, isEdit: false, data: null } }))}
          fetchLegCases={loadLegalCases}
        />
      )}

      {modalState.client.open && (
        <AddEditClient
          isOpen={modalState.client.open}
          client={modalState.client.data}
          onClose={() => setModalState((prev) => ({ ...prev, client: { open: false, data: null } }))}
          onSaved={loadClients}
        />
      )}

      {modalState.procedure.open && (
        <ProcedureModal
          isOpen={modalState.procedure.open}
          onClose={() => setModalState((prev) => ({ ...prev, procedure: { open: false, isEdit: false, data: null } }))}
          onSubmit={loadProcedures}
          legalCaseId={testIds.caseId}
          initialData={modalState.procedure.data}
          isEdit={modalState.procedure.isEdit}
        />
      )}
    </div>
  );
};

export default UiQaPage;
