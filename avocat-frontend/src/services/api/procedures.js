// src/api/procedures.js
import api from './axiosConfig';

export const getProcedures = () => api.get('/api/procedures');
export const getProcedureById = (id) => api.get(`/api/procedures/${id}`);
export const createProcedure = (data) => api.post('/api/procedures', data);
export const updateProcedure = (id, data) =>
  api.put(`/api/procedures/${id}`, data);
export const deleteProcedure = (id) => api.delete(`/api/procedures/${id}`);

export const getProceduresByLegCaseId = (legCaseId) =>
  api.get(`/api/procedures/leg-case/${legCaseId}`); // New function

export const getProcedureTypes = () => api.get('/api/procedure_types');
export const getProcedureTypeById = (id) =>
  api.get(`/api/procedure_types/${id}`);
export const createProcedureType = (data) =>
  api.post('/api/procedure_types', data);
export const updateProcedureType = (id, data) =>
  api.put(`/api/procedure_types/${id}`, data);
export const deleteProcedureType = (id) =>
  api.delete(`/api/procedure_t ypes/${id}`);

export const getProcedurePlaceTypes = () =>
  api.get('/api/procedure_place_types');
export const getProcedurePlaceTypeById = (id) =>
  api.get(`/api/procedure_place_types/${id}`);
export const createProcedurePlaceType = (data) =>
  api.post('/api/procedure_place_types', data);
export const updateProcedurePlaceType = (id, data) =>
  api.put(`/api/procedure_place_types/${id}`, data);
export const deleteProcedurePlaceType = (id) =>
  api.delete(`/api/procedure_place_types/${id}`);
