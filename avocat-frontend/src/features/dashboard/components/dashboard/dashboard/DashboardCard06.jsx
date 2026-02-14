import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartCard from '../ui/ChartCard';
import { baseChartOptions, chartPalette } from '../ui/chartConfig';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

const DashboardCard06 = () => {
  const palette = chartPalette();

  return (
    <ChartCard
      title="الدخل المتوقع من القضايا"
      subtitle="مقارنة مرئية بين الإيرادات المتوقعة والمحققة عبر العام."
      badge="مالي"
      tone="success"
    >
      <Bar
        data={{
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
          datasets: [
            {
              type: 'bar',
              label: 'الإيرادات المتوقعة',
              data: [20000, 25000, 22000, 27000, 30000, 31000, 33000, 35000, 34000, 38000, 39000, 41000],
              backgroundColor: `${palette[0]}aa`,
              borderRadius: 7,
            },
            {
              type: 'line',
              label: 'الإيرادات المحققة',
              data: [18000, 23000, 21000, 26000, 28000, 29000, 32000, 34000, 33000, 37000, 38000, 40000],
              borderColor: palette[2],
              backgroundColor: 'transparent',
              pointBackgroundColor: palette[2],
              pointRadius: 3,
              tension: 0.35,
            },
          ],
        }}
        options={baseChartOptions()}
      />
    </ChartCard>
  );
};

export default DashboardCard06;
