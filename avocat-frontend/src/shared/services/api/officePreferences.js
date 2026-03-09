import api from './axiosConfig';

export const getOfficePreferences = async (officeId) => {
  const response = await api.get(`/offices/${officeId}/preferences`);
  return response?.data?.data ?? null;
};

export const updateOfficePreferences = async (officeId, payload) => {
  const response = await api.put(`/offices/${officeId}/preferences`, payload);
  return response?.data?.data ?? null;
};
