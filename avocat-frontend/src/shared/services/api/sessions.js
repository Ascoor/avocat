import api from './axiosConfig';

// Fetch all legal sessions
export const getAllSessions = () => api.get('/legal_sessions');

// Fetch sessions by legal case ID
export const getSessionsByLegCaseId = (legCaseId) =>
  api.get(`/legal_sessions/leg-case/${legCaseId}`);
export const getLegalSessionTypes = () => api.get(`/legal_session_types/`);

// Fetch sessions by court ID
export const getSessionsByCourtId = (courtId) =>
  api.get(`/legal_sessions/court/${courtId}`);

// Fetch sessions by lawyer ID
export const getSessionsByLawyerId = (lawyerId) =>
  api.get(`/legal_sessions/lawyer/${lawyerId}`);

// Create a new legal session
export const createSession = (sessionData) =>
  api.post('/legal_sessions', sessionData);

// Update an existing legal session
export const updateSession = (id, sessionData) =>
  api.put(`/legal_sessions/${id}`, sessionData);

// Delete a legal session
export const deleteSession = (id) => api.delete(`/legal_sessions/${id}`);
