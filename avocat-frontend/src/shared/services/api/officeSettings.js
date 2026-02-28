import api from './axiosConfig';

const buildPath = (officeId, entity, id) => {
  const basePath = `/offices/${officeId}/settings/${entity}`;
  return id ? `${basePath}/${id}` : basePath;
};

export const getSettings = (officeId, entity, params = {}) =>
  api.get(buildPath(officeId, entity), { params });

export const createSetting = (officeId, entity, payload) =>
  api.post(buildPath(officeId, entity), payload);

export const updateSetting = (officeId, entity, id, payload) =>
  api.put(buildPath(officeId, entity, id), payload);

export const deleteSetting = (officeId, entity, id) =>
  api.delete(buildPath(officeId, entity, id));
