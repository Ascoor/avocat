// src/services.js
import api from './axiosConfig';

export const getServices = () => api.get('/services');
export const getServiceById = (id) => api.get(`/services/${id}`);
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);
// service-procedures
export const getServiceProceduresByServiceId = (serviceId) =>
  api.get(`/service-procedures/${serviceId}`);
export const createServiceProcedure = (data) =>
  api.post('/service-procedures', data);
export const updateServiceProcedure = (id, data) =>
  api.put(`/service-procedures/${id}`, data);

//deleteServiceProcedure
export const deleteServiceProcedure = (procedureId) =>
  api.delete(`/service-procedure/${procedureId}`);
export const getServiceTypes = () => api.get('/service-types');
export const getServiceTypeById = (id) => api.get(`/service-types/${id}`);
export const createServiceType = (data) => api.post('/service-types', data);
export const updateServiceType = (id, data) =>
  api.put(`/service-types/${id}`, data);
export const deleteServiceType = (id) => api.delete(`/service-types/${id}`);
