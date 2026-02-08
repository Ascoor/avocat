// src/lawyers.js
import api from './axiosConfig';

export const getLawyers = () => api.get('/lawyers');
export const getLawyerById = (id) => api.get(`/lawyers/${id}`);
export const createLawyer = (data) => api.post('/lawyers', data);
export const updateLawyer = (id, data) => api.put(`/lawyers/${id}`, data);
export const deleteLawyer = (id) => api.delete(`/lawyers/${id}`);
