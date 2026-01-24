import { useState, useEffect } from 'react';
import api from '../../../services/api/axiosConfig';

const Court = ({ show, handleClose }) => {
  const [courtTypes, setCourtTypes] = useState([]);
  const [courtSubTypes, setCourtSubTypes] = useState([]);
  const [courtLevels, setCourtLevels] = useState([]);
  const [courts, setCourts] = useState([]);
  const [newCourt, setNewCourt] = useState({
    typeId: '',
    subTypeId: '',
    levelId: '',
    name: '',
    address: '',
  });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData('/court_types/', setCourtTypes);
    fetchData('/court_levels/', setCourtLevels);
    fetchData('/courts/', setCourts);
  }, []);

  useEffect(() => {
    if (newCourt.typeId) {
      fetchData(`/court-types/${newCourt.typeId}`, setCourtSubTypes);
    } else {
      setCourtSubTypes([]);
    }
  }, [newCourt.typeId]);

  const fetchData = async (url, setState) => {
    setLoading(true);
    try {
      const response = await api.get(url);
      setState(response.data);
    } catch (error) {
      setAlert({
        show: true,
        message: 'حدث خطأ في جلب البيانات',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourt = async () => {
    if (!newCourt.typeId || !newCourt.levelId || !newCourt.name.trim()) {
      setAlert({
        show: true,
        message: 'يرجى ملء جميع الحقول المطلوبة',
        type: 'danger',
      });
      return;
    }

    try {
      const response = await api.post('/courts/', {
        court_type_id: newCourt.typeId,
        court_sub_type_id: newCourt.subTypeId,
        court_level_id: newCourt.levelId,
        name: newCourt.name,
        address: newCourt.address,
      });
      setCourts([...courts, response.data]);
      setAlert({
        show: true,
        message: 'تمت إضافة المحكمة بنجاح',
        type: 'success',
      });
      handleClose();
    } catch (error) {
      setAlert({
        show: true,
        message: 'حدث خطأ أثناء إضافة المحكمة',
        type: 'danger',
      });
    }
  };

  const handleDeleteCourt = async (id) => {
    try {
      await api.delete(`/courts/${id}`);
      setCourts(courts.filter((court) => court.id !== id));
      setAlert({
        show: true,
        message: 'تم حذف المحكمة بنجاح',
        type: 'success',
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'حدث خطأ أثناء حذف المحكمة',
        type: 'danger',
      });
    }
  };

  const currentItems = courts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-4">
      {loading && (
        <div className="text-center text-blue-500">جاري التحميل...</div>
      )}

      {alert.show && (
        <div
          className={`p-4 mb-4 text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {alert.message}
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          المحاكم
        </h3>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse border  justify-center text-center border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-avocat-blue-dark">
            <tr>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                الاسم
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                النوع
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                المستوى
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((court) => (
              <tr
                key={court.id}
                className="hover:bg-gray-300 dark:hover:bg-gradient-orange-light dark:hover:text-avocat-blue-dark  bg-gray-100 dark:bg-avocat-blue"
              >
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  {court.name}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  {court.court_type?.name}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  {court.court_level?.name}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteCourt(court.id)}
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
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                إضافة محكمة
              </h4>
              <button className="text-red-500" onClick={handleClose}>
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCourt();
              }}
            >
              <label className="block mb-2 text-gray-700 dark:text-gray-300">
                نوع المحكمة:
              </label>
              <select
                className="w-full p-2 border rounded dark:border-gray-600"
                value={newCourt.typeId}
                onChange={(e) =>
                  setNewCourt({ ...newCourt, typeId: e.target.value })
                }
              >
                <option value="">اختر نوع المحكمة</option>
                {courtTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              <label className="block mt-4 mb-2 text-gray-700 dark:text-gray-300">
                اسم المحكمة:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded dark:border-gray-600"
                value={newCourt.name}
                onChange={(e) =>
                  setNewCourt({ ...newCourt, name: e.target.value })
                }
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

export default Court;
