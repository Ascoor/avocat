import React, { useMemo, useState } from 'react';
import TableComponent from '@shared/components/common/TableComponent';
import { useLanguage } from '@shared/contexts/LanguageContext';
import ReportFilters from '@features/reports/components/Filters/ReportFilters';
import ReportStatusBadge from '@features/reports/components/Reports/ReportStatusBadge';
import { useClientsReport } from '@features/reports/hooks/useClientsReport';

const ClientsReport = () => {
  const { t, isRTL } = useLanguage();
  const { rows, loading, error, filters, updateFilters, resetFilters, reload } = useClientsReport();
  const [draftFilters, setDraftFilters] = useState(filters);

  const headers = useMemo(
    () => [
      { key: 'name', text: t('reports.columns.clientName'), sortValue: (row) => row?.name || '' },
      { key: 'phone', text: t('reports.columns.phone'), sortValue: (row) => row?.phone || '' },
      { key: 'email', text: t('reports.columns.email'), sortValue: (row) => row?.email || '' },
      { key: 'status', text: t('reports.columns.status'), sortValue: (row) => row?.status || '' },
    ],
    [t],
  );

  return (
    <div className="space-y-4">
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

export default ClientsReport;
