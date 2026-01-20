import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

function DashboardCard07() {
  const [data, setData] = useState({
    openCases: 50,
    consultations: 120,
    sessions: 30,
    caseTrend: [73, 64, 73, 69, 104, 104, 164],
    caseStatus: [30, 20, 10],
    lawyerCases: [10, 15, 25],
  });

  const caseTrendData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
    datasets: [
      {
        label: 'عدد القضايا',
        data: data.caseTrend,
        borderColor: '#4B8BF5',
        backgroundColor: 'rgba(75, 139, 245, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const caseStatusData = {
    labels: ['مفتوحة', 'مغلقة', 'في المحكمة'],
    datasets: [
      {
        data: data.caseStatus,
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        borderWidth: 1,
      },
    ],
  };

  const lawyerCaseData = {
    labels: ['محامي 1', 'محامي 2', 'محامي 3'],
    datasets: [
      {
        label: 'عدد القضايا',
        data: data.lawyerCases,
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night dark:text-white text-gray-800 shadow rounded-lg p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="px-5 py-4 border-b border-gray-300 dark:border-gray-700 flex items-center">
        <h2 className="font-semibold text-md">🎯 القضايا المتداولة</h2>
      </header>

      <div className="text-4xl text-blue-500">{data.openCases}</div>

      {}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 flex justify-center items-center">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
          عدد الاستشارات
        </h3>
        <div className="text-4xl text-green-500">{data.consultations}</div>
      </div>

      {}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 flex justify-center items-center">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
          عدد الجلسات
        </h3>
        <div className="text-4xl text-orange-500">{data.sessions}</div>
      </div>

      {}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
          عدد القضايا عبر الزمن
        </h3>
        <Line data={caseTrendData} />
      </div>
    </div>
  );
}

export default DashboardCard07;
