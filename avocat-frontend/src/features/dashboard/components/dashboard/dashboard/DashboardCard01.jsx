import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartCard from '../ui/ChartCard';
import { baseChartOptions, chartPalette } from '../ui/chartConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DashboardCard01 = () => {
  const palette = chartPalette();
  const chartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'عدد القضايا المفتوحة',
        data: [20, 25, 22, 30, 45, 50, 48, 60, 55, 70, 65, 80],
        borderColor: palette[0],
        backgroundColor: `${palette[0]}22`,
        fill: true,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 4,
        pointBackgroundColor: palette[0],
        tension: 0.35,
      },
    ],
  };

  return (
    <ChartCard
      title="تطور عدد القضايا الشهرية"
      subtitle="متابعة النمو الشهري في القضايا المفتوحة لدعم التخطيط التشغيلي."
      badge="تحليلي"
      tone="info"
    >
      <Line data={chartData} options={baseChartOptions()} />
    </ChartCard>
  );
};

export default DashboardCard01;
