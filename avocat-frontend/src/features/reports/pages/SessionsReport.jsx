import React, { useMemo, useState } from 'react';
import TableComponent from '@shared/components/common/TableComponent';
import { useLanguage } from '@shared/contexts/LanguageContext';
import ReportFilters from '@features/reports/components/Filters/ReportFilters';
import ReportPageHeader from '@features/reports/components/Reports/ReportPageHeader';
import ReportStatusBadge from '@features/reports/components/Reports/ReportStatusBadge';
import { useSessionsReport } from '@features/reports/hooks/useSessionsReport';

const SessionsReport = () => {
  const { t, isRTL } = useLanguage();
  const { rows, loading, error, filters, updateFilters, resetFilters, reload, statuses } = useSessionsReport();
  const [draftFilters, setDraftFilters] = useState(filters);

  const headers = useMemo(
    () => [
      { key: 'session_date', text: t('reports.columns.date') },
      { key: 'session_roll', text: t('reports.columns.roll') },
      { key: 'lawyer', text: t('reports.columns.lawyer'), getValue: (row) => row?.lawyer?.name || '-' },
      { key: 'court', text: t('reports.columns.court'), getValue: (row) => row?.court?.name || '-' },
      { key: 'status', text: t('reports.columns.status') },
    ],
    [t],
  );

  return (
    <div className="space-y-4">
      <ReportPageHeader title={t('reports.sessions.title')} subtitle={t('reports.sessions.subtitle')} icon="calendar" />
      <ReportFilters
        filters={draftFilters}
        statusOptions={statuses}
        onChange={(payload) => setDraftFilters((prev) => ({ ...prev, ...payload }))}
        onApply={() => updateFilters(draftFilters)}
        onReset={() => {
          const clean = { searchTerm: '', startDate: '', endDate: '', status: '' };
          setDraftFilters(clean);
          resetFilters();
        }}
      />
      <TableComponent
        data={rows}
        headers={headers}
        loading={loading}
        error={error}
        isRTL={isRTL}
        onRetry={reload}
        customRenderers={{ status: (row) => <ReportStatusBadge status={row?.status} /> }}
        emptyLabel={t('reports.states.empty')}
        errorLabel={t('reports.states.error')}
        loadingLabel={t('common.loading')}
        searchPlaceholder={t('reports.filters.search')}
      />
    </div>
  );
};

export default SessionsReport;
