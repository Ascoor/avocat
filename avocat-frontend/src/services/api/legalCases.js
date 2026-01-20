import api from './axiosConfig'; // Import your Axios instance

// ** Legal Case Clients Services **
export const addLegalCaseClients = (caseId, clients) =>
  api.post(`/api/legal-cases/${caseId}/add_clients`, { clients });

export const removeLegalCaseClient = (caseId, clientId) =>
  api.delete(`/api/legal-cases/${caseId}/clients/${clientId}`);
// ** Legal Case Courts Services **// ** Legal Case Courts Services **
export const addLegalCaseCourts = (caseId, courts) =>
  api.post(`/api/legal-cases/add_courts`, { leg_case_id: caseId, courts });

export const removeLegalCaseCourt = (caseId, courtId) =>
  api.delete(`/api/leg-case/remove-court`, {
    data: { leg_case_id: caseId, court_id: courtId },
  });

// ** Courts Services **
export const getCourts = () => api.get('/api/courts');
export const getCourtById = (id) => api.get(`/api/courts/${id}`);
export const createCourt = (data) => api.post('/api/courts', data);
export const updateCourt = (id, data) => api.put(`/api/courts/${id}`, data);
export const deleteCourt = (id) => api.delete(`/api/courts/${id}`);

// ** Lawyers Services **
export const getLawyers = () => api.get('/api/lawyers');
export const getLawyerById = (id) => api.get(`/api/lawyers/${id}`);
export const createLawyer = (data) => api.post('/api/lawyers', data);
export const updateLawyer = (id, data) => api.put(`/api/lawyers/${id}`, data);
export const deleteLawyer = (id) => api.delete(`/api/lawyers/${id}`);

// ** Legal Cases **
export const getLegCases = () => api.get('/api/legal-cases');
export const getLegCaseById = (id) => api.get(`/api/legal-cases/${id}`);
export const createLegCase = (data) => api.post('/api/legal-cases', data);
export const updateLegCase = (id, data) =>
  api.put(`/api/legal-cases/${id}`, data);
export const deleteLegCase = (id) => api.delete(`/api/legal-cases/${id}`);
export const searchLegCase = (query) =>
  api.get(`/api/legal-case-search`, { params: { query } });

// ** Legal Case Types Services **
export const getLegcaseTypes = () => api.get('/api/case_types');
export const getLegcaseTypeById = (id) => api.get(`/api/case_types/${id}`);
export const createLegcaseType = (data) => api.post('/api/case_types', data);
export const updateLegcaseType = (id, data) =>
  api.put(`/api/case_types/${id}`, data);
export const deleteLegcaseType = (id) => api.delete(`/api/case_types/${id}`);

// ** Legal Case Subtypes Services **
export const getLegcaseSubTypes = () => api.get('/api/case_sub_types');
export const getLegcaseSubTypeById = (id) =>
  api.get(`/api/case_sub_types/${id}`);
export const createLegcaseSubType = (data) =>
  api.post('/api/case_sub_types', data);
export const updateLegcaseSubType = (id, data) =>
  api.put(`/api/case_sub_types/${id}`, data);
export const deleteLegcaseSubType = (id) =>
  api.delete(`/api/case_sub_types/${id}`);

// ** Legal Ads Services **
export const getLegalAds = () => api.get('/api/legal-ads');
export const getLegalAdsByLegCaseId = (legCaseId) =>
  api.get(`/api/legal-ads/${legCaseId}`);
export const getLegalAdTypes = () => api.get('/api/legal_ad_types');

// Create a new legal advertisement
export const createLegalAd = (legalAdData) =>
  api.post('/api/legal-ads', legalAdData);

// Update an existing legal advertisement
export const updateLegalAd = (id, legalAdData) =>
  api.put(`/api/legal-ads/${id}`, legalAdData);
export const deleteLegalAd = (legalAdId) =>
  api.delete(`/api/legal-ads/${legalAdId}`);
export const createLegalAdType = (data) =>
  api.post('/api/legal_ad_types', data);

// ** Legal Sessions Services **
export const getLegalSessions = () => api.get('/api/legal_sessions');
export const getLegalSessionsByLegCase = (legCaseId) =>
  api.get(`/api/legal_sessions/leg-case/${legCaseId}`);
export const getLegalSessionsByCourt = (courtId) =>
  api.get(`/api/legal_sessions/court/${courtId}`);
export const getLegalSessionsByLawyer = (lawyerId) =>
  api.get(`/api/legal_sessions/lawyer/${lawyerId}`);
export const createLegalSession = (data) =>
  api.post('/api/legal_sessions', data);
export const updateLegalSession = (id, data) =>
  api.put(`/api/legal_sessions/${id}`, data);
export const deleteLegalSession = (id) =>
  api.delete(`/api/legal_sessions/${id}`);
