import React, { useState, useEffect } from 'react';
import {
  getExpensesCategories,
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from '../../services/api/GeneralReqApi';
import { ExpenseIcon } from '../../assets/icons';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { useAlert } from '@/contexts/AlertContext';

import GlobalConfirmDeleteModal from '../common/GlobalConfirmDeleteModal';
const ExpenseCategorys = () => {
  const [expenseCategorys, setExpenseCategorys] = useState([]);
  const [expenseCategoryToDelete, setExpenseCategoryToDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingExpenseCategory, setEditingExpenseCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { triggerAlert } = useAlert();

  useEffect(() => {
    fetchExpenseCategorys();
  }, []);

  useEffect(() => {
    updateCurrentItems();
  }, [expenseCategorys, currentPage]);

  const fetchExpenseCategorys = async () => {
    try {
      const response = await getExpensesCategories();
      setExpenseCategorys(response.data[0] || []);
    } catch (error) {
      triggerAlert('error', 'حدث خطأ في حفظ نوع المصروف');
    }
  };

  const updateCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  };

  const handleShowModal = (expenseCategory = null) => {
    setShowModal(true);
    setEditingExpenseCategory(expenseCategory);
  };

  const handleSaveExpenseCategory = async (data) => {
    try {
      if (editingExpenseCategory) {
        await updateExpenseCategory(editingExpenseCategory.id, data);
        triggerAlert('success', 'تم تحديث نوع المصروف بنجاح!');
      } else {
        await createExpenseCategory(data);
        triggerAlert('success', 'تم إضافة نوع المصروف بنجاح!');
        setShowModal(false);
        fetchExpenseCategorys();
      }
      setShowModal(false);
      fetchExpenseCategorys();
    } catch (error) {
      triggerAlert('error', 'حدث خطأ في حفظ نوع المصروف');
    }
  };
  const handleDeleteExpenseCategory = (expenseCategory) => {
    setExpenseCategoryToDelete(expenseCategory);
    setConfirmDelete(true);
  };

  const confirmDeleteExpenseCategory = async () => {
    try {
      await deleteExpenseCategory(expenseCategoryToDelete.id);
      fetchExpenseCategorys();
      setExpenseCategoryToDelete(null);
      setConfirmDelete(false);
      triggerAlert('success', 'تم حذف نوع المصروف بنجاح!');
    } catch (error) {
      triggerAlert('error', 'حدث خطأ في حذف نوع المصروف');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(expenseCategorys.length / itemsPerPage);
  const currentItems = expenseCategorys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full bg-gray-50 dark:bg-gray-900">
      <SectionHeader listName="أنواع المصروفات" icon={ExpenseIcon} />
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handleShowModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          إضافة نوع المصروف
        </button>
      </div>
      {}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {editingExpenseCategory
                ? 'تعديل نوع المصروف'
                : 'إضافة نوع المصروف'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                handleSaveExpenseCategory(data);
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  إسم المصروف
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editingExpenseCategory?.name || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  {editingExpenseCategory ? 'حفظ التعديلات' : 'إضافة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {}
      <div className="overflow-x-auto mt-6 shadow rounded-lg bg-gray-100 dark:bg-gray-800">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                الإسم
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((expenseCategory) => (
              <tr
                key={expenseCategory.id}
                className="bg-white text-center dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                  {expenseCategory.name}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => handleShowModal(expenseCategory)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteExpenseCategory(expenseCategory)
                      }
                      className="text-red-500 hover:text-red-700"
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
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          السابق
        </button>
        <span className="text-gray-800 dark:text-gray-100">
          الصفحة {currentPage} من {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          التالي
        </button>
      </div>{' '}
      {confirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onConfirm={confirmDeleteExpenseCategory}
          itemName={expenseCategoryToDelete.name}
        />
      )}
    </div>
  );
};

export default ExpenseCategorys;
