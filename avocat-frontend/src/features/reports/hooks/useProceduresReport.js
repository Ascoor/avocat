import { useMemo } from 'react';
import { useReportData } from './useReportData';
import { getReportsProcedures } from '@shared/services/api/reports';

export const useProceduresReport = () => {
  const query = useReportData({
    fetcher: getReportsProcedures,
    dateField: 'date_start',
    searchFields: [
      (row) => row?.procedure_type?.name,
      (row) => row?.lawyer?.name,
      (row) => row?.court?.name,
      (row) => row?.result,
      (row) => row?.status,
    ],
    selectFilterMap: {
      lawyerId: (row) => row?.lawyer?.id,
      courtId: (row) => row?.court?.id,
      procedureTypeId: (row) => row?.procedure_type?.id,
    },
  });

  const statuses = useMemo(() => {
    const allRows = query.allRows || [];
    return [...new Set(allRows.map((row) => row?.status).filter(Boolean))];
  }, [query.allRows]);

  return { ...query, statuses };
};
