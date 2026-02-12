import api from './axiosConfig';

// ** Legal Case Clients Services **
export const addLegalCaseClients = (caseId, clients) =>
  api.post(`/legal-cases/${caseId}/add_clients`, { clients });

export const removeLegalCaseClient = (caseId, clientId) =>
  api.delete(`/legal-cases/${caseId}/clients/${clientId}`);

// ** Legal Case Courts Services **
export const addLegalCaseCourts = (caseId, courts) =>
  api.post(`/legal-cases/add_courts`, { leg_case_id: caseId, courts });

export const removeLegalCaseCourt = (caseId, courtId) =>
  api.delete(`/leg-case/remove-court`, {
    data: { leg_case_id: caseId, court_id: courtId },
  });

// ** Courts Services **
export const getCourts = () => api.get('/courts');
export const getCourtById = (id) => api.get(`/courts/${id}`);
export const createCourt = (data) => api.post('/courts', data);
export const updateCourt = (id, data) => api.put(`/courts/${id}`, data);
export const deleteCourt = (id) => api.delete(`/courts/${id}`);

// ** Lawyers Services **
export const getLawyers = () => api.get('/lawyers');
export const getLawyerById = (id) => api.get(`/lawyers/${id}`);
export const createLawyer = (data) => api.post('/lawyers', data);
export const updateLawyer = (id, data) => api.put(`/lawyers/${id}`, data);
export const deleteLawyer = (id) => api.delete(`/lawyers/${id}`);

// ** Legal Cases **
export const getLegCases = () => api.get('/legal-cases');
export const getLegCaseById = (id) => api.get(`/legal-cases/${id}`);
export const createLegCase = (data) => api.post('/legal-cases', data);
export const updateLegCase = (id, data) => api.put(`/legal-cases/${id}`, data);
export const deleteLegCase = (id) => api.delete(`/legal-cases/${id}`);

// New reporting endpoints
export const getCaseDetails = (id, params = {}) => api.get(`/cases/${id}`, { params });
export const getCaseSessions = (id) => api.get(`/cases/${id}/sessions`);
export const getCaseProcedures = (id) => api.get(`/cases/${id}/procedures`);
export const getCaseClients = (id) => api.get(`/cases/${id}/clients`);
export const getCaseServices = (id) => api.get(`/cases/${id}/services`);

export const searchCases = (params = {}) => api.get('/cases/search', { params });

// Legacy wrapper kept for older call sites
export const searchLegCase = (query) =>
  searchCases({
    q: query || '',
    paginate: false,
  });

// ** Legal Case Types Services **
export const getLegcaseTypes = () => api.get('/case_types');
export const getLegcaseTypeById = (id) => api.get(`/case_types/${id}`);
export const createLegcaseType = (data) => api.post('/case_types', data);
export const updateLegcaseType = (id, data) => api.put(`/case_types/${id}`, data);
export const deleteLegcaseType = (id) => api.delete(`/case_types/${id}`);

// ** Legal Case Subtypes Services **
export const getLegcaseSubTypes = () => api.get('/case_sub_types');
export const getLegcaseSubTypeById = (id) => api.get(`/case_sub_types/${id}`);
export const createLegcaseSubType = (data) => api.post('/case_sub_types', data);
export const updateLegcaseSubType = (id, data) => api.put(`/case_sub_types/${id}`, data);
export const deleteLegcaseSubType = (id) => api.delete(`/case_sub_types/${id}`);

// ** Legal Ads Services **
export const getLegalAds = () => api.get('/legal-ads');
export const getLegalAdsByLegCaseId = (legCaseId) => api.get(`/legal-ads/${legCaseId}`);
export const getLegalAdTypes = () => api.get('/legal_ad_types');
export const createLegalAd = (legalAdData) => api.post('/legal-ads', legalAdData);
export const updateLegalAd = (id, legalAdData) => api.put(`/legal-ads/${id}`, legalAdData);
export const deleteLegalAd = (legalAdId) => api.delete(`/legal-ads/${legalAdId}`);
export const createLegalAdType = (data) => api.post('/legal_ad_types', data);

// ** Legal Sessions Services **
export const getLegalSessions = () => api.get('/legal_sessions');
export const getLegalSessionsByLegCase = (legCaseId) => api.get(`/legal_sessions/leg-case/${legCaseId}`);
export const getLegalSessionsByCourt = (courtId) => api.get(`/legal_sessions/court/${courtId}`);
export const getLegalSessionsByLawyer = (lawyerId) => api.get(`/legal_sessions/lawyer/${lawyerId}`);
export const createLegalSession = (data) => api.post('/legal_sessions', data);
export const updateLegalSession = (id, data) => api.put(`/legal_sessions/${id}`, data);
export const deleteLegalSession = (id) => api.delete(`/legal_sessions/${id}`);
