import api from './axiosConfig';

// Fetch all legal sessions
export const getAllSessions = () => api.get('/api/v1/legal_sessions');

// Fetch sessions by legal case ID
export const getSessionsByLegCaseId = (legCaseId) =>
  api.get(`/api/v1/legal_sessions/leg-case/${legCaseId}`);
export const getLegalSessionTypes = () => api.get(`/api/v1/legal_session_types/`);

// Fetch sessions by court ID
export const getSessionsByCourtId = (courtId) =>
  api.get(`/api/v1/legal_sessions/court/${courtId}`);

// Fetch sessions by lawyer ID
export const getSessionsByLawyerId = (lawyerId) =>
  api.get(`/api/v1/legal_sessions/lawyer/${lawyerId}`);

// Create a new legal session
export const createSession = (sessionData) =>
  api.post('/api/v1/legal_sessions', sessionData);

// Update an existing legal session
export const updateSession = (id, sessionData) =>
  api.put(`/api/v1/legal_sessions/${id}`, sessionData);

// Delete a legal session
export const deleteSession = (id) => api.delete(`/api/v1/legal_sessions/${id}`);
