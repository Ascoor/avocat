import React from 'react';

const SearchResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 transition-all">
      <h3 className="text-2xl font-bold text-purple-600 dark:text-yellow-400 text-center mb-4">
        📜 نتيجة البحث
      </h3>

      {data.message ? (
        <p className="text-center text-red-500 dark:text-red-400">
          {data.message}
        </p>
      ) : (
        <>
          {/* تفاصيل القضية */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
            <h4 className="text-lg font-semibold text-purple-700 dark:text-yellow-300 mb-2">
              ⚖️ تفاصيل القضية:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>رقم الدعوى:</strong> {data.caseNumber || 'غير متوفر'}
              </p>
              <p>
                <strong>السنة:</strong> {data.caseYear || 'غير متوفرة'}
              </p>
              <p>
                <strong>نوع الدعوى:</strong> {data.caseTypeName || 'غير متوفرة'}
              </p>
              <p>
                <strong>تاريخ القيد:</strong> {data.caseRecordDate || 'غير متوفر'}
              </p>
              <p>
                <strong>المدعي:</strong> {data.person1 || 'غير متوفر'}
              </p>
              <p>
                <strong>المدعى عليه:</strong> {data.person2 || 'غير متوفر'}
              </p>
              <p className="md:col-span-2">
                <strong>الموضوع:</strong> {data.subject || 'غير متوفر'}
              </p>
              <p>
                <strong>آخر جلسة:</strong> {data.lastSessionDate || 'غير متوفرة'}
              </p>
              <p>
                <strong>قرار آخر جلسة:</strong>{' '}
                {data.lastSessionDecision || 'غير متوفر'}
              </p>
            </div>
          </div>

          {/* جدول الجلسات */}
          <h4 className="text-xl font-bold text-purple-600 dark:text-yellow-300 mb-4 text-center">
            📅 جدول الجلسات:
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 shadow-lg rounded-lg">
              <thead className="bg-purple-600 dark:bg-yellow-500 text-white dark:text-gray-900">
                <tr>
                  <th className="px-4 py-3 border-b">📆 تاريخ الجلسة</th>
                  <th className="px-4 py-3 border-b">📜 قرار الجلسة</th>
                  <th className="px-4 py-3 border-b">
                    ⏭️ تاريخ الجلسة القادمة
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.sessionsDetails?.length > 0 ? (
                  data.sessionsDetails.map((session, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      <td className="px-4 py-3">{session.sessionDate || '-'}</td>
                      <td className="px-4 py-3">
                        {session.sessionDecision || 'لا يوجد قرار'}
                      </td>
                      <td className="px-4 py-3">
                        {session.nextSessionDate || 'غير متوفرة'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-500 py-3">
                      ⚠️ لا توجد جلسات متاحة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
