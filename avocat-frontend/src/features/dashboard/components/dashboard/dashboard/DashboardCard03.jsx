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

const DashboardCard03 = () => {
  const palette = chartPalette();

  return (
    <ChartCard
      title="متوسط مدة إنهاء القضايا"
      subtitle="مؤشر زمني يساعد على قياس الكفاءة التشغيلية لكل نوع قضية."
      badge="أداء"
      tone="success"
    >
      <Bar
        data={{
          labels: ['جنائي', 'مدني', 'تجاري', 'عمالي', 'إداري'],
          datasets: [
            {
              label: 'متوسط المدة (بالأيام)',
              data: [180, 120, 90, 60, 45],
              backgroundColor: palette.slice(0, 5),
              borderRadius: 8,
            },
          ],
        }}
        options={baseChartOptions()}
      />
    </ChartCard>
  );
};

export default DashboardCard03;
