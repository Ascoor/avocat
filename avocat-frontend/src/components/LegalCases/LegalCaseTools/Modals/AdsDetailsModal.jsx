import React from 'react';
import { BiX } from 'react-icons/bi';

const AdsDetailsModal = ({ isOpen, onClose, adDetails }) => {
  if (!isOpen || !adDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xl w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold">تفاصيل الإعلان القانوني</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <BiX size={24} />
          </button>
        </div>
        <div className="p-4">
          {}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {}
            <div>
              <label className="block text-sm font-medium">نوع الإعلان</label>
              <p className="text-gray-700 dark:text-gray-300">
                {adDetails.legalAdType?.name || 'غير متوفر'}
              </p>
            </div>

            {}
            <div>
              <label className="block text-sm font-medium">المحكمة</label>
              <p className="text-gray-700 dark:text-gray-300">
                {adDetails.court?.name || 'غير متوفر'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {}
            <div>
              <label className="block text-sm font-medium">
                المحامي المرسل
              </label>
              <p className="text-gray-700 dark:text-gray-300">
                {adDetails.lawyerSend?.name || 'غير متوفر'}
              </p>
            </div>

            {}
            <div>
              <label className="block text-sm font-medium">
                المحامي المستلم
              </label>
              <p className="text-gray-700 dark:text-gray-300">
                {adDetails.lawyerReceive?.name || 'غير متوفر'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {}
            <div>
              <label className="block text-sm font-medium">تاريخ الإرسال</label>
              <p className="text-gray-700 dark:text-gray-300">
                {adDetails.send_date || 'غير متوفر'}
              </p>
            </div>

            {}
            <div>
              <label className="block text-sm font-medium">
                تاريخ الاستلام
              </label>
              <p className="text-gray-700 dark:text-gray-300">
                {adDetails.receive_date || 'غير متوفر'}
              </p>
            </div>
          </div>

          {}
          <div className="mb-4">
            <label className="block text-sm font-medium">الحالة</label>
            <p
              className={`px-4 py-2 rounded-lg text-center ${
                adDetails.status === 'تم'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : adDetails.status === 'معلق'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              }`}
            >
              {adDetails.status || 'غير متوفر'}
            </p>
          </div>

          {}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">التكلفة 1</label>
              <p className="text-gray-700 dark:text-gray-300">
                {adDetails.cost || 'غير متوفر'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium">التكلفة 2</label>
              <p className="text-gray-700 dark:text-gray-300">
                {adDetails.cost2 || 'غير متوفر'}
              </p>
            </div>
          </div>

          {}
          <div className="mb-4">
            <label className="block text-sm font-medium">الوصف</label>
            <p className="text-gray-700 dark:text-gray-300">
              {adDetails.description || 'غير متوفر'}
            </p>
          </div>

          {}
          <div className="mb-4">
            <label className="block text-sm font-medium">النتائج</label>
            <p className="text-gray-700 dark:text-gray-300">
              {adDetails.results || 'غير متوفر'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsDetailsModal;
