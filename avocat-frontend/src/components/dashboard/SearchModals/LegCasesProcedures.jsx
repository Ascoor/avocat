const LegCasesProcedures = ({ selectedCase, activeSubTab }) => {
  return (
    <>
      {}
      {activeSubTab === 'procedures' && (
        <div>
          <h4 className="mt-4 text-lg font-semibold">الإجراءات:</h4>
          {selectedCase.procedures && selectedCase.procedures.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {selectedCase.procedures.map((procedure) => (
                    <tr
                      key={procedure.id}
                      className="border-b bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
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
                      <td className="px-4 py-2 text-center">
                        {procedure.result}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {procedure.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>لا توجد إجراءات لهذه القضية</p>
          )}
        </div>
      )}
    </>
  );
};

export default LegCasesProcedures;
