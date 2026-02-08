import { useState, useEffect } from 'react';
import api from '@shared/services/api/axiosConfig';

const CourtLevel = ({ show, handleClose }) => {
  const [newCourtLevelName, setNewCourtLevelName] = useState('');
  const [courtLevels, setCourtLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    fetchCourtLevels();
  }, []);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(
        () => setAlert({ show: false, message: '', type: 'success' }),
        3000,
      );
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const fetchCourtLevels = async () => {
    try {
      const response = await api.get('/court_levels');
      setCourtLevels(response.data);
    } catch (e) {
      setAlert({
        show: true,
        message: 'حدث خطأ أثناء جلب بيانات درجات المحاكم',
        type: 'danger',
      });
    }
  };

  const handleAddCourtLevel = async () => {
    if (!newCourtLevelName.trim()) {
      setAlert({
        show: true,
        message: 'برجاء إدخال اسم مستوى المحكمة',
        type: 'danger',
      });
      return;
    }
    try {
      const response = await api.post('/court_levels', {
        name: newCourtLevelName,
      });
      setCourtLevels([...courtLevels, response.data]);
      setAlert({ show: true, message: 'تمت الإضافة بنجاح', type: 'success' });
      setNewCourtLevelName('');
      handleClose();
    } catch (e) {
      setAlert({
        show: true,
        message: 'حدث خطأ أثناء الإضافة',
        type: 'danger',
      });
    }
  };

  const handleDeleteCourtLevel = async (id) => {
    try {
      await api.delete(`/court_levels/${id}`);
      setCourtLevels(courtLevels.filter((courtLevel) => courtLevel.id !== id));
      setAlert({ show: true, message: 'تم الحذف بنجاح', type: 'success' });
    } catch (e) {
      setAlert({
        show: true,
        message: 'لا يمكن حذف هذا المستوى لارتباطه ببيانات أخرى',
        type: 'danger',
      });
    }
  };

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const currentItems = courtLevels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          درجات المحاكم
        </h3>
      </div>

      {alert.show && (
        <div
          className={`p-4 mb-4 text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {alert.message}
        </div>
      )}

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse border   justify-center text-center border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-avocat-blue-dark">
            <tr>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                الاسم
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((courtLevel) => (
              <tr
                key={courtLevel.id}
                className="hover:bg-gray-300 dark:hover:bg-gradient-orange-light dark:hover:text-avocat-blue-dark  bg-gray-100 dark:bg-avocat-blue"
              >
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  {courtLevel.name}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteCourtLevel(courtLevel.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          السابق
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentItems.length < itemsPerPage}
        >
          التالي
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-gray-200 dark:text-gray-700">
                إضافة مستوى محكمة
              </h4>
              <button className="text-red-500" onClick={handleClose}>
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCourtLevel();
              }}
            >
              <label className="block mb-2 text-gray-200 dark:text-gray-700">
                اسم مستوى المحكمة:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded dark:border-gray-600"
                value={newCourtLevelName}
                onChange={(e) => setNewCourtLevelName(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={handleClose}
                >
                  إغلاق
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtLevel;
