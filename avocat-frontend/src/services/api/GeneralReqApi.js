import api from './axiosConfig';

// ** Clients **
export const getClients = () => api.get('/api/v1/clients');
export const getClientById = (id) => api.get(`/api/v1/clients/${id}`);
export const createClient = (data) => api.post('/api/v1/clients', data);
export const updateClient = (id, data) => api.put(`/api/v1/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/api/v1/clients/${id}`);
export const searchClient = (query) =>
  api.get(`/api/v1/client-search`, { params: { query } });

// ** Unclients **
export const getUnclients = () => api.get('/api/v1/unclients');
export const getUnclientById = (id) => api.get(`/api/v1/unclients/${id}`);
export const createUnclient = (data) => api.post('/api/v1/unclients', data);
export const updateUnclient = (id, data) =>
  api.put(`/api/v1/unclients/${id}`, data);
export const deleteUnclient = (id) => api.delete(`/api/v1/unclients/${id}`);

// ** Lawyers **
export const getLawyers = () => api.get('/api/v1/lawyers');
export const getLawyerById = (id) => api.get(`/api/v1/lawyer/${id}`);
export const createLawyer = (data) => api.post('/api/v1/lawyers', data);
export const updateLawyer = (id, data) => api.put(`/api/v1/lawyer/${id}`, data);
export const deleteLawyer = (id) => api.delete(`/api/v1/lawyer/${id}`);

// ** Courts **
export const getCourts = () => api.get('/api/v1/courts');
export const getCourtById = (id) => api.get(`/api/v1/courts/${id}`);
export const createCourt = (data) => api.post('/api/v1/courts', data);
export const updateCourt = (id, data) => api.put(`/api/v1/courts/${id}`, data);
export const deleteCourt = (id) => api.delete(`/api/v1/courts/${id}`);

// ** Court Types **
export const getCourtTypes = () => api.get('/api/v1/court_types');
export const getCourtTypeById = (id) => api.get(`/api/v1/court_types/${id}`);
export const createCourtType = (data) => api.post('/api/v1/court_types', data);
export const updateCourtType = (id, data) =>
  api.put(`/api/v1/court_types/${id}`, data);
export const deleteCourtType = (id) => api.delete(`/api/v1/court_types/${id}`);

// ** Court Levels **
export const getCourtLevels = () => api.get('/api/v1/court_levels');
export const getCourtLevelById = (id) => api.get(`/api/v1/court_levels/${id}`);
export const createCourtLevel = (data) => api.post('/api/v1/court_levels', data);
export const updateCourtLevel = (id, data) =>
  api.put(`/api/v1/court_levels/${id}`, data);
export const deleteCourtLevel = (id) => api.delete(`/api/v1/court_levels/${id}`);

// ** Legal Cases **
export const getLegCases = () => api.get('/api/v1/legal-cases');
export const getLegCaseById = (id) => api.get(`/api/v1/legal-cases/${id}`);
export const createLegCase = (data) => api.post('/api/v1/legal-cases', data);
export const updateLegCase = (id, data) =>
  api.put(`/api/v1/legal-cases/${id}`, data);
export const deleteLegCase = (id) => api.delete(`/api/v1/legal-cases/${id}`);
export const searchLegCase = (query) =>
  api.get(`/api/v1/leg-case-search`, { params: { query } });

// ** Case Types **
export const getCaseTypes = () => api.get('/api/v1/case_types');
export const getCaseTypeById = (id) => api.get(`/api/v1/case_types/${id}`);
export const createCaseType = (data) => api.post('/api/v1/case_types', data);
export const updateCaseType = (id, data) =>
  api.put(`/api/v1/case_types/${id}`, data);
export const deleteCaseType = (id) => api.delete(`/api/v1/case_types/${id}`);

// ** Case Sub Types **
export const getCaseSubTypes = () => api.get('/api/v1/case_sub_types');
export const getCaseSubTypeById = (id) => api.get(`/api/v1/case_sub_types/${id}`);
export const createCaseSubType = (data) =>
  api.post('/api/v1/case_sub_types', data);
export const updateCaseSubType = (id, data) =>
  api.put(`/api/v1/case_sub_types/${id}`, data);
export const deleteCaseSubType = (id) =>
  api.delete(`/api/v1/case_sub_types/${id}`);

// ** Procedure Types **
export const getProcedureTypes = () => api.get('/api/v1/procedure_types');
export const getProcedureTypeById = (id) =>
  api.get(`/api/v1/procedure_types/${id}`);
export const createProcedureType = (data) =>
  api.post('/api/v1/procedure_types', data);
export const updateProcedureType = (id, data) =>
  api.put(`/api/v1/procedure_types/${id}`, data);
export const deleteProcedureType = (id) =>
  api.delete(`/api/v1/procedure_types/${id}`);

// ** Procedure Place Types **
export const getProcedurePlaceTypes = () =>
  api.get('/api/v1/procedure_place_types');
export const getProcedurePlaceTypeById = (id) =>
  api.get(`/api/v1/procedure_place_types/${id}`);
export const createProcedurePlaceType = (data) =>
  api.post('/api/v1/procedure_place_types', data);
export const updateProcedurePlaceType = (id, data) =>
  api.put(`/api/v1/procedure_place_types/${id}`, data);
export const deleteProcedurePlaceType = (id) =>
  api.delete(`/api/v1/procedure_place_types/${id}`);

// ** Procedures **
export const getProcedures = () => api.get('/api/v1/procedures');
export const getProcedureById = (id) => api.get(`/api/v1/procedures/${id}`);

export const deleteProcedure = (id) => api.delete(`/api/v1/procedures/${id}`);

// ** Services **
export const getServices = () => api.get('/api/v1/services');
export const getServiceById = (id) => api.get(`/api/v1/services/${id}`);
export const createService = (data) => api.post('/api/v1/services', data);
export const updateService = (id, data) => api.put(`/api/v1/services/${id}`, data);
export const deleteService = (id) => api.delete(`/api/v1/services/${id}`);

// expenses categories
export const getExpensesCategories = () => api.get('/api/v1/expense_categories');
export const getExpensesCategoryById = (id) =>
  api.get(`/api/v1/expense_categories/${id}`);
export const createExpenseCategory = (data) =>
  api.post('/api/v1/expense_categories', data);
export const updateExpenseCategory = (id, data) =>
  api.put(`/api/v1/expense_categories/${id}`, data);
export const deleteExpenseCategory = (id) =>
  api.delete(`/api/v1/expense_categories/${id}`);
// ** Legal Sessions **
export const getSessions = () => api.get('/api/v1/legal_sessions');
export const getSessionsByLegCaseId = (legCaseId) =>
  api.get(`/api/v1/legal_sessions/leg-case/${legCaseId}`);
export const getSessionsByCourtId = (courtId) =>
  api.get(`/api/v1/legal_sessions/court/${courtId}`);
export const getSessionsByLawyerId = (lawyerId) =>
  api.get(`/api/v1/legal_sessions/lawyer/${lawyerId}`);
export const createSession = (data) => api.post('/api/v1/legal_sessions', data);
export const updateSession = (id, data) =>
  api.put(`/api/v1/legal_sessions/${id}`, data);
export const deleteSession = (id) => api.delete(`/api/v1/legal_sessions/${id}`);
// ** Case Status (إحضار حالة القضية) **
