import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '@shared/utils/Transition';
import useAuth from '@features/auth/components/AuthUser';

function UserMenu({ align = 'left' }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const [userImage, setUserImage] = useState('/default-profile.png');
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    if (user?.image) {
      setUserImage(user.image);
    }
  }, [user]);

  const handleImageError = () => {
    setUserImage('/default-profile.png');
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdown.current ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex items-center space-x-2 group focus:outline-none"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {}

        {}
        <span className="hidden md:inline text-blue-100 ml-4 font-['tharwat'] dark:text-orange-200 font-bold text-center">
          {user?.name}
        </span>

        <img
          src={userImage}
          onError={handleImageError}
          alt="صورة المستخدم"
          className="w-8 h-8 rounded-full object-cover"
        />
        <svg
          className="w-3 h-3 shrink-0 mr-1 fill-current text-white dark:text-gray-500"
          viewBox="0 0 12 12"
        >
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </button>

      {}
      <Transition
        className={`origin-top-right top-11 z-10 absolute  min-w-44 bg-white dark:bg-gradient-night border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <ul className="text-right">
            <li>
              <Link
                to="/settings"
                className="font-medium text-sm text-avocat-blue-dark dark:text-avocat-orange-light hover:text-violet-400 dark:hover:text-violet-400 flex items-center py-2 px-4"
                onClick={() => setDropdownOpen(false)}
              >
                الإعدادات
              </Link>
            </li>
            <li>
              <button
                className="font-medium text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center py-2 px-4 w-full text-right"
                onClick={logout}
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
