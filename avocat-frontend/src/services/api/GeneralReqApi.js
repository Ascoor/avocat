import api from './axiosConfig';

// ** Clients **
export const getClients = () => api.get('/api/clients');
export const getClientById = (id) => api.get(`/api/clients/${id}`);
export const createClient = (data) => api.post('/api/clients', data);
export const updateClient = (id, data) => api.put(`/api/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/api/clients/${id}`);
export const searchClient = (query) =>
  api.get(`/api/client-search`, { params: { query } });

// ** Unclients **
export const getUnclients = () => api.get('/api/unclients');
export const getUnclientById = (id) => api.get(`/api/unclients/${id}`);
export const createUnclient = (data) => api.post('/api/unclients', data);
export const updateUnclient = (id, data) =>
  api.put(`/api/unclients/${id}`, data);
export const deleteUnclient = (id) => api.delete(`/api/unclients/${id}`);

// ** Lawyers **
export const getLawyers = () => api.get('/api/lawyers');
export const getLawyerById = (id) => api.get(`/api/lawyer/${id}`);
export const createLawyer = (data) => api.post('/api/lawyers', data);
export const updateLawyer = (id, data) => api.put(`/api/lawyer/${id}`, data);
export const deleteLawyer = (id) => api.delete(`/api/lawyer/${id}`);

// ** Courts **
export const getCourts = () => api.get('/api/courts');
export const getCourtById = (id) => api.get(`/api/courts/${id}`);
export const createCourt = (data) => api.post('/api/courts', data);
export const updateCourt = (id, data) => api.put(`/api/courts/${id}`, data);
export const deleteCourt = (id) => api.delete(`/api/courts/${id}`);

// ** Court Types **
export const getCourtTypes = () => api.get('/api/court_types');
export const getCourtTypeById = (id) => api.get(`/api/court_types/${id}`);
export const createCourtType = (data) => api.post('/api/court_types', data);
export const updateCourtType = (id, data) =>
  api.put(`/api/court_types/${id}`, data);
export const deleteCourtType = (id) => api.delete(`/api/court_types/${id}`);

// ** Court Levels **
export const getCourtLevels = () => api.get('/api/court_levels');
export const getCourtLevelById = (id) => api.get(`/api/court_levels/${id}`);
export const createCourtLevel = (data) => api.post('/api/court_levels', data);
export const updateCourtLevel = (id, data) =>
  api.put(`/api/court_levels/${id}`, data);
export const deleteCourtLevel = (id) => api.delete(`/api/court_levels/${id}`);

// ** Legal Cases **
export const getLegCases = () => api.get('/api/legal-cases');
export const getLegCaseById = (id) => api.get(`/api/legal-cases/${id}`);
export const createLegCase = (data) => api.post('/api/legal-cases', data);
export const updateLegCase = (id, data) =>
  api.put(`/api/legal-cases/${id}`, data);
export const deleteLegCase = (id) => api.delete(`/api/legal-cases/${id}`);
export const searchLegCase = (query) =>
  api.get(`/api/leg-case-search`, { params: { query } });

// ** Case Types **
export const getCaseTypes = () => api.get('/api/case_types');
export const getCaseTypeById = (id) => api.get(`/api/case_types/${id}`);
export const createCaseType = (data) => api.post('/api/case_types', data);
export const updateCaseType = (id, data) =>
  api.put(`/api/case_types/${id}`, data);
export const deleteCaseType = (id) => api.delete(`/api/case_types/${id}`);

// ** Case Sub Types **
export const getCaseSubTypes = () => api.get('/api/case_sub_types');
export const getCaseSubTypeById = (id) => api.get(`/api/case_sub_types/${id}`);
export const createCaseSubType = (data) =>
  api.post('/api/case_sub_types', data);
export const updateCaseSubType = (id, data) =>
  api.put(`/api/case_sub_types/${id}`, data);
export const deleteCaseSubType = (id) =>
  api.delete(`/api/case_sub_types/${id}`);

// ** Procedure Types **
export const getProcedureTypes = () => api.get('/api/procedure_types');
export const getProcedureTypeById = (id) =>
  api.get(`/api/procedure_types/${id}`);
export const createProcedureType = (data) =>
  api.post('/api/procedure_types', data);
export const updateProcedureType = (id, data) =>
  api.put(`/api/procedure_types/${id}`, data);
export const deleteProcedureType = (id) =>
  api.delete(`/api/procedure_types/${id}`);

// ** Procedure Place Types **
export const getProcedurePlaceTypes = () =>
  api.get('/api/procedure_place_types');
export const getProcedurePlaceTypeById = (id) =>
  api.get(`/api/procedure_place_types/${id}`);
export const createProcedurePlaceType = (data) =>
  api.post('/api/procedure_place_types', data);
export const updateProcedurePlaceType = (id, data) =>
  api.put(`/api/procedure_place_types/${id}`, data);
export const deleteProcedurePlaceType = (id) =>
  api.delete(`/api/procedure_place_types/${id}`);

// ** Procedures **
export const getProcedures = () => api.get('/api/procedures');
export const getProcedureById = (id) => api.get(`/api/procedures/${id}`);

export const deleteProcedure = (id) => api.delete(`/api/procedures/${id}`);

// ** Services **
export const getServices = () => api.get('/api/services');
export const getServiceById = (id) => api.get(`/api/services/${id}`);
export const createService = (data) => api.post('/api/services', data);
export const updateService = (id, data) => api.put(`/api/services/${id}`, data);
export const deleteService = (id) => api.delete(`/api/services/${id}`);

// expenses categories
export const getExpensesCategories = () => api.get('/api/expense_categories');
export const getExpensesCategoryById = (id) =>
  api.get(`/api/expense_categories/${id}`);
export const createExpenseCategory = (data) =>
  api.post('/api/expense_categories', data);
export const updateExpenseCategory = (id, data) =>
  api.put(`/api/expense_categories/${id}`, data);
export const deleteExpenseCategory = (id) =>
  api.delete(`/api/expense_categories/${id}`);
// ** Legal Sessions **
export const getSessions = () => api.get('/api/legal_sessions');
export const getSessionsByLegCaseId = (legCaseId) =>
  api.get(`/api/legal_sessions/leg-case/${legCaseId}`);
export const getSessionsByCourtId = (courtId) =>
  api.get(`/api/legal_sessions/court/${courtId}`);
export const getSessionsByLawyerId = (lawyerId) =>
  api.get(`/api/legal_sessions/lawyer/${lawyerId}`);
export const createSession = (data) => api.post('/api/legal_sessions', data);
export const updateSession = (id, data) =>
  api.put(`/api/legal_sessions/${id}`, data);
export const deleteSession = (id) => api.delete(`/api/legal_sessions/${id}`);
// ** Case Status (إحضار حالة القضية) **
