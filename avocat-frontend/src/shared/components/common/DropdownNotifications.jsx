import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';

export default function DropdownNotifications() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !trigger.current) return;
      if (!dropdown.current.contains(target) && !trigger.current.contains(target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  // إغلاق القائمة عند الضغط على زر "Escape"
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode === 27) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, []);

  return (
    <div className="relative inline-flex">
      {/* زر الإشعارات */}
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`relative w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300
          ${
            dropdownOpen
              ? 'bg-blue-600 text-white'
              : 'bg-avocat-orange-light dark:bg-avocat-indigo text-gray-700 dark:text-gray-300 hover:bg-avocat-orange dark:hover:bg-avocat-indigo-light hover:text-white'
          }`}
      >
        {dropdownOpen ? (
          <IoMdNotifications className="w-6 h-6 animate-bounce" />
        ) : (
          <IoMdNotificationsOutline className="w-6 h-6" />
        )}
        {/* نقطة التنبيه */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-400 border-2 border-white dark:border-gray-900 rounded-full animate-ping"></div>
      </button>

      {/* قائمة الإشعارات */}
      {dropdownOpen && (
        <div
          ref={dropdown}
          className="absolute top-14 left-1/2 sm:left-auto sm:right-0 transform -translate-x-1/2 sm:translate-x-0
                    w-[90vw] sm:w-64 md:w-72 lg:w-80 xl:w-96
                    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    py-2 rounded-2xl shadow-2xl mt-2 transition-all duration-300 ease-out 
                    origin-top-right scale-100 opacity-100"
        >
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase px-5 py-2">
            الإشعارات
          </div>
          <ul>
            {/* إشعار 1 */}
            <li className="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
              <Link
                className="flex items-start gap-3 py-3 px-5 hover:bg-blue-50 dark:hover:bg-gray-700/20 transition rounded-lg"
                to="#0"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white p-2 rounded-full">
                  📢
                </span>
                <div>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    تحديث جديد للسياسات
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    يرجى مراجعة السياسات المحدثة.
                  </p>
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mt-1">
                    منذ 3 ساعات
                  </span>
                </div>
              </Link>
            </li>

            {/* إشعار 2 */}
            <li className="border-b border-gray-200 dark:border-gray-700/60 last:border-0">
              <Link
                className="flex items-start gap-3 py-3 px-5 hover:bg-green-50 dark:hover:bg-gray-700/20 transition rounded-lg"
                to="#0"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="bg-green-100 dark:bg-green-600 text-green-600 dark:text-white p-2 rounded-full">
                  🚀
                </span>
                <div>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    إطلاق ميزة جديدة
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    استمتع بميزاتنا الجديدة الآن.
                  </p>
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mt-1">
                    منذ يومين
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
