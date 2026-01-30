import React, { useState, useEffect, useMemo } from 'react';
import { getAllSessions } from '../../services/api/sessions.js';
import { useSpinner } from '@/contexts/SpinnerContext';
import SectionHeader from '../common/SectionHeader.jsx';
import { SearchIcon, SearchSectionIcon } from '../../assets/icons/index.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SessionDetailsModal from '../LegalCases/LegalCaseTools/Modals/SessionDetailsModal.jsx';
import { MdVisibility } from 'react-icons/md';

const LegalSessions = () => {
  const { showSpinner, hideSpinner } = useSpinner();
  const [allSessions, setAllSessions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [selectedSessionType, setSelectedSessionType] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        showSpinner();
        const response = await getAllSessions();
        if (response?.data) {
          const sortedSessions = response.data.sort(
            (a, b) => new Date(b.session_date) - new Date(a.session_date),
          );

          setAllSessions(sortedSessions);
          setSessions(sortedSessions.slice(0, 50));
          setFilteredSessions(sortedSessions);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setAllSessions([]);
        setSessions([]);
      } finally {
        hideSpinner();
      }
    };

    fetchSessions();
  }, []);

  const sessionTypes = useMemo(
    () =>
      [
        ...new Set(
          allSessions.map((session) => session.legal_session_type?.name),
        ),
      ].filter(Boolean),
    [allSessions],
  );
  const lawyers = useMemo(
    () =>
      [...new Set(allSessions.map((session) => session.lawyer?.name))].filter(
        Boolean,
      ),
    [allSessions],
  );

  const courts = useMemo(
    () =>
      [...new Set(allSessions.map((session) => session.court?.name))].filter(
        Boolean,
      ),
    [allSessions],
  );
  useEffect(() => {
    let filtered;

    if (
      !selectedCourt &&
      !selectedLawyer &&
      !selectedSessionType &&
      !selectedStatus &&
      !selectedDateStart &&
      !selectedDateEnd &&
      !searchTerm
    ) {
      filtered = sessions.slice(0, 50);
    } else {
      filtered = [...allSessions];

      if (selectedCourt) {
        filtered = filtered.filter(
          (session) => session.court?.name === selectedCourt,
        );
      }

      if (selectedLawyer) {
        filtered = filtered.filter(
          (session) => session.lawyer?.name === selectedLawyer,
        );
      }

      if (selectedSessionType) {
        filtered = filtered.filter(
          (session) => session.legal_session_type?.name === selectedSessionType,
        );
      }

      if (selectedStatus) {
        filtered = filtered.filter(
          (session) => session.status === selectedStatus,
        );
      }

      if (selectedDateStart && selectedDateEnd) {
        filtered = filtered.filter((session) => {
          const sessionDate = new Date(session.session_date);
          return (
            sessionDate >= selectedDateStart && sessionDate <= selectedDateEnd
          );
        });
      }

      if (searchTerm) {
        filtered = filtered.filter((session) =>
          session.leg_case?.slug
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
      }
    }

    setFilteredSessions(filtered);
    setCurrentPage(1);
  }, [
    selectedCourt,
    selectedLawyer,
    selectedSessionType,
    selectedStatus,
    selectedDateStart,
    selectedDateEnd,
    searchTerm,
    allSessions,
  ]);

  const totalPages = Math.ceil(filteredSessions.length / rowsPerPage);
  const paginatedSessions = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredSessions.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredSessions, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getSessionColor = (status) => {
    switch (status) {
      case 'جارى التنفيذ':
        return 'bg-red-500 text-white';
      case 'لم ينفذ':
        return 'bg-blue-500 text-white';
      case 'تمت':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const openModal = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  return (
    <div className="p-6">
      <SectionHeader icon={SearchIcon} listName="بحث الجلسات" />
      {}

      {}
      <div className="p-6 bg-white mt-4 mb-4 dark:bg-gray-600/20 rounded-lg shadow-md shadow-avocat-blue dark:shadow-avocat-orange-dark bg-opacity-50 dark:bg-opacity-50">
        {}
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4 text-center">
          🔍 البحث والتصفية
        </h3>

        {}
        <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-3 gap-6">
          {}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              بحث برقم الملف
            </label>
            <input
              type="text"
              placeholder="أدخل رقم الملف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 border     text-center rounded-md shadow-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
            />
          </div>

          {}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              المحكمة
            </label>
            <select
              value={selectedCourt}
              onChange={(event) => setSelectedCourt(event.target.value)}
              className="p-3 border rounded-md shadow-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
            >
              <option className="text-center" value="">
                اختر المحكمة
              </option>
              {courts.map((court) => (
                <option key={court} value={court}>
                  {court}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              نوع الجلسة
            </label>
            <select
              value={selectedSessionType}
              onChange={(event) => setSelectedSessionType(event.target.value)}
              className="p-3 border rounded-md shadow-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
            >
              <option className="text-center" value="">
                اختر نوع الجلسة
              </option>
              {sessionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 text-center  md:grid-cols-3 gap-6 mt-4">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              المحامي
            </label>
            <select
              value={selectedLawyer}
              onChange={(event) => setSelectedLawyer(event.target.value)}
              className="p-2 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option className="text-center" value="">
                اختر المحامي
              </option>
              {lawyers.map((lawyer) => (
                <option key={lawyer} value={lawyer}>
                  {lawyer}
                </option>
              ))}
            </select>
          </div>
          {}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              تاريخ البدء
            </label>
            <DatePicker
              selected={selectedDateStart}
              onChange={(date) => setSelectedDateStart(date)}
              selectsStart
              startDate={selectedDateStart}
              endDate={selectedDateEnd}
              dateFormat="yyyy/MM/dd"
              placeholderText="اختر تاريخ البدء"
              className="p-3 border rounded-md shadow-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
            />
          </div>

          {}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              تاريخ الانتهاء
            </label>
            <DatePicker
              selected={selectedDateEnd}
              onChange={(date) => setSelectedDateEnd(date)}
              selectsEnd
              startDate={selectedDateStart}
              endDate={selectedDateEnd}
              dateFormat="yyyy/MM/dd"
              placeholderText="اختر تاريخ الانتهاء"
              className="p-3 border rounded-md shadow-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
            />
          </div>
        </div>
      </div>

      {}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border text-center border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 bg-gradient-day dark:bg-gradient-night text-gray-100 dark:text-yellow-400">
              <th className="border px-4 py-2">عرض</th>
              <th className="border px-4 py-2"> رقم الملف</th>
              <th className="border px-4 py-2">نوع الجلسة</th>
              <th className="border px-4 py-2 w-2/12">التاريخ</th>
              <th className="border px-4 py-2 w-2/12">المحكمة</th>
              <th className="border px-4 py-2">الدائرة</th>
              <th className="border px-4 py-2">المحامي</th>
              <th className="border px-4 py-2 w-4/12">النتيجة</th>
              <th className="border px-4 py-2">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSessions.map((session) => (
              <tr
                key={session.id}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openModal(session)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                  >
                    <MdVisibility />
                  </button>
                </td>
                <td className="border px-4 py-2">
                  {session.leg_case?.slug || 'غير متوفر'}
                </td>
                <td className="border px-4 py-2">
                  {session.legal_session_type?.name || 'غير متوفر'}
                </td>
                <td className="border px-4 py-2">
                  {session.session_date || 'غير متوفر'}
                </td>
                <td className="border px-4 py-2">
                  {session.court?.name || 'غير متوفر'}
                </td>
                <td className="border px-4 py-2">
                  {session.court_session || 'غير متوفر'}
                </td>
                <td className="border px-4 py-2">
                  {session.lawyer?.name || 'غير متوفر'}
                </td>
                <td className="border px-4 py-2">
                  {session.result || 'غير متوفر'}
                </td>
                <td
                  className={`border px-4 py-2 ${getSessionColor(session.status)}`}
                >
                  {session.status || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 dark:bg-gray-800 text-white rounded disabled:opacity-50"
        >
          السابق
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-400'
            } text-white rounded`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 dark:bg-gray-800 text-white rounded disabled:opacity-50"
        >
          التالي
        </button>
      </div>
      {isModalOpen && (
        <SessionDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          session={selectedSession}
        />
      )}
    </div>
  );
};

export default LegalSessions;
