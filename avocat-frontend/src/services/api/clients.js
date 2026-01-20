// src/api/clients.js

import api from './axiosConfig'; // Import your Axios instance

export const getClients = () => api.get('/api/clients');
export const getUnClients = () => api.get('/api/unclients');
export const getClientById = (id) => api.get(`/api/clients/${id}`);
export const createClient = (data) => api.post('/api/clients', data);
export const updateClient = (id, data) => api.put(`/api/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/api/clients/${id}`);

export const updateClientStatus = (id, status) =>
  api.put(`/api/clients/${id}`, { status });
