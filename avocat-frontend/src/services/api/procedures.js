// src/procedures.js
import api from './axiosConfig';

export const getProcedures = () => api.get('/procedures');
export const getProcedureById = (id) => api.get(`/procedures/${id}`);
export const createProcedure = (data) => api.post('/procedures', data);
export const updateProcedure = (id, data) =>
  api.put(`/procedures/${id}`, data);
export const deleteProcedure = (id) => api.delete(`/procedures/${id}`);

export const getProceduresByLegCaseId = (legCaseId) =>
  api.get(`/procedures/leg-case/${legCaseId}`); // New function

export const getProcedureTypes = () => api.get('/procedure_types');
export const getProcedureTypeById = (id) =>
  api.get(`/procedure_types/${id}`);
export const createProcedureType = (data) =>
  api.post('/procedure_types', data);
export const updateProcedureType = (id, data) =>
  api.put(`/procedure_types/${id}`, data);
export const deleteProcedureType = (id) =>
  api.delete(`/procedure_t ypes/${id}`);

export const getProcedurePlaceTypes = () =>
  api.get('/procedure_place_types');
export const getProcedurePlaceTypeById = (id) =>
  api.get(`/procedure_place_types/${id}`);
export const createProcedurePlaceType = (data) =>
  api.post('/procedure_place_types', data);
export const updateProcedurePlaceType = (id, data) =>
  api.put(`/procedure_place_types/${id}`, data);
export const deleteProcedurePlaceType = (id) =>
  api.delete(`/procedure_place_types/${id}`);
