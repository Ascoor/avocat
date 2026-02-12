import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { Tabs, TabsList, TabsTrigger } from '@shared/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Scale, FileText } from 'lucide-react';
import {
  deleteLegCase,
  getCaseDetails,
  getCaseProcedures,
  getCaseSessions,
  getLegalAdsByLegCaseId,
} from '@shared/services/api/legalCases';
import {
  fetchWithCaseCache,
  invalidateCaseFetchCache,
} from '@shared/utils/caseFetchCache';
import { formatDate } from '@shared/i18n/formatters';
import KPICard from '../KPICard';
import StatusBadge from '../StatusBadge';
import SectionStateMessage from '../SectionStateMessage';
import { PageSkeleton, TableSkeleton } from '../SkeletonLoaders';

const Procedure = lazy(() => import('./LegalCaseTools/LegalCaseProcedures'));
const LegalSession = lazy(() => import('./LegalCaseTools/LegalCaseSessions'));
const LegalCaseAds = lazy(() => import('./LegalCaseTools/LegalCaseAds'));
const LegCaseClients = lazy(() => import('./LegalCaseTools/LegalCaseClients'));
const LegalCaseCourts = lazy(() => import('./LegalCaseTools/LegCaseCourts'));
const LegalCaseOverview = lazy(
  () => import('./LegalCaseTools/LegalCaseOverview'),
);
const AddEditLegCase = lazy(() => import('./AddEditLegCase'));

