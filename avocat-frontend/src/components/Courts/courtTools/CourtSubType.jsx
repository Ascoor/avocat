import { useState, useEffect } from 'react';
import api from '../../../services/api/axiosConfig';

const CourtSubType = ({ show, handleClose }) => {
  const [newCourtSubType, setNewCourtSubType] = useState({
    name: '',
    court_type_id: '',
  });
  const [modalMessage, setModalMessage] = useState(null);
  const [courtTypes, setCourtTypes] = useState([]);
  const [courtSubTypes, setCourtSubTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCourtData = async (endpoint, setter) => {
      try {
        const response = await api.get(endpoint);
        setter(response.data);
      } catch (error) {
        setAlert({
          show: true,
          message: `حدث خطأ أثناء جلب البيانات من ${endpoint}`,
          variant: 'danger',
        });
      }
    };

    if (show) {
      fetchCourtData('/court_types', setCourtTypes);
    }
    fetchCourtData('/court_sub_types', setCourtSubTypes);
  }, [show]);

  useEffect(() => {
    if (alert.show || modalMessage) {
      const timer = setTimeout(() => {
        setAlert({ show: false, message: '', variant: 'success' });
        setModalMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, modalMessage]);

  const currentItems = courtSubTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddCourtSubType = async () => {
    if (!newCourtSubType.name.trim() || !newCourtSubType.court_type_id) {
      setModalMessage({
        type: 'danger',
        text: 'برجاء إدخال جميع البيانات المطلوبة.',
      });
      return;
    }

    try {
      const response = await api.post('/court_sub_types', newCourtSubType);
      setCourtSubTypes([...courtSubTypes, response.data]);
      setAlert({
        show: true,
        message: 'تمت إضافة النوع الفرعي بنجاح.',
        variant: 'success',
      });
      setNewCourtSubType({ name: '', court_type_id: '' });
      handleClose();
    } catch (error) {
      setModalMessage({ type: 'danger', text: 'حدث خطأ أثناء الإضافة.' });
    }
  };

  const handleDeleteCourtSubType = async (id) => {
    try {
      await api.delete(`/court_sub_types/${id}`);
      setCourtSubTypes(
        courtSubTypes.filter((courtSubType) => courtSubType.id !== id),
      );
      setAlert({ show: true, message: 'تم الحذف بنجاح.', variant: 'success' });
    } catch (error) {
      setAlert({
        show: true,
        message: 'حدث خطأ أثناء الحذف.',
        variant: 'danger',
      });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          أنواع المحاكم الفرعية
        </h3>
      </div>

      {alert.show && (
        <div
          className={`mb-4 p-4 text-white ${alert.variant === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {alert.message}
        </div>
      )}

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse   justify-center text-center border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                الاسم
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                نوع المحكمة
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((courtSubType) => (
              <tr
                key={courtSubType.id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  {courtSubType.name}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  {courtSubType.court_type?.name}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteCourtSubType(courtSubType.id)}
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
                إضافة نوع محكمة فرعية
              </h4>
              <button className="text-red-500" onClick={handleClose}>
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCourtSubType();
              }}
            >
              <label className="block mb-2 text-gray-700 dark:text-gray-300">
                نوع المحكمة:
              </label>
              <select
                className="w-full p-2 border rounded dark:border-gray-600"
                value={newCourtSubType.court_type_id}
                onChange={(e) =>
                  setNewCourtSubType({
                    ...newCourtSubType,
                    court_type_id: e.target.value,
                  })
                }
              >
                <option value="">اختر نوع المحكمة</option>
                {courtTypes.map((courtType) => (
                  <option key={courtType.id} value={courtType.id}>
                    {courtType.name}
                  </option>
                ))}
              </select>
              <label className="block mt-4 mb-2 text-gray-700 dark:text-gray-300">
                الاسم:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded dark:border-gray-600"
                value={newCourtSubType.name}
                onChange={(e) =>
                  setNewCourtSubType({
                    ...newCourtSubType,
                    name: e.target.value,
                  })
                }
              />
              {modalMessage && (
                <p className="text-red-500 mt-2">{modalMessage.text}</p>
              )}
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

export default CourtSubType;
