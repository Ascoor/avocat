// src/api/v1/procedures.js
import api from './axiosConfig';

export const getProcedures = () => api.get('/api/v1/procedures');
export const getProcedureById = (id) => api.get(`/api/v1/procedures/${id}`);
export const createProcedure = (data) => api.post('/api/v1/procedures', data);
export const updateProcedure = (id, data) =>
  api.put(`/api/v1/procedures/${id}`, data);
export const deleteProcedure = (id) => api.delete(`/api/v1/procedures/${id}`);

export const getProceduresByLegCaseId = (legCaseId) =>
  api.get(`/api/v1/procedures/leg-case/${legCaseId}`); // New function

export const getProcedureTypes = () => api.get('/api/v1/procedure_types');
export const getProcedureTypeById = (id) =>
  api.get(`/api/v1/procedure_types/${id}`);
export const createProcedureType = (data) =>
  api.post('/api/v1/procedure_types', data);
export const updateProcedureType = (id, data) =>
  api.put(`/api/v1/procedure_types/${id}`, data);
export const deleteProcedureType = (id) =>
  api.delete(`/api/v1/procedure_types/${id}`);

export const getProcedurePlaceTypes = () =>
  api.get('/api/v1/procedure_place_types');
export const getProcedurePlaceTypeById = (id) =>
  api.get(`/api/v1/procedure_place_types/${id}`);
export const createProcedurePlaceType = (data) =>
  api.post('/api/v1/procedure_place_types', data);
export const updateProcedurePlaceType = (id, data) =>
  api.put(`/api/v1/procedure_place_types/${id}`, data);
export const deleteProcedurePlaceType = (id) =>
  api.delete(`/api/v1/procedure_place_types/${id}`);
