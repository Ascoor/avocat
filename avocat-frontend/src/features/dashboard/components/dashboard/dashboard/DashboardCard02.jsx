import React, { useState, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getChartPalette, getChartTextColor } from '@shared/utils/themeColors';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardCard02({ isDarkMode }) {
  const [caseData, setCaseData] = useState({
    labels: ['جنائي', 'مدني', 'تجاري', 'عمالي', 'إداري'],
    counts: [45, 30, 15, 10, 25],
  });

  const chartPalette = useMemo(
    () =>
      getChartPalette([
        '#EF4444',
        '#3B82F6',
        '#F59E0B',
        '#10B981',
        '#8B5CF6',
      ]),
    [isDarkMode],
  );

  const chartData = {
    labels: caseData.labels,
    datasets: [
      {
        label: 'نسبة توزيع القضايا',
        data: caseData.counts,
        backgroundColor: chartPalette,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: getChartTextColor(isDarkMode ? '#DDD' : '#333'),
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-card p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="dashboard-card-header px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-md">⚖️ توزيع القضايا حسب النوع</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--app-info-soft)] text-[var(--app-accent-strong)]">
          إحصائيات
        </span>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-[var(--app-muted)]">
          يوضح هذا المخطط نسبة توزيع القضايا حسب التخصصات القانونية، مما يساعد
          في اتخاذ قرارات متعلقة بالتوظيف واستراتيجيات التسويق.
        </p>
      </div>

      {}
      <div className="w-full h-64 sm:h-80 md:h-96 mt-4">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DashboardCard02;
