import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MainLawyers,
  MainProcedures,
  MainClients,
  MainLegalCases,
  MainSessions,
  AdIcon,
  ServiceIcon,
} from '../../assets/icons/index';
import axios from 'axios';

import API_CONFIG from '../../config/config';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import MainCard from '../common/MainCard';
moment.locale('ar');

const Home = () => {
  const [clientCount, setClientCount] = useState(0);
  const [legCaseCount, setLegCaseCount] = useState(0);
  const [procedureCount, setProcedureCount] = useState(0);
  const [lawyerCount, setLawyerCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [legalSessionCount, setLegalSessionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const toArabicNumeral = (en) =>
    ('' + en).replace(/[0-9]/g, (t) => '٠١٢٣٤٥٦٧٨٩'.slice(+t, +t + 1));

  useEffect(() => {
    fetchOfficeCount();
  }, []);

  const fetchOfficeCount = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/v1/all_count_office`,
      );
      setClientCount(response.data.client_count || 0);
      setLegCaseCount(response.data.leg_case_count || 0);
      setProcedureCount(response.data.procedure_count || 0);
      setLawyerCount(response.data.lawyer_count || 0);
      setServiceCount(response.data.service_count || 0);
      setLegalSessionCount(response.data.legal_session_count || 0);
    } catch (error) {
      console.error('Error fetching office count:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-800 dark:text-gray-200">
        جاري التحميل...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div
        className="
          bg-gradient-day 
          dark:bg-gradient-night
          text-white dark:text-gray-200
          text-center rounded-lg shadow-xl
          p-6 mb-8 transition-all duration-500 ease-in-out
          hover:shadow-2xl hover:scale-105
        "
      >
        <h1 className="text-4xl font-bold text-white dark:text-avocat-orange-light tracking-wide">
          📊 لوحة التحكم - مكتب أفوكات
        </h1>
      </div>

      <div
        className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'} gap-4`}
      >
        <Link to="/sessions">
          <MainCard
            count={toArabicNumeral(legalSessionCount)}
            icon={MainSessions}
            label="الجلسات"
          />
        </Link>

        <Link to="/cases">
          <MainCard
            count={toArabicNumeral(legCaseCount)}
            icon={MainLegalCases}
            label="القضايا"
          />
        </Link>

        <Link to="/services">
          <MainCard
            count={toArabicNumeral(serviceCount)}
            icon={ServiceIcon}
            label="الخدمات"
          />
        </Link>

        <Link to="/procedures">
          <MainCard
            count={toArabicNumeral(procedureCount)}
            icon={MainProcedures}
            label="الإجراءات"
          />
        </Link>

        <Link to="/clients">
          <MainCard
            count={toArabicNumeral(clientCount)}
            icon={MainClients}
            label="العملاء"
          />
        </Link>

        <Link to="/lawyers">
          <MainCard
            count={toArabicNumeral(lawyerCount)}
            icon={MainLawyers}
            label="المحامون"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
