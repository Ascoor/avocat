// =========================
// LegalCaseTools/LegalCaseOverview.jsx
// =========================
import React, { Suspense, useMemo } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { Calendar, FileText, Users, Megaphone } from 'lucide-react';
import LegalCaseDataCard from './LegalCaseDataCard';
import TableSkeleton from './TableSkeleton';

const iconMap = {
  sessions: Calendar,
  procedures: FileText,
  clients: Users,
  ads: Megaphone,
};

export default function LegalCaseOverview({
  legCase,
  sessions = [],
  procedures = [],
  ads = [],
  clients = [],
  onOpenTab,
}) {
  const { t, isRTL } = useLanguage();

  const kpiData = useMemo(() => {
    return [
      { key: 'sessions', label: t('legalCaseDetails.tabs.sessions'), value: sessions?.length ?? 0 },
      { key: 'procedures', label: t('legalCaseDetails.tabs.procedures'), value: procedures?.length ?? 0 },
      { key: 'clients', label: t('legalCaseDetails.tabs.clients'), value: clients?.length ?? 0 },
      { key: 'ads', label: t('legalCaseDetails.tabs.ads'), value: ads?.length ?? 0 },
    ].map((item) => ({ ...item, Icon: iconMap[item.key] }));
  }, [t, sessions, procedures, clients, ads]);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="space-y-4">
      <Suspense fallback={<TableSkeleton />}>
        <LegalCaseDataCard
          legalCase={legCase}
          kpiData={kpiData}
          onOpenTab={onOpenTab}
          isRTL={isRTL}
        />
      </Suspense>
    </div>
  );
}
