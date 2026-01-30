import { useState, useEffect, useCallback } from 'react';
import { useAlert } from '@/contexts/AlertContext';
import {
  getProcedureTypes,
  createProcedureType,
  updateProcedureType,
  deleteProcedureType,
} from '../../services/api/procedures';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { ProcedureIcon } from '../../assets/icons';

const ProcedureTypes = () => {
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProcedureType, setEditingProcedureType] = useState(null);
  const { triggerAlert } = useAlert();

  const itemsPerPage = 10;

  const fetchProcedureTypes = useCallback(async () => {
    try {
      const response = await getProcedureTypes();
      setProcedureTypes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      triggerAlert('error', 'An error occurred while fetching data.');
    }
  }, [triggerAlert]);

  useEffect(() => {
    fetchProcedureTypes();
  }, [fetchProcedureTypes]);

  const handleAddProcedureType = async (formData) => {
    try {
      await createProcedureType(formData);
      fetchProcedureTypes();
      setShowModal(false);
      triggerAlert('success', 'Procedure type added successfully.');
    } catch (error) {
      console.error('Error adding type:', error);
      triggerAlert('error', 'An error occurred while adding type.');
    }
  };

  const handleEditProcedureType = async (formData) => {
    try {
      await updateProcedureType(editingProcedureType.id, formData);
      fetchProcedureTypes();
      setShowModal(false);
      triggerAlert('success', 'Procedure type updated successfully.');
    } catch (error) {
      console.error('Error updating type:', error);
      triggerAlert('error', 'An error occurred while updating type.');
    }
  };

  const handleDeleteProcedureType = async (procedureTypeId) => {
    try {
      await deleteProcedureType(procedureTypeId);
      fetchProcedureTypes();
      triggerAlert('success', 'Procedure type deleted successfully.');
    } catch (error) {
      console.error('Error deleting type:', error);
      triggerAlert('error', 'An error occurred while deleting type.');
    }
  };

  const handleShowEditModal = (procedureType) => {
    setEditingProcedureType(procedureType);
    setShowModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = procedureTypes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(procedureTypes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const customRenderers = {
    actions: (procedureType) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShowEditModal(procedureType)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleteProcedureType(procedureType.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    ),
  };

  const renderAddButton = () => (
    <button
      onClick={() => {
        setEditingProcedureType(null);
        setShowModal(true);
      }}
      className="bg-gradient-green-button hover:bg-gradient-red-button text-white px-4 py-2 rounded-md shadow-md transition duration-300"
    >
      إضافة نوع إجراء
    </button>
  );

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      <SectionHeader listName="أنواع الإجراءات" icon={ProcedureIcon} />
      <div className="flex justify-start mt-6">{renderAddButton()}</div>

      {}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-gray-600 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg p-6 w-full max-w-lg border border-avocat-yellow">
            <div className="flex justify-center items-center mb-4">
              <h3 className="text-xl font-semibold mb-4 text-avocat-yellow">
                {editingProcedureType
                  ? 'تعديل نوع الإجراء'
                  : 'إضافة نوع الإجراء'}
              </h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingProcedureType
                  ? handleEditProcedureType(new FormData(e.target))
                  : handleAddProcedureType(new FormData(e.target));
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm mb-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  اسم نوع الإجراء
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editingProcedureType?.name || ''}
                  className="w-full px-4 py-2 rounded-md dark:bg-gradient-avocat-dark text-gray-800 border border-avocat-yellow"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gradient-red-button text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:bg-gradient-red-dark-button hover:shadow-lg"
                >
                  إغلاق
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-green-button text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:bg-gradient-green-dark-button hover:shadow-lg"
                >
                  {editingProcedureType ? 'تعديل' : 'إضافة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      <div className="overflow-x-auto mt-6 shadow-lg">
        <table className="w-full border-collapse border border-avocat-orange">
          <thead className="bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-yellow-400">
            <tr>
              <th className="px-4 py-2 border border-gray-300">الاسم</th>
              <th className="px-4 py-2 border border-gray-300">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((procedureType) => (
              <tr
                key={procedureType.id}
                className="dark:bg-gray-800 dark:text-gray-300"
              >
                <td className="px-4 py-2 border border-gray-300 bg-white dark:bg-gray-900">
                  {procedureType.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleShowEditModal(procedureType)}
                      className="text-blue-600 hover:text-blue-700 ml-4 dark:text-blue-400 dark:hover:text-blue-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProcedureType(procedureType.id)
                      }
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      <div className="flex items-center justify-between mt-6">
        {}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded bg-gradient-yellow-button hover:bg-gradient-green-button font-bold"
        >
          التالي
        </button>
        {}
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md font-bold 
   ${
     currentPage === index + 1
       ? 'bg-gradient-yellow-dark-button hover:bg-gradient-green-button ml-2 text-white'
       : 'bg-gray-500 hover:bg-gray-600 text-gray-300 ml-2 dark:bg-gradient-yellow-button dark:text-gray-800 dark:hover:bg-gradient-green-button dark:hover:bg-gray-400'
   } 
 `}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded bg-gradient-yellow-button hover:bg-gradient-green-button font-bold"
        >
          السابق
        </button>
      </div>
    </div>
  );
};

export default ProcedureTypes;
