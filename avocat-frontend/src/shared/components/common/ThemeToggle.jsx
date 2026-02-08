import { useThemeProvider } from '@shared/contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle({ size = 'md' }) {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <button
      onClick={() =>
        changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
      }
      className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/30 shadow-lg transition-all duration-300 
                 ${
                   currentTheme === 'light'
                     ? 'bg-white/80 text-[var(--app-accent-strong)] hover:bg-white'
                     : 'bg-white/10 text-[var(--app-accent)] hover:bg-white/20'
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
