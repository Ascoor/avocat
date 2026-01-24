import api from './axiosConfig';

// ** Clients **
export const getClients = () => api.get('/clients');
export const getClientById = (id) => api.get(`/clients/${id}`);
export const createClient = (data) => api.post('/clients', data);
export const updateClient = (id, data) => api.put(`/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/clients/${id}`);
export const searchClient = (query) =>
  api.get(`/client-search`, { params: { query } });

// ** Unclients **
export const getUnclients = () => api.get('/unclients');
export const getUnclientById = (id) => api.get(`/unclients/${id}`);
export const createUnclient = (data) => api.post('/unclients', data);
export const updateUnclient = (id, data) =>
  api.put(`/unclients/${id}`, data);
export const deleteUnclient = (id) => api.delete(`/unclients/${id}`);

// ** Lawyers **
export const getLawyers = () => api.get('/lawyers');
export const getLawyerById = (id) => api.get(`/lawyer/${id}`);
export const createLawyer = (data) => api.post('/lawyers', data);
export const updateLawyer = (id, data) => api.put(`/lawyer/${id}`, data);
export const deleteLawyer = (id) => api.delete(`/lawyer/${id}`);

// ** Courts **
export const getCourts = () => api.get('/courts');
export const getCourtById = (id) => api.get(`/courts/${id}`);
export const createCourt = (data) => api.post('/courts', data);
export const updateCourt = (id, data) => api.put(`/courts/${id}`, data);
export const deleteCourt = (id) => api.delete(`/courts/${id}`);

// ** Court Types **
export const getCourtTypes = () => api.get('/court_types');
export const getCourtTypeById = (id) => api.get(`/court_types/${id}`);
export const createCourtType = (data) => api.post('/court_types', data);
export const updateCourtType = (id, data) =>
  api.put(`/court_types/${id}`, data);
export const deleteCourtType = (id) => api.delete(`/court_types/${id}`);

// ** Court Levels **
export const getCourtLevels = () => api.get('/court_levels');
export const getCourtLevelById = (id) => api.get(`/court_levels/${id}`);
export const createCourtLevel = (data) => api.post('/court_levels', data);
export const updateCourtLevel = (id, data) =>
  api.put(`/court_levels/${id}`, data);
export const deleteCourtLevel = (id) => api.delete(`/court_levels/${id}`);

// ** Legal Cases **
export const getLegCases = () => api.get('/legal-cases');
export const getLegCaseById = (id) => api.get(`/legal-cases/${id}`);
export const createLegCase = (data) => api.post('/legal-cases', data);
export const updateLegCase = (id, data) =>
  api.put(`/legal-cases/${id}`, data);
export const deleteLegCase = (id) => api.delete(`/legal-cases/${id}`);
export const searchLegCase = (query) =>
  api.get(`/leg-case-search`, { params: { query } });

// ** Case Types **
export const getCaseTypes = () => api.get('/case_types');
export const getCaseTypeById = (id) => api.get(`/case_types/${id}`);
export const createCaseType = (data) => api.post('/case_types', data);
export const updateCaseType = (id, data) =>
  api.put(`/case_types/${id}`, data);
export const deleteCaseType = (id) => api.delete(`/case_types/${id}`);

// ** Case Sub Types **
export const getCaseSubTypes = () => api.get('/case_sub_types');
export const getCaseSubTypeById = (id) => api.get(`/case_sub_types/${id}`);
export const createCaseSubType = (data) =>
  api.post('/case_sub_types', data);
export const updateCaseSubType = (id, data) =>
  api.put(`/case_sub_types/${id}`, data);
export const deleteCaseSubType = (id) =>
  api.delete(`/case_sub_types/${id}`);

// ** Procedure Types **
export const getProcedureTypes = () => api.get('/procedure_types');
export const getProcedureTypeById = (id) =>
  api.get(`/procedure_types/${id}`);
export const createProcedureType = (data) =>
  api.post('/procedure_types', data);
export const updateProcedureType = (id, data) =>
  api.put(`/procedure_types/${id}`, data);
export const deleteProcedureType = (id) =>
  api.delete(`/procedure_types/${id}`);

// ** Procedure Place Types **
export const getProcedurePlaceTypes = () =>
  api.get('/procedure_place_types');
export const getProcedurePlaceTypeById = (id) =>
  api.get(`/procedure_place_types/${id}`);
export const createProcedurePlaceType = (data) =>
  api.post('/procedure_place_types', data);
export const updateProcedurePlaceType = (id, data) =>
  api.put(`/procedure_place_types/${id}`, data);
export const deleteProcedurePlaceType = (id) =>
  api.delete(`/procedure_place_types/${id}`);

// ** Procedures **
export const getProcedures = () => api.get('/procedures');
export const getProcedureById = (id) => api.get(`/procedures/${id}`);

export const deleteProcedure = (id) => api.delete(`/procedures/${id}`);

// ** Services **
export const getServices = () => api.get('/services');
export const getServiceById = (id) => api.get(`/services/${id}`);
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// expenses categories
export const getExpensesCategories = () => api.get('/expense_categories');
export const getExpensesCategoryById = (id) =>
  api.get(`/expense_categories/${id}`);
export const createExpenseCategory = (data) =>
  api.post('/expense_categories', data);
export const updateExpenseCategory = (id, data) =>
  api.put(`/expense_categories/${id}`, data);
export const deleteExpenseCategory = (id) =>
  api.delete(`/expense_categories/${id}`);
// ** Legal Sessions **
export const getSessions = () => api.get('/legal_sessions');
export const getSessionsByLegCaseId = (legCaseId) =>
  api.get(`/legal_sessions/leg-case/${legCaseId}`);
export const getSessionsByCourtId = (courtId) =>
  api.get(`/legal_sessions/court/${courtId}`);
export const getSessionsByLawyerId = (lawyerId) =>
  api.get(`/legal_sessions/lawyer/${lawyerId}`);
export const createSession = (data) => api.post('/legal_sessions', data);
export const updateSession = (id, data) =>
  api.put(`/legal_sessions/${id}`, data);
export const deleteSession = (id) => api.delete(`/legal_sessions/${id}`);
// ** Case Status (إحضار حالة القضية) **
