import React, { useMemo, useState } from 'react';
import TableComponent from '@shared/components/common/TableComponent';
import { useLanguage } from '@shared/contexts/LanguageContext';
import ReportFilters from '@features/reports/components/Filters/ReportFilters';
import ReportPageHeader from '@features/reports/components/Reports/ReportPageHeader';
import ReportStatusBadge from '@features/reports/components/Reports/ReportStatusBadge';
import { useCasesReport } from '@features/reports/hooks/useCasesReport';

const CasesReport = () => {
  const { t, isRTL } = useLanguage();
  const { rows, loading, error, filters, updateFilters, resetFilters, reload } = useCasesReport();
  const [draftFilters, setDraftFilters] = useState(filters);

  const headers = useMemo(
    () => [
      { key: 'title', text: t('reports.columns.caseTitle') },
      { key: 'case_number', text: t('reports.columns.caseNumber') },
      { key: 'client', text: t('reports.columns.clientName'), getValue: (row) => row?.client?.name || '-' },
      { key: 'status', text: t('reports.columns.status') },
    ],
    [t],
  );

  return (
    <div className="space-y-4">
      <ReportPageHeader title={t('reports.cases.title')} subtitle={t('reports.cases.subtitle')} icon="briefcase" />
      <ReportFilters
        filters={draftFilters}
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
        searchPlaceholder={t('reports.filters.search')}
      />
    </div>
  );
};

export default CasesReport;
