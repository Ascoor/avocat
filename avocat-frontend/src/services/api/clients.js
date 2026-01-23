// src/api/v1/clients.js

import api from './axiosConfig'; // Import your Axios instance

export const getClients = () => api.get('/api/v1/clients');
export const getUnClients = () => api.get('/api/v1/unclients');
export const getClientById = (id) => api.get(`/api/v1/clients/${id}`);
export const createClient = (data) => api.post('/api/v1/clients', data);
export const updateClient = (id, data) => api.put(`/api/v1/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/api/v1/clients/${id}`);

export const updateClientStatus = (id, status) =>
  api.put(`/api/v1/clients/${id}`, { status });
