import React from 'react';

const GlobalConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 text-center mb-4">
          تأكيد الحذف
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          هل أنت متأكد أنك تريد حذف{' '}
          <span className="font-bold text-red-500">{itemName}</span>؟
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            تأكيد
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalConfirmDeleteModal;
