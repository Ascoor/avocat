import React from 'react';

const SessionDetailsModal = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        id="modal-overlay"
        onClick={(e) => e.target.id === 'modal-overlay' && onClose()}
        className="fixed inset-0"
      >
        <section className="relative w-full max-w-lg max-h-[90vh] p-6 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
          {}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
          >
            &#x2715;
          </button>

          {}
          <h2 className="text-xl font-bold text-center p-2 rounded-full bg-gradient-night text-white dark:text-avocat-indigo-light mb-4">
            تفاصيل الجلسة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                تاريخ الجلسة
              </label>
              <input
                type="text"
                value={session.session_date || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>

            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                المحامي
              </label>
              <input
                type="text"
                value={session.lawyer?.name || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>

            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                الرول
              </label>
              <input
                type="text"
                value={session.session_roll || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>

            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                المحكمة
              </label>
              <input
                type="text"
                value={session.court?.name || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>

            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                نوع الجلسة
              </label>
              <input
                type="text"
                value={session.legal_session_type?.name || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>

            {}
            <div>
              <label className="text-avocat-indigo dark:text-avocat-indigo-light">
                حالة الجلسة
              </label>
              <div
                className={`block w-full px-4 py-2 mt-1 text-center rounded-md ${
                  session.status === 'تمت'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : session.status === 'لم ينفذ'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                }`}
              >
                {session.status || 'فارغ'}
              </div>
            </div>

            {}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                الطلبات
              </label>
              <textarea
                value={session.orders || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              ></textarea>
            </div>

            {}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                النتيجة
              </label>
              <textarea
                value={session.result || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              ></textarea>
            </div>

            {}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                الملاحظات
              </label>
              <textarea
                value={session.notes || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {}
            <div>
              <label className="text-sm font-medium text-avocat-indigo dark:text-avocat-indigo-light">
                رسوم رسمية
              </label>
              <input
                type="text"
                value={session.cost1 || 'فارغ'}
                readOnly
                className="block w-full px-4 py-2 mt-1 border rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none"
              />
            </div>

            {}
            <div>
              <label className="text-sm font-medium text-avocat-indigo dark:text-avocat-indigo-light">
                مصاريف إدارية
              </label>
              <input
                type="text"
                value={session.cost2 || 'فارغ'}
                readOnly
                className="block w-full px-4 py-2 mt-1 border rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none"
              />
            </div>

            {}
            <div>
              <label className="text-sm font-medium text-avocat-indigo dark:text-avocat-indigo-light">
                إكراميات
              </label>
              <input
                type="text"
                value={session.cost3 || 'فارغ'}
                readOnly
                className="block w-full px-4 py-2 mt-1 border rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none"
              />
            </div>

            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                المحرر
              </label>
              <input
                type="text"
                value={session.created_by?.name || 'غير متوفر'}
                readOnly
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SessionDetailsModal;
