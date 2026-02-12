import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Gavel, FileText, Megaphone, Pencil, Trash2, Plus,
  Globe, Users, Building2, Scale
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { LegalCase, Procedure, Session, LegalAd } from '@/types/legal';
import {
  getLegCaseById,
  getProceduresByLegCaseId,
  getSessionsByLegCaseId,
  getLegalAdsByLegCaseId,
} from '@/data/mockLegalData';
import KPICard from './KPICard';
import StatusBadge from './StatusBadge';
import DataTable from './DataTable';
import AddEditLegCase from './AddEditLegCase';
import SectionStateMessage from './SectionStateMessage';
import { OverviewSkeleton, TableSkeleton } from './SkeletonLoaders';

const tabs = ['overview', 'clients', 'courts', 'procedures', 'sessions', 'ads'] as const;
type TabKey = typeof tabs[number];

const LegCaseDetails = () => {
  const { lang, labels, isRtl, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [editOpen, setEditOpen] = useState(false);

  const [legCase, setLegCase] = useState<LegalCase | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [ads, setAds] = useState<LegalAd[]>([]);

  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCase = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [caseData, procData, sessData, adsData] = await Promise.all([
        getLegCaseById('1'),
        getProceduresByLegCaseId('1'),
        getSessionsByLegCaseId('1'),
        getLegalAdsByLegCaseId('1'),
      ]);
      setLegCase(caseData);
      setProcedures(procData);
      setSessions(sessData);
      setAds(adsData);
    } catch {
      setError(labels.errorMessage);
    } finally {
      setLoading(false);
    }
  }, [labels.errorMessage]);

  useEffect(() => { fetchCase(); }, [fetchCase]);

  const handleTabChange = (tab: TabKey) => {
    setTabLoading(true);
    setActiveTab(tab);
    setTimeout(() => setTabLoading(false), 300);
  };

  const tabLabels: Record<TabKey, { label: string; icon: React.ElementType }> = {
    overview: { label: labels.overview, icon: Scale },
    clients: { label: labels.clients, icon: Users },
    courts: { label: labels.courts, icon: Building2 },
    procedures: { label: labels.procedures, icon: FileText },
    sessions: { label: labels.sessions, icon: Gavel },
    ads: { label: labels.ads, icon: Megaphone },
  };

  if (loading) return <div className="max-w-6xl mx-auto p-6"><OverviewSkeleton /></div>;

  if (error || !legCase) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <SectionStateMessage type="error" message={error || labels.errorMessage} retryLabel={labels.retry} onRetry={fetchCase} />
      </div>
    );
  }

  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);

  const clientCols = [
    { key: 'name', label: labels.name, render: (_: any, r: any) => t(r.name, r.nameAr) },
    { key: 'email', label: labels.email },
    { key: 'phone', label: labels.phone },
    { key: 'role', label: labels.role, render: (_: any, r: any) => t(r.role, r.roleAr) },
  ];

  const courtCols = [
    { key: 'name', label: labels.court, render: (_: any, r: any) => t(r.name, r.nameAr) },
    { key: 'location', label: labels.location, render: (_: any, r: any) => t(r.location, r.locationAr) },
    { key: 'type', label: labels.type, render: (_: any, r: any) => t(r.type, r.typeAr) },
  ];

  const procCols = [
    { key: 'title', label: labels.title, render: (_: any, r: any) => t(r.title, r.titleAr) },
    { key: 'date', label: labels.date },
    { key: 'status', label: labels.status, render: (v: string) => <StatusBadge status={v} lang={lang} /> },
    { key: 'assignedTo', label: labels.assignedTo },
  ];

  const sessCols = [
    { key: 'date', label: labels.date },
    { key: 'time', label: labels.time },
    { key: 'courtName', label: labels.court, render: (_: any, r: any) => t(r.courtName, r.courtNameAr) },
    { key: 'status', label: labels.status, render: (v: string) => <StatusBadge status={v} lang={lang} /> },
    { key: 'notes', label: labels.notes, render: (_: any, r: any) => t(r.notes, r.notesAr) },
  ];

  const adsCols = [
    { key: 'title', label: labels.title, render: (_: any, r: any) => t(r.title, r.titleAr) },
    { key: 'date', label: labels.date },
    { key: 'type', label: labels.type, render: (_: any, r: any) => t(r.type, r.typeAr) },
    { key: 'description', label: labels.description, render: (_: any, r: any) => t(r.description, r.descriptionAr) },
  ];

  const renderTabContent = () => {
    if (tabLoading) return <TableSkeleton />;
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-2">{labels.description}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(legCase.description, legCase.descriptionAr)}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" /> {labels.clients}
                </h3>
                {legCase.clients.map(c => (
                  <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{t(c.name, c.nameAr)}</span>
                    <span className="text-xs text-muted-foreground">{t(c.role, c.roleAr)}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-accent" /> {labels.courts}
                </h3>
                {legCase.courts.map(c => (
                  <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{t(c.name, c.nameAr)}</span>
                    <span className="text-xs text-muted-foreground">{t(c.type, c.typeAr)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'clients':
        return legCase.clients.length
          ? <DataTable columns={clientCols} data={legCase.clients} isRtl={isRtl} />
          : <SectionStateMessage type="empty" message={labels.noData} />;
      case 'courts':
        return legCase.courts.length
          ? <DataTable columns={courtCols} data={legCase.courts} isRtl={isRtl} />
          : <SectionStateMessage type="empty" message={labels.noData} />;
      case 'procedures':
        return procedures.length
          ? <DataTable columns={procCols} data={procedures} isRtl={isRtl} />
          : <SectionStateMessage type="empty" message={labels.noData} />;
      case 'sessions':
        return sessions.length
          ? <DataTable columns={sessCols} data={sessions} isRtl={isRtl} />
          : <SectionStateMessage type="empty" message={labels.noData} />;
      case 'ads':
        return ads.length
          ? <DataTable columns={adsCols} data={ads} isRtl={isRtl} />
          : <SectionStateMessage type="empty" message={labels.noData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="legal-header">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Scale className="h-6 w-6 text-accent" />
                <span className="text-sm font-medium text-primary-foreground/70">{labels.caseNumber}: {legCase.caseNumber}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
                {t(legCase.title, legCase.titleAr)}
              </h1>
              <div className="mt-2">
                <StatusBadge status={legCase.status} lang={lang} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button onClick={toggleLanguage} className="action-btn-outline bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                <Globe className="h-4 w-4" />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
              <button onClick={() => setEditOpen(true)} className="action-btn-accent">
                <Pencil className="h-4 w-4" />
                {labels.edit}
              </button>
              <button className="action-btn-outline bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive">
                <Trash2 className="h-4 w-4" />
                {labels.delete}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard icon={Calendar} label={labels.nextSession} value={legCase.nextSessionDate || '—'} delay={0} />
          <KPICard icon={Gavel} label={labels.totalSessions} value={sessions.length} delay={0.1} />
          <KPICard icon={FileText} label={labels.totalProcedures} value={procedures.length} delay={0.2} />
          <KPICard icon={Megaphone} label={labels.totalAds} value={ads.length} delay={0.3} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex flex-wrap gap-2">
          <button className="action-btn-primary">
            <Plus className="h-4 w-4" /> {labels.addProcedure}
          </button>
          <button className="action-btn-primary">
            <Plus className="h-4 w-4" /> {labels.addSession}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex overflow-x-auto border-b border-border gap-1 mb-6">
          {tabs.map(tab => {
            const { label, icon: Icon } = tabLabels[tab];
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`tab-trigger flex items-center gap-2 shrink-0 ${activeTab === tab ? '' : ''}`}
                data-state={activeTab === tab ? 'active' : 'inactive'}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="pb-12"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <AddEditLegCase
        legCase={legCase}
        labels={labels}
        lang={lang}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={(data) => setLegCase(prev => prev ? { ...prev, ...data } : prev)}
      />
    </div>
  );
};

export default LegCaseDetails;
