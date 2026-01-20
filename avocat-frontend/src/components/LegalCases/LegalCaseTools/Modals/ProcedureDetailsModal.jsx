import React from 'react';

const ProcedureDetailsModal = ({ isOpen, onClose, procedure }) => {
  if (!isOpen || !procedure) return null;

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
          <h2 className="text-xl font-bold text-center p-2 rounded-full bg-gradient-night text-gray-900 dark:text-white  mb-4">
            تفاصيل الإجراء
          </h2>

          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {}

            {}
            <div className="col-span-2">
              <div>
                <label className="text-black dark:text-avocat-indigo-light">
                  نوع الإجراء
                </label>
                <input
                  type="text"
                  value={procedure.procedure_type.name}
                  readOnly
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                />
              </div>

              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                مكان الإجراء
              </label>
              <input
                type="text"
                value={procedure.procedure_place_name || 'فارغ'}
                readOnly
                className="block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>

            {}

            <div>
              <label className="text-avocat-indigo dark:text-avocat-indigo-light">
                المحامي
              </label>
              <input
                type="text"
                value={
                  procedure.lawyer?.name === 'null' || !procedure.lawyer?.name
                    ? 'فارغ'
                    : procedure.lawyer?.name
                }
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="text-avocat-indigo dark:text-avocat-indigo-light">
                حالة الإجراء
              </label>

              <div
                className={`block w-full px-4 py-2 mt-1 text-center rounded-md ${
                  procedure.status === 'تمت'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : procedure.status === 'لم ينفذ'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                }`}
              >
                {procedure.status === 'null' || !procedure.status
                  ? 'فارغ'
                  : procedure.status}
              </div>
            </div>

            <div className="col-span-2">
              <div>
                <label className="block text-avocat-blue-dark dark:text-avocat-indigo-light">
                  تاريخ البدء
                </label>
                <input
                  type="date"
                  name="date_start"
                  value={procedure.date_start}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  readOnly
                />
              </div>

              {}
              <div>
                <label className="block text-avocat-blue-dark dark:text-avocat-indigo-light">
                  تاريخ الانتهاء
                </label>
                <input
                  type="date"
                  name="date_end"
                  value={procedure.date_end}
                  v
                  className="block  w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  readOnly
                />
              </div>
            </div>
            <div className="col-span-2">
              <div>
                <label className="text-avocat-indigo dark:text-avocat-indigo-light">
                  المطلوب
                </label>
                <input
                  type="text"
                  value={
                    procedure.job === 'null' || !procedure.job
                      ? 'فارغ'
                      : procedure.job
                  }
                  readOnly
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                />
              </div>
              <label className="text-avocat-indigo dark:text-avocat-indigo-light">
                النتيجة
              </label>
              <textarea
                value={
                  procedure.result === 'null' || !procedure.result
                    ? 'فارغ'
                    : procedure.result
                }
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              />
              {}   {' '}
              <div>
                <label className="dark:text-gray-200">ملاحظات:</label>         {' '}
                <textarea
                  readOnly
                  value={
                    procedure.note === 'null' || !procedure.note
                      ? ''
                      : procedure.note
                  }
                  className="block w-full px-4 py-2   text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                />
                       {' '}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {}
            <div>
              <label className="text-sm font-medium text-avocat-indigo dark:text-avocat-indigo-light">
                رسوم بإيصالات
              </label>
              <input
                type="text"
                value={
                  procedure.cost1 === 'null' || !procedure.cost1
                    ? 'فارغ'
                    : procedure.cost1
                }
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
                value={
                  procedure.cost2 === 'null' || !procedure.cost2
                    ? 'فارغ'
                    : procedure.cost2
                }
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
                value={
                  procedure.cost3 === 'null' || !procedure.cost3
                    ? 'فارغ'
                    : procedure.cost3
                }
                readOnly
                className="block w-full px-4 py-2 mt-1 border rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-avocat-indigo-light">
              محرر الإجراء
            </label>
            <input
              type="text"
              value={procedure.created_by?.name || 'فارغ'}
              readOnly
              className="block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProcedureDetailsModal;
