import React, { useState, useMemo } from 'react';
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
import { getChartPalette } from '@shared/utils/themeColors';
import { useThemeProvider } from '@shared/contexts/ThemeContext';

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
  const { currentTheme } = useThemeProvider();
  const [data, setData] = useState({
    openCases: 50,
    consultations: 120,
    sessions: 30,
    caseTrend: [73, 64, 73, 69, 104, 104, 164],
    caseStatus: [30, 20, 10],
    lawyerCases: [10, 15, 25],
  });

  const chartPalette = useMemo(
    () =>
      getChartPalette([
        '#3B82F6',
        '#22C55E',
        '#F97316',
        '#EF4444',
        '#A855F7',
      ]),
    [currentTheme],
  );

  const caseTrendData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
    datasets: [
      {
        label: 'عدد القضايا',
        data: data.caseTrend,
        borderColor: chartPalette[0],
        backgroundColor: chartPalette[0],
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
        backgroundColor: [chartPalette[1], chartPalette[2], chartPalette[3]],
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
        backgroundColor: chartPalette[1],
        borderColor: chartPalette[4],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card-legal p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="px-5 py-4 border-b border-border flex items-center">
        <h2 className="font-semibold text-md">🎯 القضايا المتداولة</h2>
      </header>

      <div className="text-4xl text-[var(--app-accent-strong)]">
        {data.openCases}
      </div>

      {}
      <div className="bg-card shadow-sm rounded-xl p-4 flex justify-center items-center">
        <h3 className="font-semibold text-xl text-foreground">
          عدد الاستشارات
        </h3>
        <div className="text-4xl text-[var(--app-success)]">
          {data.consultations}
        </div>
      </div>

      {}
      <div className="bg-card shadow-sm rounded-xl p-4 flex justify-center items-center">
        <h3 className="font-semibold text-xl text-foreground">
          عدد الجلسات
        </h3>
        <div className="text-4xl text-[var(--app-warning)]">
          {data.sessions}
        </div>
      </div>

      {}
      <div className="bg-card shadow-sm rounded-xl p-4">
        <h3 className="font-semibold text-xl text-foreground">
          عدد القضايا عبر الزمن
        </h3>
        <Line data={caseTrendData} />
      </div>
    </div>
  );
}

export default DashboardCard07;
