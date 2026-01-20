import useAuth from '../../components/auth/AuthUser';

export const useCourtsApi = () => {
  const { http } = useAuth();

  const getCourts = () => http.get('/api/courts');
  const getCourtById = (id) => http.get(`/api/courts/${id}`);
  const createCourt = (data) => http.post('/api/courts', data);
  const updateCourt = (id, data) => http.put(`/api/courts/${id}`, data);
  const deleteCourt = (id) => http.delete(`/api/courts/${id}`);

  return {
    getCourts,
    getCourtById,
    createCourt,
    updateCourt,
    deleteCourt,
  };
};
