import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import SectionHeader from '../common/SectionHeader';
import { SearchSectionIcon } from '../../assets/icons';
import api from '../../services/api/axiosConfig';

const ProcedureSearch = () => {
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedProcedureType, setSelectedProcedureType] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [procedureTypesRes, lawyersRes, courtsRes] = await Promise.all([
          api.get('/procedure_types'),
          api.get('/lawyers'),
          api.get('/courts'),
        ]);
        setProcedureTypes(procedureTypesRes.data);
        setLawyers(lawyersRes.data);
        setCourts(courtsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      !selectedDateStart &&
      !selectedDateEnd &&
      !selectedLawyer &&
      !selectedCourt &&
      !selectedProcedureType &&
      !selectedStatus
    ) {
      setSearchError('لابد من اختيار أحد العناصر للبحث');
      setFilteredProcedures([]);
      return;
    }

    const queryParams = {};
    if (selectedDateStart) queryParams.date_start = selectedDateStart;
    if (selectedDateEnd) queryParams.date_end = selectedDateEnd;
    if (selectedLawyer) queryParams.lawyer_id = selectedLawyer;
    if (selectedCourt) queryParams.court_id = selectedCourt;
    if (selectedProcedureType)
      queryParams.procedure_type_id = selectedProcedureType;
    if (selectedStatus) queryParams.status = selectedStatus;

    api
      .get('/procedures-search', { params: queryParams })
      .then((response) => {
        setFilteredProcedures(response.data);
        setSearchError('');
      })
      .catch((error) => {
        console.error('Error fetching procedures:', error);
      });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <SectionHeader icon={SearchSectionIcon} listName="بحث الإجراءات" />
      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="procedureType" className="mb-2 font-medium">
            نوع الإجراء
          </label>
          <select
            id="procedureType"
            value={selectedProcedureType}
            onChange={(event) => setSelectedProcedureType(event.target.value)}
            className="p-2 border rounded-md shadow-sm"
          >
            <option value="">اختر نوع الإجراء</option>
            {procedureTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="lawyer" className="mb-2 font-medium">
            المحامي
          </label>
          <select
            id="lawyer"
            value={selectedLawyer}
            onChange={(event) => setSelectedLawyer(event.target.value)}
            className="p-2 border rounded-md shadow-sm"
          >
            <option value="">اختر المحامي</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer.id} value={lawyer.id}>
                {lawyer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">الفترة الزمنية</label>
          <DatePicker
            selected={selectedDateStart}
            onChange={(date) => setSelectedDateStart(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="تاريخ البدء"
            className="p-2 border rounded-md shadow-sm"
          />
          <DatePicker
            selected={selectedDateEnd}
            onChange={(date) => setSelectedDateEnd(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="تاريخ الانتهاء"
            className="p-2 border rounded-md shadow-sm mt-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="court" className="mb-2 font-medium">
            المحكمة
          </label>
          <select
            id="court"
            value={selectedCourt}
            onChange={(event) => setSelectedCourt(event.target.value)}
            className="p-2 border rounded-md shadow-sm"
          >
            <option value="">اختر المحكمة</option>
            {courts.map((court) => (
              <option key={court.id} value={court.id}>
                {court.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="mb-2 font-medium">
            الحالة
          </label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="p-2 border rounded-md shadow-sm"
          >
            <option value="">اختر الحالة</option>
            <option value="منتهي">منتهي</option>
            <option value="لم ينفذ">لم ينفذ</option>
            <option value="قيد التنفيذ">قيد التنفيذ</option>
          </select>
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          بحث
        </button>
      </form>

      {searchError && <p className="text-red-500 mt-4">{searchError}</p>}

      {filteredProcedures.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">نوع الإجراء</th>
                <th className="p-3 border">المحامي</th>
                <th className="p-3 border">جهة الإجراء</th>
                <th className="p-3 border">تاريخ البدء</th>
                <th className="p-3 border">تاريخ الانتهاء</th>
                <th className="p-3 border">نتيجة الإجراء</th>
                <th className="p-3 border">حالة الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcedures.map((procedure) => (
                <tr key={procedure.id} className="hover:bg-gray-100">
                  <td className="p-3 border">
                    {procedure.procedure_type?.name}
                  </td>
                  <td className="p-3 border">{procedure.lawyer?.name}</td>
                  <td className="p-3 border">{procedure.court?.name}</td>
                  <td className="p-3 border">{procedure.date_start}</td>
                  <td className="p-3 border">{procedure.date_end}</td>
                  <td className="p-3 border">{procedure.result}</td>
                  <td className="p-3 border">{procedure.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProcedureSearch;