export default function LegCaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, isRTL, language } = useLanguage();

  const [legCase, setLegCase] = useState(null);
  const [legcaseClients, setLegcaseClients] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [procedureSignal, setProcedureSignal] = useState(0);
  const [sessionSignal, setSessionSignal] = useState(0);
  const [sectionsState, setSectionsState] = useState({
    procedures: { data: [], loading: false, error: '' },
    sessions: { data: [], loading: false, error: '' },
    ads: { data: [], loading: false, error: '' },
  });

  const updateSectionState = useCallback((key, updater) => {
    setSectionsState((prev) => ({
      ...prev,
      [key]: typeof updater === 'function' ? updater(prev[key]) : updater,
    }));
  }, []);

  const fetchLegCase = useCallback(async () => {
    if (!id) {
      setError(t('legalCaseDetails.errors.missingId'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetchWithCaseCache({
        key: `legal-case:${id}`,
        fetcher: () =>
          getCaseDetails(id, {
            include:
              'clients,courts,caseType,caseSubType,procedures,procedures.procedureType,legalSessions,legalSessions.court,legalSessions.legalSessionType,services',
          }),
      });

      const legCaseData = response.data?.data || response.data?.leg_case;
      if (!legCaseData) throw new Error('Missing case data');

      setLegCase(legCaseData);
      setLegcaseClients(legCaseData.clients || []);
    } catch {
      setError(t('legalCaseDetails.errors.fetchFailed'));
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  const fetchSection = useCallback(
    async (key, fetcher) => {
      if (!id) return;
      updateSectionState(key, (p) => ({ ...p, loading: true, error: '' }));
      try {
        const data = await fetchWithCaseCache({
          key: `legal-case:${id}:${key}`,
          fetcher,
        });
        updateSectionState(key, { data, loading: false, error: '' });
      } catch {
        updateSectionState(key, (p) => ({
          ...p,
          loading: false,
          error: t(`legalCaseDetails.${key}.errors.fetch`),
        }));
      }
    },
    [id, t, updateSectionState],
  );

  const fetchProcedures = useCallback(
    () =>
      fetchSection('procedures', async () => {
        const r = await getCaseProcedures(id);
        return r.data?.data || r.data || [];
      }),
    [fetchSection, id],
  );

  const fetchSessions = useCallback(
    () =>
      fetchSection('sessions', async () => {
        const r = await getCaseSessions(id);
        return r.data?.data || r.data || [];
      }),
    [fetchSection, id],
  );

  const fetchAds = useCallback(
    () =>
      fetchSection('ads', async () => {
        const r = await getLegalAdsByLegCaseId(id);
        if (Array.isArray(r.data)) return r.data;
        if (Array.isArray(r.data?.data)) return r.data.data;
        return [];
      }),
    [fetchSection, id],
  );

  const refreshSection = useCallback(
    (key) => {
      invalidateCaseFetchCache(`legal-case:${id}:${key}`);
      if (key === 'procedures') return fetchProcedures();
      if (key === 'sessions') return fetchSessions();
      return fetchAds();
    },
    [fetchAds, fetchProcedures, fetchSessions, id],
  );

  useEffect(() => {
    fetchLegCase();
  }, [fetchLegCase]);

  useEffect(() => {
    if (!legCase) return;
    Promise.allSettled([fetchProcedures(), fetchSessions(), fetchAds()]);
  }, [legCase, fetchProcedures, fetchSessions, fetchAds]);

  const kpiCards = useMemo(() => {
    const sessionsData = sectionsState.sessions.data || [];
    const nextSession = sessionsData
      .filter((s) => s.session_date && new Date(s.session_date) > new Date())
      .sort((a, b) => new Date(a.session_date) - new Date(b.session_date))[0];

    return [
      {
        icon: Briefcase,
        label: t('legalCaseDetails.kpi.totalReports'),
        value:
          sessionsData.length +
          (sectionsState.procedures.data || []).length +
          (sectionsState.ads.data || []).length,
      },
      {
        icon: Calendar,
        label: t('legalCaseDetails.kpi.nextSession'),
        value: nextSession
          ? formatDate(nextSession.session_date, language)
          : t('legalCaseDetails.kpi.noUpcoming'),
      },
      {
        icon: Scale,
        label: t('legalCaseDetails.kpi.totalSessions'),
        value: sessionsData.length,
      },
      {
        icon: FileText,
        label: t('legalCaseDetails.kpi.totalProcedures'),
        value: (sectionsState.procedures.data || []).length,
      },
    ];
  }, [sectionsState, t, language]);

  const handleDeleteCase = async () => {
    if (!id) return;
    const confirmed = window.confirm(t('legalCaseDetails.actions.confirmDelete'));
    if (!confirmed) return;
    try {
      await deleteLegCase(id);
      navigate('/dashboard/legcases');
    } catch {
      setError(t('legalCaseDetails.errors.deleteFailed'));
    }
  };

  if (loading) return <PageSkeleton />;

  if (error || !legCase) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <SectionStateMessage
          type="error"
          title={t('legalCaseDetails.errors.title')}
          message={error || t('legalCaseDetails.errors.empty')}
          retryLabel={t('legalCaseDetails.actions.retry')}
          onRetry={fetchLegCase}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[hsl(var(--color-text))]">
              {legCase?.title || t('legalCaseDetails.titleFallback')}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <StatusBadge status={legCase?.status} lang={language === 'ar' ? 'ar' : 'en'} />
              <span className="text-sm text-[hsl(var(--color-muted))]">{legCase?.slug || legCase?.id || '-'}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setEditModalOpen(true)} className="pressable inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold">
              <LexicraftIcon name="tool" size={16} />
              {t('legalCaseDetails.actions.edit')}
            </button>
            <button onClick={handleDeleteCase} className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm font-semibold text-destructive">
              <LexicraftIcon name="shield" size={16} />
              {t('legalCaseDetails.actions.delete')}
            </button>
          </div>
        </div>
      </motion.header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card, idx) => (
          <KPICard key={card.label} icon={card.icon} label={card.label} value={card.value} delay={idx * 0.05} />
        ))}
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-0">
        <TabsList className="flex w-full flex-wrap gap-1.5 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-2))]/50 p-1.5">
          {['overview', 'clients', 'courts', 'procedures', 'sessions', 'ads'].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="relative rounded-xl px-4 py-2.5 text-sm font-medium capitalize">
              {t(`legalCaseDetails.tabs.${tab}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4 rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4 md:p-6 shadow-sm">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Suspense fallback={<TableSkeleton />}>
                {activeTab === 'overview' && (
                  <LegalCaseOverview
                    legCase={legCase}
                    sessions={sectionsState.sessions.data}
                    procedures={sectionsState.procedures.data}
                    ads={sectionsState.ads.data}
                    clients={legcaseClients}
                    onOpenTab={(tab) => setActiveTab(tab)}
                  />
                )}
                {activeTab === 'clients' && (
                  <LegCaseClients
                    legCaseId={id}
                    fetchLegcaseClients={fetchLegCase}
                    legcaseClients={legcaseClients}
                  />
                )}
                {activeTab === 'courts' && <LegalCaseCourts legCase={legCase} fetchLegCase={fetchLegCase} />}
                {activeTab === 'procedures' && (
                  <Procedure
                    legCaseId={id}
                    openAddSignal={procedureSignal}
                    procedures={sectionsState.procedures.data}
                    loading={sectionsState.procedures.loading}
                    error={sectionsState.procedures.error}
                    onRefresh={() => refreshSection('procedures')}
                  />
                )}
                {activeTab === 'sessions' && (
                  <LegalSession
                    legCaseId={id}
                    openAddSignal={sessionSignal}
                    sessions={sectionsState.sessions.data}
                    loading={sectionsState.sessions.loading}
                    error={sectionsState.sessions.error}
                    onRefresh={() => refreshSection('sessions')}
                  />
                )}
                {activeTab === 'ads' && (
                  <LegalCaseAds
                    legCaseId={id}
                    legalAds={sectionsState.ads.data}
                    loading={sectionsState.ads.loading}
                    error={sectionsState.ads.error}
                    onRefresh={() => refreshSection('ads')}
                  />
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>

      {editModalOpen && (
        <Suspense fallback={<TableSkeleton />}>
          <AddEditLegCase
            isEditing
            editingLegCase={legCase}
            onClose={() => setEditModalOpen(false)}
            fetchLegCases={fetchLegCase}
          />
        </Suspense>
      )}
    </div>
  );
}
