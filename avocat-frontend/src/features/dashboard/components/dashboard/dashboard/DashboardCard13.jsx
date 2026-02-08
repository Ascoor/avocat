import React from 'react';
import {
  FaCalendarCheck,
  FaBalanceScale,
  FaHistory,
  FaCalendarDay,
} from 'react-icons/fa';

const sessions = [
  {
    id: 1,
    sessionLawyer: 'محمد فاروق',
    sessionDate: '22/02/2025',
    sessionResult: 'تم حضور الجلسة وحجزها',
    status: 'completed',
    icon: <FaCalendarCheck />,
  },
  {
    id: 2,
    sessionLawyer: 'نهى الشريف',
    sessionDate: '25/02/2025',
    sessionResult: 'تم تأجيل الجلسة',
    status: 'delayed',
    icon: <FaHistory />,
  },
  {
    id: 3,
    sessionLawyer: 'كريم حسن',
    sessionDate: '28/02/2025',
    sessionResult: 'الجلسة القادمة في موعدها',
    status: 'upcoming',
    icon: <FaCalendarDay />,
  },
];

const SessionItem = ({ session, isDarkMode }) => {
  return (
    <li className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full text-white bg-${session.status === 'completed' ? 'green-500' : session.status === 'delayed' ? 'yellow-500' : 'blue-500'}`}
      >
        {session.icon}
      </div>
      <div
        className={`flex-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
      >
        <p className="text-sm md:text-base font-semibold">
          {session.sessionLawyer}
        </p>
        <p className="text-xs text-gray-500">{session.sessionDate}</p>
        <p
          className={`text-sm font-medium ${session.status === 'completed' ? 'text-green-600' : session.status === 'delayed' ? 'text-yellow-600' : 'text-blue-600'}`}
        >
          {session.sessionResult}
        </p>
      </div>
    </li>
  );
};

const DashboardCard13 = ({ isDarkMode = false }) => {
  return (
    <div className="bg-gray-100 dark:bg-gradient-night dark:text-white text-gray-800 shadow rounded-lg p-4">
      {}
      <header className="py-4 border-b border-gray-300 dark:border-gray-700 flex justify-center items-center space-x-2">
        <FaBalanceScale className="text-lg text-indigo-500 dark:text-indigo-300" />
        <h2 className="font-semibold text-lg">📅 أهم جلسات الأسبوع</h2>
      </header>
      <div className="p-3">
        <ul className="space-y-3">
          {sessions.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              isDarkMode={isDarkMode}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCard13;
