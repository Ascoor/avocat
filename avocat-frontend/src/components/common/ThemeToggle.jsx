import { useThemeProvider } from '../../utils/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle({ size = 'md' }) {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <button
      onClick={() =>
        changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
      }
      className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 
                 ${
                   currentTheme === 'light'
                     ? 'bg-avocat-orange-light text-white hover:bg-avocat-orange'
                     : 'bg-gray-300 dark:bg-avocat-indigo text-yellow-400  hover:bg-avocat-orange  dark:hover:bg-avocat-indigo-light'
                 }`}
    >
      {currentTheme === 'light' ? (
        <FaSun className="w-6 h-6 transition-all duration-300" />
      ) : (
        <FaMoon className="w-6 h-6 transition-all duration-300" />
      )}
    </button>
  );
}
