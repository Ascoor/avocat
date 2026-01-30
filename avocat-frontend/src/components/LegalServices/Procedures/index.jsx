import React, { useState, useEffect } from 'react';
import {
  deleteServiceProcedure,
  getServiceProceduresByServiceId,
} from '../../../services/api/services';
import { useAlert } from '@/contexts/AlertContext';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal';
import AddEditServiceProcedureModal from './AddEditServiceProcedureModal';

const ServiceProcedures = ({ serviceId }) => {
  const [serviceProcedures, setServiceProcedures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [procedureToDelete, setProcedureToDelete] = useState(null);
  const { triggerAlert } = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    if (serviceId) {
      fetchServiceProcedures();
    }
  }, [serviceId]);

  const fetchServiceProcedures = async () => {
    try {
      const response = await getServiceProceduresByServiceId(serviceId);
      setServiceProcedures(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء جلب البيانات.');
      setServiceProcedures([]);
    }
  };

  const paginateData = (data) => {
    if (!Array.isArray(data)) return [];
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  };

  const serviceProceduresToDisplay = paginateData(serviceProcedures);

  const handleAddServiceProcedure = () => {
    setIsEditMode(false);
    setSelectedProcedure(null);
    setShowModal(true);
  };

  const handleEditServiceProcedure = (procedure) => {
    setIsEditMode(true);
    setSelectedProcedure(procedure);
    setShowModal(true);
  };

  const handleDeleteClick = (procedure) => {
    setProcedureToDelete(procedure);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (procedureToDelete) {
      try {
        await deleteServiceProcedure(procedureToDelete.id);
        triggerAlert('success', 'تم حذف الإجراء بنجاح');
        fetchServiceProcedures();
      } catch (error) {
        triggerAlert('error', 'حدث خطأ أثناء حذف الإجراء');
      } finally {
        setShowConfirmDelete(false);
        setProcedureToDelete(null);
      }
    }
  };

  const totalPages = Math.ceil(serviceProcedures.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100">
      {}
      <div className="p-4 bg-blue-600 dark:bg-gray-800 flex justify-between items-center rounded-lg shadow-md">
        <button
          onClick={handleAddServiceProcedure}
          className="px-3 py-2 text-sm rounded-lg font-bold bg-green-500 hover:bg-green-600 text-white shadow-md"
        >
          <BiPlusCircle className="inline-block ml-2" />
          إضافة إجراء
        </button>
        <h1 className="text-lg font-bold text-white flex-1 text-center">
          إجراءات الخدمة
        </h1>
      </div>

      {}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-avocat-blue-dark text-white text-sm">
              <tr>
                <th className="px-4 py-2">الجهة</th>
                <th className="px-4 py-2"> البدأ</th>
                <th className="px-4 py-2"> الإنتهاء</th>
                <th className="px-4 py-2">المحامي</th>
                <th className="px-4 py-2">النتيجة</th>
                <th className="px-4 py-2">الحالة</th>
                <th className="px-4 py-2">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {serviceProceduresToDisplay.map((procedure) => (
                <tr
                  key={procedure.id}
                  className="border-b bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => setSelectedProcedure(procedure)}
                >
                  <td className="px-4 py-2 text-center">
                    {procedure.procedure_place_name || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.date_start || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.date_end || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.lawyer?.name || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.result || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.status || '-'}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditServiceProcedure(procedure);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <BiPencil />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(procedure);
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {}
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            السابق
          </button>
          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            التالي
          </button>
        </div>
      </div>

      {}
      <AddEditServiceProcedureModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        procedure={selectedProcedure}
        isEditing={isEditMode}
        onSaved={fetchServiceProcedures}
        serviceId={serviceId}
      />
      <GlobalConfirmDeleteModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedProcedure || 'الإجراء'}
      />
    </div>
  );
};

export default ServiceProcedures;
