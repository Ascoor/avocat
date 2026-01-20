// src/api/services.js
import api from './axiosConfig';

export const getServices = () => api.get('/api/services');
export const getServiceById = (id) => api.get(`/api/services/${id}`);
export const createService = (data) => api.post('/api/services', data);
export const updateService = (id, data) => api.put(`/api/services/${id}`, data);
export const deleteService = (id) => api.delete(`/api/services/${id}`);
// service-procedures
export const getServiceProceduresByServiceId = (serviceId) =>
  api.get(`/api/service-procedures/${serviceId}`);
export const createServiceProcedure = (data) =>
  api.post('/api/service-procedures', data);
export const updateServiceProcedure = (id, data) =>
  api.put(`/api/service-procedures/${id}`, data);

//deleteServiceProcedure
export const deleteServiceProcedure = (procedureId) =>
  api.delete(`/api/service-procedure/${procedureId}`);
export const getServiceTypes = () => api.get('/api/service-types');
export const getServiceTypeById = (id) => api.get(`/api/service-types/${id}`);
export const createServiceType = (data) => api.post('/api/service-types', data);
export const updateServiceType = (id, data) =>
  api.put(`/api/service-types/${id}`, data);
export const deleteServiceType = (id) => api.delete(`/api/service-types/${id}`);
