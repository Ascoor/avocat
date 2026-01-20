import React from 'react';
import { FaBalanceScale } from 'react-icons/fa';

const services = [
  {
    id: 1,
    serviceName: 'إعداد عقد شراكة',
    client: 'شركة النور التجارية',
    lawyer: 'أحمد العتيبي',
    status: 'completed',
    date: '20/02/2025',
  },
  {
    id: 2,
    serviceName: 'استشارة قانونية بشأن نزاع تجاري',
    client: 'المقاولون العرب',
    lawyer: 'منى الجبيري',
    status: 'in-progress',
    date: '22/02/2025',
  },
  {
    id: 3,
    serviceName: 'رفع دعوى قضائية',
    client: 'شركة الأمل الصناعية',
    lawyer: 'سعيد الدوسري',
    status: 'pending',
    date: '25/02/2025',
  },
  {
    id: 4,
    serviceName: 'توثيق مستندات قانونية',
    client: 'مؤسسة البركة العقارية',
    lawyer: 'هند القحطاني',
    status: 'completed',
    date: '28/02/2025',
  },
];

const getServiceStyle = (status) => {
  switch (status) {
    case 'completed':
      return { color: 'bg-green-500', icon: 'M10 20l5-5 5 5H10z' };
    case 'in-progress':
      return { color: 'bg-yellow-500', icon: 'M10 10h10v10H10V10z' };
    case 'pending':
      return {
        color: 'bg-red-500',
        icon: 'M12 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      };
    default:
      return {
        color: 'bg-gray-500',
        icon: 'M12 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      };
  }
};

const ServiceItem = ({ service, isDarkMode }) => {
  const { color, icon } = getServiceStyle(service.status);

  return (
    <li className="flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${color}`}
      >
        <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d={icon} />
        </svg>
      </div>
      <div
        className={`flex-1 flex flex-col ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
      >
        <p className="text-sm md:text-base font-semibold">
          {service.serviceName}
        </p>
        <p className="text-xs text-gray-500">العميل: {service.client}</p>
        <p className="text-xs text-gray-500">
          المحامي المسؤول: {service.lawyer}
        </p>
        <p
          className={`text-sm font-medium ${color === 'bg-green-500' ? 'text-green-600' : color === 'bg-yellow-500' ? 'text-yellow-600' : 'text-red-600'}`}
        >
          {service.status === 'completed'
            ? 'مكتملة'
            : service.status === 'in-progress'
              ? 'قيد التنفيذ'
              : 'معلقة'}
        </p>
      </div>
    </li>
  );
};

const DashboardCard14 = ({ isDarkMode = false }) => {
  return (
    <div className="bg-gray-100 dark:bg-gradient-night dark:text-white text-gray-800 shadow rounded-lg p-4">
      {}
      <header className="py-4 border-b border-gray-300 dark:border-gray-700 flex justify-center items-center space-x-2">
        <FaBalanceScale className="text-lg text-indigo-500 dark:text-indigo-300" />
        <h2 className="font-semibold text-lg">أهم خدمات الأسبوع</h2>
      </header>
      <div className="p-3">
        <ul className="space-y-3">
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              isDarkMode={isDarkMode}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCard14;
