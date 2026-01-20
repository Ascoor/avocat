import { BiMinusCircle } from 'react-icons/bi';

const CourtModal = ({
  legCaseNewCourts,
  updateCourtField,
  removeNewCourt,
  courtLevels,
  filteredCourts,
  years,
}) => {
  return (
    <div className="space-y-4">
      {legCaseNewCourts.map((court, index) => (
        <div
          key={index}
          className="flex flex-wrap gap-4 bg-gray-300 text-avocat-blue-dark dark:text-white dark:bg-avocat-blue-dark p-4 rounded-lg shadow transition"
        >
          <input
            type="text"
            placeholder="رقم القضية"
            value={court.case_number}
            onChange={(e) =>
              updateCourtField(index, 'case_number', e.target.value)
            }
            className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={court.case_year}
            onChange={(e) =>
              updateCourtField(index, 'case_year', e.target.value)
            }
            className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر السنة</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={court.court_level_id}
            onChange={(e) =>
              updateCourtField(index, 'court_level_id', e.target.value)
            }
            className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر درجة المحكمة</option>
            {courtLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
          <select
            value={court.court_id}
            onChange={(e) =>
              updateCourtField(index, 'court_id', e.target.value)
            }
            className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر المحكمة</option>
            {filteredCourts.map((filteredCourt) => (
              <option key={filteredCourt.id} value={filteredCourt.id}>
                {filteredCourt.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeNewCourt(index)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <BiMinusCircle size={28} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourtModal;
