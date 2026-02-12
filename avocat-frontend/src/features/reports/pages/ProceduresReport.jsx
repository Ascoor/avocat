import React, { useMemo, useState } from 'react';
import TableComponent from '@shared/components/common/TableComponent';
import { useLanguage } from '@shared/contexts/LanguageContext';
import ReportFilters from '@features/reports/components/Filters/ReportFilters';
import ReportStatusBadge from '@features/reports/components/Reports/ReportStatusBadge';
import { useProceduresReport } from '@features/reports/hooks/useProceduresReport';
import { useReportsMetadata } from '@features/reports/hooks/useReportsMetadata';

const ProceduresReport = () => {
  const { t, isRTL } = useLanguage();
  const { lawyers, courts, procedureTypes } = useReportsMetadata();
  const { rows, loading, error, filters, updateFilters, resetFilters, reload, statuses } = useProceduresReport();
  const [draftFilters, setDraftFilters] = useState(filters);

  const selectFilters = useMemo(
    () => [
      {
        key: 'procedureTypeId',
        placeholder: t('reports.filters.procedureType'),
        options: procedureTypes.map((item) => ({ value: String(item.id), label: item.name })),
      },
      {
        key: 'lawyerId',
        placeholder: t('reports.filters.lawyer'),
        options: lawyers.map((item) => ({ value: String(item.id), label: item.name })),
      },
      {
        key: 'courtId',
        placeholder: t('reports.filters.court'),
        options: courts.map((item) => ({ value: String(item.id), label: item.name })),
      },
    ],
    [courts, lawyers, procedureTypes, t],
  );

  const headers = useMemo(
    () => [
      {
        key: 'procedure_type',
        text: t('reports.columns.procedureType'),
        getValue: (row) => row?.procedure_type?.name || '-',
        sortValue: (row) => row?.procedure_type?.name || '',
      },
      {
        key: 'lawyer',
        text: t('reports.columns.lawyer'),
        getValue: (row) => row?.lawyer?.name || '-',
        sortValue: (row) => row?.lawyer?.name || '',
      },
      {
        key: 'court',
        text: t('reports.columns.court'),
        getValue: (row) => row?.court?.name || '-',
        sortValue: (row) => row?.court?.name || '',
      },
      { key: 'date_start', text: t('reports.columns.startDate'), sortValue: (row) => row?.date_start || '' },
      { key: 'date_end', text: t('reports.columns.endDate'), sortValue: (row) => row?.date_end || '' },
      { key: 'status', text: t('reports.columns.status'), sortValue: (row) => row?.status || '' },
    ],
    [t],
  );

  return (
    <div className="space-y-4">
      <ReportFilters
        filters={draftFilters}
        selectFilters={selectFilters}
        statusOptions={statuses}
        onChange={(payload) => setDraftFilters((prev) => ({ ...prev, ...payload }))}
        onApply={() => updateFilters(draftFilters)}
        onReset={() => {
          const clean = {
            searchTerm: '',
            startDate: '',
            endDate: '',
            status: '',
            procedureTypeId: '',
            lawyerId: '',
            courtId: '',
          };
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

export default ProceduresReport;
