import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import GlobalSpinner from '../common/Spinners/GlobalSpinner';
import { motion } from 'framer-motion';
import { CaseDetails } from '../../assets/icons';
import api from '../../services/api/axiosConfig';

const Procedure = lazy(() => import('./LegalCaseTools/LegalCaseProcedures'));
const LegalSession = lazy(() => import('./LegalCaseTools/LegalCaseSessions'));
const LegalCaseAds = lazy(() => import('./LegalCaseTools/LegalCaseAds'));
const LegCaseClients = lazy(() => import('./LegalCaseTools/LegalCaseClients'));
const LegalCaseCourts = lazy(() => import('./LegalCaseTools/LegCaseCourts'));

export default function LegCaseDetails() {
  const { id } = useParams();
  const [legCase, setLegCase] = useState(null);
  const [legcaseClients, setLegcaseClients] = useState([]);
  const [activeTab, setActiveTab] = useState('procedure');
  const [loading, setLoading] = useState(true);
  const fetchLegCase = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/legal-cases/${id}`);
      setLegCase(response.data.leg_case);
      setLegcaseClients(response.data.leg_case.clients);
    } catch (error) {
      console.error('Error fetching legal case details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLegCase();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GlobalSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-lightBg dark:bg-darkBg transition-all">
      {}
      <motion.div
        className="bg-gradient-night p-6 rounded-xl shadow-lg flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={CaseDetails} alt="Case Icon" className="w-28 h-28 ml-4" />
        <h2 className="text-4xl text-white font-bold">بيانات القضية</h2>
      </motion.div>

      {}
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="text-center text-gray-500">جارٍ التحميل...</div>
          }
        >
          <LegCaseClients
            legCaseId={id}
            fetchLegcaseClients={fetchLegCase}
            legcaseClients={legcaseClients}
          />
        </Suspense>
      </div>

      {}
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="text-center text-gray-500">جارٍ التحميل...</div>
          }
        >
          <LegalCaseCourts legCase={legCase} fetchLegCase={fetchLegCase} />
        </Suspense>
      </div>

      {}
      <div className="mt-8">
        {}
        <div className="flex flex-wrap justify-center border-b border-green-400 dark:border-green-700">
          {['procedure', 'session', 'legalAd'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-lg font-semibold transition-all rounded-t-lg sm:rounded-none ${
                activeTab === tab
                  ? 'text-green-600 dark:text-green-300 border-b-4 border-green-400 dark:border-green-500'
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {tab === 'procedure'
                ? 'الإجراءات'
                : tab === 'session'
                  ? 'الجلسات'
                  : 'الإعلانات'}
            </motion.button>
          ))}
        </div>

        {}
        <motion.div
          className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl mt-4 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'procedure' && (
            <Suspense
              fallback={
                <div className="text-center text-gray-500">جارٍ التحميل...</div>
              }
            >
              <Procedure legCaseId={id} />
            </Suspense>
          )}
          {activeTab === 'session' && (
            <Suspense
              fallback={
                <div className="text-center text-gray-500">جارٍ التحميل...</div>
              }
            >
              <LegalSession legCaseId={id} />
            </Suspense>
          )}
          {activeTab === 'legalAd' && (
            <Suspense
              fallback={
                <div className="text-center text-gray-500">جارٍ التحميل...</div>
              }
            >
              <LegalCaseAds legCaseId={id} />
            </Suspense>
          )}
        </motion.div>
      </div>
    </div>
  );
}
