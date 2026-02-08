import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '@shared/services/api/axiosConfig';

const SearchCourt = () => {
  const [allData, setAllData] = useState({
    search_degrees: [],
    search_courts: [],
    search_case_types: [],
  });
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedCaseYear, setSelectedCaseYear] = useState('');
  const [selectedCaseNumber, setSelectedCaseNumber] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    api
      .get('/search-court')
      .then((response) => {
        setAllData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDegreeChange = (event) => {
    const degreeValue = event.target.value;
    setSelectedDegree(degreeValue);
    setSelectedCourt('');
    setSelectedCaseType('');
  };

  const handleCourtChange = (event) => {
    const courtValue = event.target.value;
    setSelectedCourt(courtValue);
    setSelectedCaseType('');
  };

  const handleCaseTypeChange = (event) => {
    const caseTypeValue = event.target.value;
    setSelectedCaseType(caseTypeValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      degree: selectedDegree,
      court: selectedCourt,
      caseType: selectedCaseType,
      caseYear: selectedCaseYear,
      caseNumber: selectedCaseNumber,
    };
    
    axios
      .post('https://search-api.avocat.live/search', formData)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">بحث المحكمة</h3>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">الدرجة</label>
              <select
                className="w-full border border-gray-300 p-2 rounded"
                value={selectedDegree}
                onChange={handleDegreeChange}
              >
                <option value="">إختر الدرجة</option>
                {allData.search_degrees.map((degree) => (
                  <option key={degree.id} value={degree.degree_value}>
                    {degree.degree_name}
                  </option>
                ))}
              </select>
            </div>

            {selectedDegree && (
              <div>
                <label className="block text-gray-700">المحكمة</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={selectedCourt}
                  onChange={handleCourtChange}
                >
                  <option value="">اختر المحكمة</option>
                  {allData.search_courts
                    .filter((court) => court.degree_value === selectedDegree)
                    .map((court) => (
                      <option key={court.id} value={court.court_value}>
                        {court.court_name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {selectedCourt && (
              <div>
                <label className="block text-gray-700">نوع القضية</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={selectedCaseType}
                  onChange={handleCaseTypeChange}
                >
                  <option value="">اختر نوع القضية</option>
                  {allData.search_case_types
                    .filter(
                      (caseType) =>
                        caseType.degree_value === selectedDegree &&
                        caseType.court_value === selectedCourt,
                    )
                    .map((caseType) => (
                      <option
                        key={caseType.id}
                        value={caseType.case_type_value}
                      >
                        {caseType.case_type_name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-700">سنة القضية</label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded"
                value={selectedCaseYear}
                onChange={(event) => setSelectedCaseYear(event.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">رقم القضية</label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded"
                value={selectedCaseNumber}
                onChange={(event) => setSelectedCaseNumber(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              بحث
            </button>
          </div>
        </form>
      </div>

      {searchResults && (
        <div className="mt-6">
          <div dangerouslySetInnerHTML={{ __html: searchResults }} />
        </div>
      )}
    </div>
  );
};

export default SearchCourt;
