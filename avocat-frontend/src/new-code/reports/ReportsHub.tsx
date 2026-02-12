import { useState, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, Users, Briefcase, Settings, Globe, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { ReportFilters, reportLabelsEn, reportLabelsAr } from '@/types/reports';
import { reportSections } from '@/data/mockReportsData';
import { searchReportData } from '@/data/mockReportsData';
import ReportPageHeader from './ReportPageHeader';
import ReportFilterCard from './ReportFilterCard';
import ReportResults from './ReportResults';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: Record<string, LucideIcon> = {
  FileText, Calendar, Users, Briefcase, Settings,
};

const tabIcons: Record<string, LucideIcon> = {
  procedures: FileText,
  sessions: Calendar,
  clients: Users,
  cases: Briefcase,
  services: Settings,
};

interface SectionState {
  data: any[] | null;
  isLoading: boolean;
  error: string | null;
  filters: ReportFilters;
}

const ReportsHub = () => {
  const { lang, isRtl, toggleLanguage } = useLanguage();
  const labels = lang === 'en' ? reportLabelsEn : reportLabelsAr;
  const [activeTab, setActiveTab] = useState('procedures');

  // Cache results per section
  const [sectionStates, setSectionStates] = useState<Record<string, SectionState>>({});

  const currentSection = reportSections.find(s => s.id === activeTab)!;
  const currentState = sectionStates[activeTab] || { data: null, isLoading: false, error: null, filters: {} };

  const handleSearch = useCallback(async (filters: ReportFilters) => {
    setSectionStates(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], data: null, isLoading: true, error: null, filters },
    }));

    try {
      const results = await searchReportData(activeTab, filters);
      setSectionStates(prev => ({
        ...prev,
        [activeTab]: { data: results, isLoading: false, error: null, filters },
      }));
    } catch {
      setSectionStates(prev => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], data: null, isLoading: false, error: labels.errorMessage },
      }));
    }
  }, [activeTab, labels.errorMessage]);

  const handleReset = useCallback(() => {
    setSectionStates(prev => ({
      ...prev,
      [activeTab]: { data: null, isLoading: false, error: null, filters: {} },
    }));
  }, [activeTab]);

  const handleRetry = useCallback(() => {
    const state = sectionStates[activeTab];
    if (state?.filters) handleSearch(state.filters);
  }, [activeTab, sectionStates, handleSearch]);

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top header bar */}
      <div className="legal-header px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl font-bold">{labels.reportsHub}</h1>
              <p className="text-primary-foreground/70 text-sm mt-1">{labels.reportsHubSubtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-primary-foreground hover:bg-white/10 gap-2"
            >
              <Globe className="h-4 w-4" />
              {lang === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">
        {/* Tab Navigation */}
        <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-1.5 overflow-x-auto">
          <div className={`flex gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {reportSections.map(section => {
              const Icon = tabIcons[section.id];
              const isActive = activeTab === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  } ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  {lang === 'ar' ? section.titleAr.replace(' تقارير', '').replace('تقارير ', '') : section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: isRtl ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 12 : -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Section Header */}
            <ReportPageHeader
              icon={currentSection.icon}
              title={lang === 'ar' ? currentSection.titleAr : currentSection.title}
              subtitle={lang === 'ar' ? currentSection.subtitleAr : currentSection.subtitle}
              isRtl={isRtl}
            />

            {/* Filter Card */}
            <ReportFilterCard
              filters={currentSection.filters}
              onSearch={handleSearch}
              onReset={handleReset}
              isRtl={isRtl}
              lang={lang}
              labels={labels}
              isLoading={currentState.isLoading}
              resultCount={currentState.data?.length ?? null}
            />

            {/* Results */}
            <ReportResults
              columns={currentSection.columns}
              data={currentState.data}
              isRtl={isRtl}
              lang={lang}
              labels={labels}
              isLoading={currentState.isLoading}
              error={currentState.error}
              onRetry={handleRetry}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReportsHub;
