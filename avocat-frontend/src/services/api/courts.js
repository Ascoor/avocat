import useAuth from '../../components/auth/AuthUser';

export const useCourtsApi = () => {
  const { http } = useAuth();

  const getCourts = () => http.get('/api/v1/courts');
  const getCourtById = (id) => http.get(`/api/v1/courts/${id}`);
  const createCourt = (data) => http.post('/api/v1/courts', data);
  const updateCourt = (id, data) => http.put(`/api/v1/courts/${id}`, data);
  const deleteCourt = (id) => http.delete(`/api/v1/courts/${id}`);

  return {
    getCourts,
    getCourtById,
    createCourt,
    updateCourt,
    deleteCourt,
  };
};
