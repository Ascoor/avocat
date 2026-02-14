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

const DashboardCard04 = () => {
  const palette = chartPalette();

  return (
    <ChartCard
      title="أداء المحامين في المكتب"
      subtitle="مقارنة بين عدد القضايا التي تمت معالجتها ونسبة النجاح."
      badge="كفاءة"
      tone="warning"
    >
      <Bar
        data={{
          labels: ['أحمد العتيبي', 'محمد القحطاني', 'سارة الأنصاري', 'نورة السبيعي', 'عبدالله الدوسري'],
          datasets: [
            {
              label: 'عدد القضايا',
              data: [50, 75, 40, 65, 55],
              backgroundColor: palette[0],
              borderRadius: 6,
            },
            {
              label: 'نسبة النجاح (%)',
              data: [85, 90, 75, 80, 70],
              backgroundColor: palette[2],
              borderRadius: 6,
            },
          ],
        }}
        options={{ ...baseChartOptions(), indexAxis: 'y' }}
      />
    </ChartCard>
  );
};

export default DashboardCard04;
