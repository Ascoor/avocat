import api from './axiosConfig';

const resolvePayload = (response) => response?.data?.data ?? response?.data;

const requestWithFallback = async (primary, fallback) => {
  try {
    return await primary();
  } catch (error) {
    if (error?.response?.status === 404 && fallback) {
      return fallback();
    }
    throw error;
  }
};

export const getLookups = async ({ entity, officeId, params = {} }) => {
  const response = await requestWithFallback(
    () => api.get(`/lookups/${entity}`, { params }),
    officeId
      ? () => api.get(`/offices/${officeId}/settings/${entity}`, { params })
      : undefined,
  );

  const payload = resolvePayload(response);
  return Array.isArray(payload) ? payload : payload?.items ?? [];
};

export const createLookup = ({ entity, officeId, payload }) =>
  requestWithFallback(
    () => api.post(`/lookups/${entity}`, payload),
    officeId
      ? () => api.post(`/offices/${officeId}/settings/${entity}`, payload)
      : undefined,
  );

export const updateLookup = ({ entity, officeId, id, payload }) =>
  requestWithFallback(
    () => api.put(`/lookups/${entity}/${id}`, payload),
    officeId
      ? () => api.put(`/offices/${officeId}/settings/${entity}/${id}`, payload)
      : undefined,
  );

export const deleteLookup = ({ entity, officeId, id }) =>
  requestWithFallback(
    () => api.delete(`/lookups/${entity}/${id}`),
    officeId
      ? () => api.delete(`/offices/${officeId}/settings/${entity}/${id}`)
      : undefined,
  );
