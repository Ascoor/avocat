import React, { useEffect, useState } from 'react';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import {
  getProceduresByLegCaseId,
  deleteProcedure,
} from '../../../services/api/procedures';
import ProcedureModal from './Modals/ProcedureModal';
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal';
import { useAlert } from '../../../contexts/AlertContext';
import { motion } from 'framer-motion';

const LegalCaseProcedures = ({ legCaseId }) => {
  const [procedures, setProcedures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [procedureToDelete, setProcedureToDelete] = useState(null);
  const { triggerAlert } = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };
  const proceduresToDisplay = paginateData(procedures);
  useEffect(() => {
    fetchProcedures();
  }, [legCaseId]);

  const fetchProcedures = async () => {
    try {
      const response = await getProceduresByLegCaseId(legCaseId);
      setProcedures(response.data);
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء جلب البيانات.');
    }
  };

  const handleAddProcedure = () => {
    setIsEditMode(false);
    setModalData({});
    setSelectedProcedure(null);
    setShowModal(true);
  };

  const handleEditProcedure = (procedure) => {
    setIsEditMode(true);
    setModalData(procedure);
    setSelectedProcedure(null);
    setShowModal(true);
  };

  const handleDeleteClick = (procedure) => {
    setProcedureToDelete(procedure);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (procedureToDelete) {
      try {
        await deleteProcedure(procedureToDelete.id);
        triggerAlert('success', 'تم حذف الإجراء بنجاح');
        fetchProcedures();
      } catch (error) {
        triggerAlert('error', 'حدث خطأ أثناء حذف الإجراء');
      } finally {
        setShowConfirmDelete(false);
        setProcedureToDelete(null);
      }
    }
  };

  const totalPages = Math.ceil(procedures.length / rowsPerPage);
  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100">
      {}
      <motion.header
        className="p-4 bg-gradient-blue-dark dark:bg-avocat-blue-dark flex justify-between items-center rounded-lg shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {}
        <button
          onClick={handleAddProcedure}
          className="px-2 py-2 text-sm rounded-lg font-bold bg-gradient-green-button hover:bg-gradient-green-dark-button text-white shadow-md hover:scale-105 transform transition-all"
        >
          <BiPlusCircle className="inline-block ml-2" />
          إضافة
        </button>

        {}
        <h1 className="text-lg font-bold text-white flex-1 text-center">
          إجراءات القضية
        </h1>
      </motion.header>

      {}
      <motion.button
        onClick={handleAddProcedure}
        className="fixed bottom-6 right-6 sm:hidden flex items-center bg-gradient-green-button text-white px-6 py-3 rounded-full shadow-lg transition hover:bg-gradient-green-dark-button"
        whileHover={{ scale: 1.1 }}
      >
        <BiPlusCircle size={24} className="mr-2" />
        إضافة
      </motion.button>

      {}
      {}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] table-auto bg-white dark:bg-gradient-blue-dark rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white text-sm sm:text-base">
                <th className="px-4 py-2">الإجراء</th>
                <th className="px-4 py-2">المحامي</th>
                <th className="px-4 py-2">تاريخ الانتهاء</th>
                <th className="px-4 py-2">المطلوب</th>
                <th className="px-4 py-2">النتيجة</th>
                <th className="px-4 py-2">حالة الإجراء</th>
                <th className="px-4 py-2">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {proceduresToDisplay.map((procedure) => (
                <tr
                  key={procedure.id}
                  className="border-b bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => setSelectedProcedure(procedure)}
                >
                  <td className="px-4 py-2 text-center">
                    {procedure.procedure_type?.name || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.lawyer?.name || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.date_end}
                  </td>
                  <td className="px-4 py-2 text-center">{procedure.job}</td>
                  <td className="px-4 py-2 text-center">{procedure.result}</td>
                  <td className="px-4 py-2 text-center">{procedure.status}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProcedure(procedure);
                      }}
                      className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 transition"
                    >
                      <BiPencil />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(procedure);
                      }}
                      className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-500 transition"
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
          >
            السابق
          </button>
          <span className="flex items-center">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
          >
            التالي
          </button>
        </div>
      </div>

      {showModal && (
        <ProcedureModal
          legalCaseId={legCaseId}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={fetchProcedures}
          initialData={modalData}
          isEdit={isEditMode}
        />
      )}
      {showConfirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={handleConfirmDelete}
          itemName={procedureToDelete?.procedure_type?.name || 'الإجراء'}
        />
      )}
    </div>
  );
};

export default LegalCaseProcedures;
