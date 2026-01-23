// src/api/v1/services.js
import api from './axiosConfig';

export const getServices = () => api.get('/api/v1/services');
export const getServiceById = (id) => api.get(`/api/v1/services/${id}`);
export const createService = (data) => api.post('/api/v1/services', data);
export const updateService = (id, data) => api.put(`/api/v1/services/${id}`, data);
export const deleteService = (id) => api.delete(`/api/v1/services/${id}`);
// service-procedures
export const getServiceProceduresByServiceId = (serviceId) =>
  api.get(`/api/v1/service-procedures/${serviceId}`);
export const createServiceProcedure = (data) =>
  api.post('/api/v1/service-procedures', data);
export const updateServiceProcedure = (id, data) =>
  api.put(`/api/v1/service-procedures/${id}`, data);

//deleteServiceProcedure
export const deleteServiceProcedure = (procedureId) =>
  api.delete(`/api/v1/service-procedure/${procedureId}`);
export const getServiceTypes = () => api.get('/api/v1/service-types');
export const getServiceTypeById = (id) => api.get(`/api/v1/service-types/${id}`);
export const createServiceType = (data) => api.post('/api/v1/service-types', data);
export const updateServiceType = (id, data) =>
  api.put(`/api/v1/service-types/${id}`, data);
export const deleteServiceType = (id) => api.delete(`/api/v1/service-types/${id}`);
