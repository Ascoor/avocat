const LegCasesSessions = ({ selectedCase, activeSubTab }) => {
  return (
    <>
      {activeSubTab === 'legSessions' && (
        <div>
          <h4 className="mt-4 text-lg font-semibold">الجلسات:</h4>
          {selectedCase.sessions && selectedCase.sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] table-auto bg-white dark:bg-gradient-blue-dark rounded-lg shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white text-sm sm:text-base">
                    <th className="px-2 py-2 text-center w-1/6">
                      تاريخ الجلسة
                    </th>
                    <th className="px-2 py-2 text-center w-1/6">المحامي</th>
                    <th className="px-2 py-2 text-center w-1/6">الرول</th>
                    <th className="px-2 py-2 text-center w-1/6">المحكمة</th>
                    <th className="px-2 py-2 text-center w-1/6">الطلبات</th>
                    <th className="px-2 py-2 text-center w-1/6">النتيجة</th>
                    <th className="px-2 py-2 text-center w-1/6">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCase.sessions.map((session) => (
                    <tr
                      key={session.id}
                      className="border-b bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                    >
                      <td className="px-2 py-2 text-center">
                        {session.session_date}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {session.lawyer?.name || '-'}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {session.session_roll || '-'}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {session.court?.name || '-'}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {session.orders || '-'}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {session.result || '-'}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {session.status || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>لا توجد جلسات لهذه القضية</p>
          )}
        </div>
      )}
    </>
  );
};

export default LegCasesSessions;
