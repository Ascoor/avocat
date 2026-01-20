import React, { useState } from 'react';
import {
  FaGavel,
  FaBalanceScale,
  FaClock,
  FaCalendarCheck,
  FaHistory,
  FaCalendarDay,
} from 'react-icons/fa';

const tabs = [
  { id: 'activities', title: 'الإجراءات القانونية الأخيرة' },
  { id: 'sessions', title: '📅 أهم جلسات الأسبوع' },
  { id: 'services', title: 'أهم خدمات الأسبوع' },
];

const activities = [
  {
    icon: <FaGavel />,
    color: 'bg-indigo-500',
    user: 'أحمد',
    action: 'تم تعديل المحكمة',
    target: 'القضايا',
    time: 'منذ 5 ساعات',
  },
  {
    icon: <FaBalanceScale />,
    color: 'bg-green-500',
    user: 'سارة',
    action: 'تم إضافة جلسة جديدة',
    target: 'القضية رقم #1234',
    time: 'منذ ساعتين',
  },
  {
    icon: <FaClock />,
    color: 'bg-red-500',
    user: 'خالد',
    action: 'تم إغلاق القضية',
    target: 'القضية رقم #9876',
    time: 'اليوم',
  },
];

const sessions = [
  {
    id: 1,
    lawyer: 'محمد فاروق',
    date: '22/02/2025',
    result: 'تم حضور الجلسة وحجزها',
    status: 'completed',
    icon: <FaCalendarCheck />,
  },
  {
    id: 2,
    lawyer: 'نهى الشريف',
    date: '25/02/2025',
    result: 'تم تأجيل الجلسة',
    status: 'delayed',
    icon: <FaHistory />,
  },
  {
    id: 3,
    lawyer: 'كريم حسن',
    date: '28/02/2025',
    result: 'الجلسة القادمة في موعدها',
    status: 'upcoming',
    icon: <FaCalendarDay />,
  },
];

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
const DashboardMultCards = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('activities');

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800  ">
      <div className="flex justify-center mb-6 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {activeTab === 'activities' && (
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            الإجراءات القانونية الأخيرة
          </h2>
          <ul className="space-y-3">
            {activities.map((activity, index) => (
              <li
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${activity.color}`}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 text-gray-800 dark:text-gray-100">
                  <p className="text-sm md:text-base font-semibold">
                    {activity.user} {activity.action}{' '}
                    <span className="text-violet-500 font-semibold">
                      {activity.target}
                    </span>
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📅 أهم جلسات الأسبوع
          </h2>
          <ul className="space-y-3">
            {sessions.map((session) => (
              <li
                key={session.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${session.status === 'completed' ? 'bg-green-500' : session.status === 'delayed' ? 'bg-yellow-500' : 'bg-blue-500'}`}
                >
                  {session.icon}
                </div>
                <div className="flex-1 text-gray-800 dark:text-gray-100">
                  <p className="text-sm md:text-base font-semibold">
                    {session.lawyer}
                  </p>
                  <p className="text-xs text-gray-500">{session.date}</p>
                  <p
                    className={`text-sm font-medium ${session.status === 'completed' ? 'text-green-600' : session.status === 'delayed' ? 'text-yellow-600' : 'text-blue-600'}`}
                  >
                    {session.result}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📋 خدمات الأسبوع
          </h2>
          <ul className="space-y-3">
            {services.map((service) => (
              <li
                key={service.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${getServiceStyle(service.status).color}`}
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                  ></svg>
                  <path d={getServiceStyle(service.status).icon} />
                </div>
                <div className="flex-1 text-gray-800 dark:text-gray-100">
                  <p className="text-sm md:text-base font-semibold">
                    {service.serviceName}
                  </p>
                  <p className="text-xs text-gray-500">
                    العميل: {service.client}
                  </p>
                  <p className="text-xs text-gray-500">
                    المحامي المسؤول: {service.lawyer}
                  </p>
                  <p
                    className={`text-sm font-medium ${getServiceStyle(service.status).color}`}
                  >
                    {service.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardMultCards;
