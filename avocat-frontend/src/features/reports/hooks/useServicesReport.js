import { useReportData } from './useReportData';
import { getReportsServices } from '@shared/services/api/reports';

export const useServicesReport = () =>
  useReportData({
    fetcher: getReportsServices,
    dateField: 'created_at',
    searchFields: [
      (row) => row?.name,
      (row) => row?.description,
      (row) => row?.client?.name,
      (row) => row?.status,
    ],
  });
