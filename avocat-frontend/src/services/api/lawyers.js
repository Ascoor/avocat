// src/api/v1/lawyers.js
import api from './axiosConfig';

export const getLawyers = () => api.get('/api/v1/lawyers');
export const getLawyerById = (id) => api.get(`/api/v1/lawyers/${id}`);
export const createLawyer = (data) => api.post('/api/v1/lawyers', data);
export const updateLawyer = (id, data) => api.put(`/api/v1/lawyers/${id}`, data);
export const deleteLawyer = (id) => api.delete(`/api/v1/lawyers/${id}`);
