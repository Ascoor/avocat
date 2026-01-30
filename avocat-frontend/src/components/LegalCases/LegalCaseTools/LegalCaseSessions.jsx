import React, { useEffect, useState } from 'react';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import {
  getSessionsByLegCaseId,
  deleteSession,
} from '../../../services/api/sessions';
import SessionModal from './Modals/SessionModal';
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal';
import { useAlert } from '@/contexts/AlertContext';
import SessionDetailsModal from './Modals/SessionDetailsModal';
import { motion } from 'framer-motion';
const LegalCaseSessions = ({ legCaseId }) => {
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const { triggerAlert } = useAlert();
  const [selectedSession, setSelectedSession] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };
  const sessionsToDisplay = paginateData(sessions);
  const fetchSessions = async () => {
    try {
      const response = await getSessionsByLegCaseId(legCaseId);
      setSessions(response.data.data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setSessions([]);
    }
  };
  useEffect(() => {
    fetchSessions();
  }, [legCaseId]);

  const handleAddSession = () => {
    setIsEditMode(false);
    setModalData(null);
    setShowModal(true);
  };

  const handleEditSession = (session) => {
    setIsEditMode(true);
    setModalData(session);
    setShowModal(true);
  };

  const handleDeleteClick = (session) => {
    setSessionToDelete(session);
  };

  const handleConfirmDelete = async () => {
    try {
      if (sessionToDelete) {
        await deleteSession(sessionToDelete.id);
        setSessions((prev) =>
          prev.filter((sess) => sess.id !== sessionToDelete.id),
        );
        triggerAlert('success', 'تم حذف الجلسة بنجاح.');
        setSessionToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      triggerAlert('error', 'فشل حذف الجلسة.');
    }
  };

  const handleSubmitSession = (newSessionData) => {
    if (isEditMode) {
      setSessions((prev) =>
        prev.map((sess) =>
          sess.id === newSessionData.id ? { ...sess, ...newSessionData } : sess,
        ),
      );
    } else {
      setSessions((prev) => [...prev, newSessionData]);
    }
    setShowModal(false);
    triggerAlert(
      'success',
      isEditMode ? 'تم تحديث الجلسة.' : 'تمت إضافة الجلسة.',
    );
  };

  const handleRowClick = (session) => {
    setSelectedSession(session);
  };

  const totalPages = Math.ceil(sessions.length / rowsPerPage);
  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100">
      {}
      <motion.header
        className="p-4 bg-gradient-blue-dark dark:bg-avocat-blue-dark flex justify-between items-center rounded-lg shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {}
        <button
          onClick={handleAddSession}
          className="px-2 py-2 text-sm rounded-lg font-bold bg-gradient-green-button hover:bg-gradient-green-dark-button text-white shadow-md hover:scale-105 transform transition-all"
        >
          <BiPlusCircle className="inline-block ml-2" />
          إضافة
        </button>

        {}
        <h1 className="text-lg font-bold text-white flex-1 text-center">
          جلسات القضية
        </h1>
      </motion.header>

      <div className="p-6">
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto bg-white dark:bg-gradient-blue-dark rounded-lg shadow-base overflow-hidden">
            <thead>
              <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white">
                <th className="px-2 py-2 text-center w-1/6">تاريخ الجلسة</th>
                <th className="px-2 py-2 text-center w-1/6">المحامي</th>
                <th className="px-2 py-2 text-center w-1/6">الرول</th>
                <th className="px-2 py-2 text-center w-1/6">المحكمة</th>
                <th className="px-2 py-2 text-center w-1/6">الطلبات</th>
                <th className="px-2 py-2 text-center w-1/6">النتيجة</th>
                <th className="px-2 py-2 text-center w-1/6">الحالة</th>
                <th className="px-2 py-2 text-center w-1/6">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {sessionsToDisplay.map((session) => (
                <tr
                  key={session.id}
                  className="border-b bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => handleRowClick(session)}
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
                  <td className="px-2 py-2 text-center flex justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSession(session);
                      }}
                      className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 transition"
                    >
                      <BiPencil />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(session);
                      }}
                      className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-500 transition"
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
          >
            السابق
          </button>
          <span className="flex items-center">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
          >
            التالي
          </button>
        </div>
      </div>
      {}
      {selectedSession && (
        <SessionDetailsModal
          isOpen={!!selectedSession}
          onClose={() => setSelectedSession(null)}
          session={selectedSession}
        />
      )}
      {showModal && (
        <SessionModal
          isOpen={showModal}
          fetchSessions={fetchSessions}
          legalCaseId={legCaseId}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitSession}
          initialData={modalData}
          isEdit={isEditMode}
        />
      )}
      {sessionToDelete && (
        <GlobalConfirmDeleteModal
          isOpen={!!sessionToDelete}
          onClose={() => setSessionToDelete(null)}
          onConfirm={handleConfirmDelete}
          itemName={sessionToDelete.session_date || 'الجلسة'}
        />
      )}
    </div>
  );
};

export default LegalCaseSessions;
