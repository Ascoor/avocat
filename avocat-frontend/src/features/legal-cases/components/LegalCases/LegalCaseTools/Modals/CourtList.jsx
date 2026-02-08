const CourtList = ({ courts, handleDelete }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
        المحاكم الحالية
      </h3>
      {courts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200 border-collapse">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-center">المحكمة</th>
                <th className="px-6 py-3 text-center">السنة</th>
                <th className="px-6 py-3 text-center">رقم القضية</th>
                <th className="px-6 py-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court, index) => (
                <tr
                  key={court.id}
                  className={`border-b ${
                    index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-center">{court.name}</td>
                  <td className="px-6 py-4 text-center">
                    {court.pivot.case_year}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {court.pivot.case_number}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(court.id, court.name)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
          لا يوجد محاكم مسجلة حاليًا
        </div>
      )}
    </div>
  );
};

export default CourtList;
