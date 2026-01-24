// src/api/clients.js

import api from './axiosConfig'; // Import your Axios instance

export const getClients = () => api.get('/clients');
export const getUnClients = () => api.get('/unclients');
export const getClientById = (id) => api.get(`/clients/${id}`);
export const createClient = (data) => api.post('/clients', data);
export const updateClient = (id, data) => api.put(`/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/clients/${id}`);

export const updateClientStatus = (id, status) =>
  api.put(`/clients/${id}`, { status });
