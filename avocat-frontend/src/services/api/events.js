// src/api/v1/events.js
import api from './axiosConfig';

export const getEvents = () => api.get('/api/v1/events');
export const createEvent = (data) => api.post('/api/v1/event', data);
