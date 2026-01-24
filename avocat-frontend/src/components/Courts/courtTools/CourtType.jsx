import { useState, useEffect } from 'react';
import api from '../../../services/api/axiosConfig';

export default function CourtType({ show, handleClose }) {
  const [newCourtTypeName, setNewCourtTypeName] = useState('');
  const [courtTypes, setCourtTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCourtTypes();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const fetchCourtTypes = async () => {
    try {
      const response = await api.get('/court_types');
      setCourtTypes(response.data);
    } catch (err) {
      setAlertMessage({ type: 'error', text: 'فشل في جلب البيانات' });
    }
  };

  const handleAddCourtType = async () => {
    if (!newCourtTypeName.trim()) {
      setModalMessage({
        type: 'error',
        text: 'برجاء إدخال نوع المحكمة المراد إضافته.',
      });
      return;
    }

    try {
      const response = await api.post('/court_types', {
        name: newCourtTypeName,
      });
      setCourtTypes([...courtTypes, response.data]);
      setAlertMessage({ type: 'success', text: 'تم إضافة نوع المحكمة بنجاح' });
      setNewCourtTypeName('');
      handleClose();
    } catch (err) {
      setModalMessage({
        type: 'error',
        text: 'تأكد من البيانات المدخلة.',
      });
    }
  };

  const handleDeleteCourtType = async (id) => {
    try {
      await api.delete(`/court_types/${id}`);
      setCourtTypes(courtTypes.filter((courtType) => courtType.id !== id));
      setAlertMessage({ type: 'success', text: 'تم حذف نوع المحكمة بنجاح' });
    } catch (err) {
      setAlertMessage({
        type: 'error',
        text: 'لا يمكن حذف نوع المحكمة لارتباطه ببيانات أخرى.',
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courtTypes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4">
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          تصنيف المحاكم
        </h3>
      </div>

      {alertMessage && (
        <div
          className={`mb-4 p-4 text-white ${
            alertMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {alertMessage.text}
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
            {currentItems.map((courtType) => (
              <tr
                key={courtType.id}
                className="hover:bg-gray-300 dark:hover:bg-gradient-orange-light dark:hover:text-avocat-blue-dark  bg-gray-100 dark:bg-avocat-blue"
              >
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  {courtType.name}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteCourtType(courtType.id)}
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
          disabled={indexOfLastItem >= courtTypes.length}
        >
          التالي
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                إضافة نوع المحكمة
              </h4>
              <button className="text-red-500" onClick={handleClose}>
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCourtType();
              }}
            >
              <label className="block mb-2 text-gray-700 dark:text-gray-300">
                اسم نوع المحكمة:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded dark:border-gray-600"
                value={newCourtTypeName}
                onChange={(e) => setNewCourtTypeName(e.target.value)}
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
                  إضافة نوع المحكمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
