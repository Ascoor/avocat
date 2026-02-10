import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResults from '@shared/layout/SearchResults';
import api from '@shared/services/api/axiosConfig';
import { useSecurity } from '@shared/security/SecurityContext';
import { canCrud } from '@shared/security/permissions';
import ForbiddenState from '@shared/security/ForbiddenState';

const SearchCourtsApi = () => {
  const { permissions } = useSecurity();
  const acl = canCrud(permissions, 'courts');
  const [allData, setAllData] = useState({});
  const [degree, setDegree] = useState('');
  const [court, setCourt] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseYear, setCaseYear] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [courtOptions, setCourtOptions] = useState([]);
  const [caseTypeOptions, setCaseTypeOptions] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/search-court');
        setAllData(response.data);
        setCourtOptions(response.data.search_degrees || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
    setCourtOptions(
      allData.search_courts?.filter(
        (item) => item.degree_value === e.target.value,
      ) || [],
    );
  };

  const handleCourtChange = (e) => {
    setCourt(e.target.value);
    setCaseTypeOptions(
      allData.search_case_types?.filter(
        (item) =>
          item.degree_value === degree && item.court_value === e.target.value,
      ) || [],
    );
  };

  const handleSubmit = () => {
    setShowCountdown(true);
    let counter = 5;
    const interval = setInterval(() => {
      setCountdown(counter);
      counter -= 1;
      if (counter < 0) {
        clearInterval(interval);
        performSearch();
        setShowCountdown(false);
      }
    }, 1000);
  };

  const performSearch = async () => {
    if (!degree || !court || !caseType || !caseYear || !caseNumber) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://search-api.ask-ar.net/search',
        { degree, court, caseType, caseYear, caseNumber },
        { headers: { 'x-request-source': 'React' } },
      );
      setSearchResults(response.data || { message: 'الدعوى غير مقيدة' });
    } catch (error) {
      console.error(error);
      setSearchResults({
        message: 'حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!acl.view) return <ForbiddenState moduleLabel="Courts" />;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-purple-600 dark:text-yellow-400 mb-6">
          🔍 البحث عن دعوى
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
              الدرجة:
            </label>
            <select
              onChange={handleDegreeChange}
              className="w-full border rounded p-3 dark:bg-gray-800 dark:text-white"
            >
              <option className="text-center" value="">
                -- اختر --
              </option>
              {allData.search_degrees?.map((degree, index) => (
                <option
                  key={`${degree.degree_value}-${degree.degree_name}`}
                  value={degree.degree_value}
                >
                  {degree.degree_name}
                </option>
              ))}
            </select>
          </div>

          {courtOptions.length > 0 && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                المحكمة:
              </label>
              <select
                onChange={handleCourtChange}
                className="w-full border rounded p-3 dark:bg-gray-800 dark:text-white"
              >
                <option className="text-center" value="">
                  -- اختر --
                </option>
                {courtOptions.map((court) => (
                  <option key={court.court_value} value={court.court_value}>
                    {court.court_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {caseTypeOptions.length > 0 && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                نوع الدعوى:
              </label>
              <select
                onChange={(e) => setCaseType(e.target.value)}
                className="w-full border rounded p-3 dark:bg-gray-800 dark:text-white"
              >
                <option className="text-center" value="">
                  -- اختر --
                </option>
                {caseTypeOptions.map((caseType) => (
                  <option
                    key={caseType.case_type_value}
                    value={caseType.case_type_value}
                  >
                    {caseType.case_type_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
              سنة الدعوى:
            </label>
            <input
              type="text"
              value={caseYear}
              onChange={(e) => setCaseYear(e.target.value)}
              className="w-full border rounded p-3 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
              رقم الدعوى:
            </label>
            <input
              type="number"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="w-full border rounded p-3 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-purple-700 hover:bg-purple-800 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          {loading ? 'جاري البحث...' : '🔍 بحث'}
        </button>

        {showCountdown && (
          <div className="flex items-center justify-center mt-4">
            <div className="relative w-16 h-16 flex items-center justify-center bg-purple-600 dark:bg-yellow-500 text-white font-bold text-2xl rounded-full">
              {countdown}
            </div>
          </div>
        )}
      </div>

      {searchResults && <SearchResults data={searchResults} />}
    </div>
  );
};

export default SearchCourtsApi;
