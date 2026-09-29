import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      className={`relative flex items-center w-14 h-8 rounded-full border transition-colors duration-300 border-white/15 bg-white/5 light:border-black/10 light:bg-black/5 ${className}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center bg-green-500 text-black shadow-[0_0_10px_rgba(0,255,136,0.4)] transition-transform duration-300 ${isLight ? 'translate-x-6' : 'translate-x-0'}`}
      >
        {isLight ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
