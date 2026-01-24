// src/events.js
import api from './axiosConfig';

export const getEvents = () => api.get('/events');
export const createEvent = (data) => api.post('/event', data);
