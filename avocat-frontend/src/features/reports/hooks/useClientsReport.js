import { useReportData } from './useReportData';
import { getReportsClients } from '@shared/services/api/reports';

export const useClientsReport = () =>
  useReportData({
    fetcher: getReportsClients,
    dateField: 'created_at',
    searchFields: [
      (row) => row?.name,
      (row) => row?.phone,
      (row) => row?.email,
      (row) => row?.status,
    ],
  });
