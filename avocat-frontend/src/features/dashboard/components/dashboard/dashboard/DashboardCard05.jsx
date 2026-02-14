import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartCard from '../ui/ChartCard';
import { baseChartOptions, chartPalette } from '../ui/chartConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardCard05 = () => {
  const palette = chartPalette();

  return (
    <ChartCard
      title="عدد الجلسات القادمة"
      subtitle="مؤشر أسبوعي لتنظيم توزيع الجلسات والاستعداد التشغيلي."
      badge="الأسبوع"
      tone="info"
    >
      <Bar
        data={{
          labels: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
          datasets: [
            {
              label: 'عدد الجلسات',
              data: [3, 5, 2, 8, 6, 4, 7],
              backgroundColor: palette,
              borderRadius: 8,
            },
          ],
        }}
        options={baseChartOptions()}
      />
    </ChartCard>
  );
};

export default DashboardCard05;
