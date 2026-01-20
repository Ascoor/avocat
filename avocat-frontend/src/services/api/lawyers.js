// src/api/lawyers.js
import api from './axiosConfig';

export const getLawyers = () => api.get('/api/lawyers');
export const getLawyerById = (id) => api.get(`/api/lawyers/${id}`);
export const createLawyer = (data) => api.post('/api/lawyers', data);
export const updateLawyer = (id, data) => api.put(`/api/lawyers/${id}`, data);
export const deleteLawyer = (id) => api.delete(`/api/lawyers/${id}`);
