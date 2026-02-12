import api from './axiosConfig';

export const getReportsSessions = () => api.get('/legal_sessions');
export const getReportsProcedures = () => api.get('/procedures');
export const getReportsClients = () => api.get('/clients');
export const getReportsCases = () => api.get('/legal-cases');
export const getReportsServices = () => api.get('/services');

export const getReportsMetadata = async () => {
  const [lawyersRes, courtsRes, procedureTypesRes] = await Promise.all([
    api.get('/lawyers'),
    api.get('/courts'),
    api.get('/procedure_types'),
  ]);

  return {
    lawyers: lawyersRes?.data ?? [],
    courts: courtsRes?.data ?? [],
    procedureTypes: procedureTypesRes?.data ?? [],
  };
};
