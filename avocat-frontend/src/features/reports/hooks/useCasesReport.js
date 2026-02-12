import { useReportData } from './useReportData';
import { getReportsCases } from '@shared/services/api/reports';

export const useCasesReport = () =>
  useReportData({
    fetcher: getReportsCases,
    dateField: 'created_at',
    searchFields: [
      (row) => row?.title,
      (row) => row?.case_number,
      (row) => row?.client?.name,
      (row) => row?.status,
    ],
  });
