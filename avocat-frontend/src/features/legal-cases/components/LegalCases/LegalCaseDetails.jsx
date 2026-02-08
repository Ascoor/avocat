import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import api from '@shared/services/api/axiosConfig';

const Procedure = lazy(() => import('./LegalCaseTools/LegalCaseProcedures'));
const LegalSession = lazy(() => import('./LegalCaseTools/LegalCaseSessions'));
const LegalCaseAds = lazy(() => import('./LegalCaseTools/LegalCaseAds'));
const LegCaseClients = lazy(() => import('./LegalCaseTools/LegalCaseClients'));
const LegalCaseCourts = lazy(() => import('./LegalCaseTools/LegCaseCourts'));
const AddEditLegCase = lazy(() => import('./AddEditLegCase'));

const OverviewSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="rounded-2xl border border-border bg-card p-5 shadow-sm"
      >
        <div className="h-4 w-1/2 rounded-full skeleton-shimmer" />
        <div className="mt-3 h-6 w-3/4 rounded-full skeleton-shimmer" />
        <div className="mt-4 h-3 w-1/3 rounded-full skeleton-shimmer" />
      </div>
    ))}
  </div>
);

export default function LegCaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [legCase, setLegCase] = useState(null);
  const [legcaseClients, setLegcaseClients] = useState([]);
  const [activeTab, setActiveTab] = useState('clients');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [procedureSignal, setProcedureSignal] = useState(0);
  const [sessionSignal, setSessionSignal] = useState(0);

  const fetchLegCase = async () => {
    if (!id) {
      setError(t('legalCaseDetails.errors.missingId'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/legal-cases/${id}`);
      const legCaseData = response.data?.leg_case;
      if (!legCaseData) {
        throw new Error('Missing case data');
      }
      setLegCase(legCaseData);
      setLegcaseClients(legCaseData.clients || []);
    } catch (err) {
      setError(t('legalCaseDetails.errors.fetchFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLegCase();
  }, [id]);

  const handleDeleteCase = async () => {
    if (!id) return;
    const confirmed = window.confirm(t('legalCaseDetails.actions.confirmDelete'));
    if (!confirmed) return;
    try {
      await api.delete(`/legal-cases/${id}`);
      navigate('/dashboard/legcases');
    } catch (err) {
      setError(t('legalCaseDetails.errors.deleteFailed'));
    }
  };

  const overviewCards = useMemo(
    () => [
      {
        key: 'caseNumber',
        label: t('legalCaseDetails.overview.caseNumber'),
        value: legCase?.slug || legCase?.id || '-',
        icon: 'document',
      },
      {
        key: 'status',
        label: t('legalCaseDetails.overview.status'),
        value: legCase?.status || t('legalCaseDetails.overview.unknown'),
        icon: 'scales',
      },
      {
        key: 'clients',
        label: t('legalCaseDetails.overview.clients'),
        value: legcaseClients?.length ?? 0,
        icon: 'users',
      },
      {
        key: 'courts',
        label: t('legalCaseDetails.overview.courts'),
        value: legCase?.courts?.length ?? 0,
        icon: 'court',
      },
    ],
    [legCase, legcaseClients, t],
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="h-32 rounded-3xl border border-border bg-card shadow-sm skeleton-shimmer" />
        <div className="mt-6">
          <OverviewSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center text-destructive">
          <div className="text-lg font-semibold">{error}</div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={fetchLegCase}
              className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-background px-4 py-2 text-sm font-semibold"
            >
              <LexicraftIcon name="arrow-forward" size={18} isDirectional dir={isRTL ? 'rtl' : 'ltr'} />
              {t('legalCaseDetails.actions.retry')}
            </button>
            <button
              onClick={() => navigate('/dashboard/legcases')}
              className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              {t('legalCaseDetails.actions.backToCases')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <header className="sticky top-4 z-10 rounded-3xl border border-border bg-card/95 p-6 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <LexicraftIcon name="briefcase" size={26} />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {legCase?.title || t('legalCaseDetails.titleFallback')}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t('legalCaseDetails.subtitle')} · {legCase?.case_sub_type?.name || '-'}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
                <LexicraftIcon name="document" size={16} />
                {t('legalCaseDetails.overview.caseNumber')}: {legCase?.slug || legCase?.id || '-'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
                <LexicraftIcon name="calendar" size={16} />
                {t('legalCaseDetails.overview.createdDate')}: {legCase?.case_date || legCase?.created_at || '-'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
                <LexicraftIcon name="scales" size={16} />
                {t('legalCaseDetails.overview.status')}: {legCase?.status || t('legalCaseDetails.overview.unknown')}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setEditModalOpen(true)}
              className="pressable inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
            >
              <LexicraftIcon name="tool" size={18} />
              {t('legalCaseDetails.actions.edit')}
            </button>
            <button
              onClick={handleDeleteCase}
              className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive"
            >
              <LexicraftIcon name="shield" size={18} />
              {t('legalCaseDetails.actions.delete')}
            </button>
            <button
              onClick={() => {
                setActiveTab('procedures');
                setProcedureSignal((prev) => prev + 1);
              }}
              className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <LexicraftIcon name="tool" size={18} />
              {t('legalCaseDetails.actions.addProcedure')}
            </button>
            <button
              onClick={() => {
                setActiveTab('sessions');
                setSessionSignal((prev) => prev + 1);
              }}
              className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <LexicraftIcon name="calendar" size={18} />
              {t('legalCaseDetails.actions.addSession')}
            </button>
          </div>
        </div>
      </header>

      <section className="section-enter">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {t('legalCaseDetails.overview.title')}
          </h3>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => (
            <div
              key={card.key}
              className="hover-lift rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <LexicraftIcon name={card.icon} size={18} />
                </span>
              </div>
              <div className="mt-3 text-2xl font-semibold text-foreground">
                {card.value}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {t('legalCaseDetails.overview.updatedJustNow')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-enter">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex w-full flex-wrap gap-2 bg-transparent">
            {[
              { value: 'clients', label: t('legalCaseDetails.tabs.clients') },
              { value: 'courts', label: t('legalCaseDetails.tabs.courts') },
              { value: 'procedures', label: t('legalCaseDetails.tabs.procedures') },
              { value: 'sessions', label: t('legalCaseDetails.tabs.sessions') },
              { value: 'ads', label: t('legalCaseDetails.tabs.ads') },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6 rounded-3xl border border-border bg-card p-4 shadow-sm">
            <TabsContent value="clients">
              <Suspense fallback={<div className="p-6 text-center text-muted-foreground">{t('common.loading')}</div>}>
                <LegCaseClients
                  legCaseId={id}
                  fetchLegcaseClients={fetchLegCase}
                  legcaseClients={legcaseClients}
                />
              </Suspense>
            </TabsContent>
            <TabsContent value="courts">
              <Suspense fallback={<div className="p-6 text-center text-muted-foreground">{t('common.loading')}</div>}>
                <LegalCaseCourts legCase={legCase} fetchLegCase={fetchLegCase} />
              </Suspense>
            </TabsContent>
            <TabsContent value="procedures">
              <Suspense fallback={<div className="p-6 text-center text-muted-foreground">{t('common.loading')}</div>}>
                <Procedure legCaseId={id} openAddSignal={procedureSignal} />
              </Suspense>
            </TabsContent>
            <TabsContent value="sessions">
              <Suspense fallback={<div className="p-6 text-center text-muted-foreground">{t('common.loading')}</div>}>
                <LegalSession legCaseId={id} openAddSignal={sessionSignal} />
              </Suspense>
            </TabsContent>
            <TabsContent value="ads">
              <Suspense fallback={<div className="p-6 text-center text-muted-foreground">{t('common.loading')}</div>}>
                <LegalCaseAds legCaseId={id} />
              </Suspense>
            </TabsContent>
          </div>
        </Tabs>
      </section>

      {editModalOpen && (
        <Suspense fallback={<div className="p-6 text-center text-muted-foreground">{t('common.loading')}</div>}>
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
