import { useMemo } from 'react';
import { useReportData } from './useReportData';
import { getReportsSessions } from '@shared/services/api/reports';

export const useSessionsReport = () => {
  const query = useReportData({
    fetcher: getReportsSessions,
    dateField: 'session_date',
    searchFields: [
      (row) => row?.session_date,
      (row) => row?.session_roll,
      (row) => row?.lawyer?.name,
      (row) => row?.court?.name,
      (row) => row?.status,
    ],
  });

  const statuses = useMemo(() => {
    const allRows = query.allRows || [];
    return [...new Set(allRows.map((row) => row?.status).filter(Boolean))];
  }, [query.allRows]);

  return { ...query, statuses };
};
