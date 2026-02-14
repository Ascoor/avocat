import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartCard from '../ui/ChartCard';
import { baseChartOptions, chartPalette } from '../ui/chartConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardCard02 = () => {
  const palette = chartPalette();
  const optionsBase = baseChartOptions();
  const chartData = {
    labels: ['جنائي', 'مدني', 'تجاري', 'عمالي', 'إداري'],
    datasets: [
      {
        label: 'نسبة توزيع القضايا',
        data: [45, 30, 15, 10, 25],
        backgroundColor: palette,
        borderColor: 'transparent',
      },
    ],
  };

  const options = {
    ...optionsBase,
    plugins: {
      ...optionsBase.plugins,
      legend: { ...optionsBase.plugins.legend, position: 'bottom' },
    },
    scales: undefined,
  };

  return (
    <ChartCard
      title="توزيع القضايا حسب النوع"
      subtitle="تحديد المجالات الأكثر نشاطًا لتحسين توزيع الموارد والجهود."
      badge="إحصائيات"
      tone="warning"
    >
      <Pie data={chartData} options={options} />
    </ChartCard>
  );
};

export default DashboardCard02;
