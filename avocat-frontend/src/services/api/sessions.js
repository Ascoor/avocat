import api from './axiosConfig';

// Fetch all legal sessions
export const getAllSessions = () => api.get('/api/legal_sessions');

// Fetch sessions by legal case ID
export const getSessionsByLegCaseId = (legCaseId) =>
  api.get(`/api/legal_sessions/leg-case/${legCaseId}`);
export const getLegalSessionTypes = () => api.get(`/api/legal_session_types/`);

// Fetch sessions by court ID
export const getSessionsByCourtId = (courtId) =>
  api.get(`/api/legal_sessions/court/${courtId}`);

// Fetch sessions by lawyer ID
export const getSessionsByLawyerId = (lawyerId) =>
  api.get(`/api/legal_sessions/lawyer/${lawyerId}`);

// Create a new legal session
export const createSession = (sessionData) =>
  api.post('/api/legal_sessions', sessionData);

// Update an existing legal session
export const updateSession = (id, sessionData) =>
  api.put(`/api/legal_sessions/${id}`, sessionData);

// Delete a legal session
export const deleteSession = (id) => api.delete(`/api/legal_sessions/${id}`);
