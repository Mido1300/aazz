'use client';

import { useTheme } from '@/components/ui/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FontAwesomeIcon icon={faSun} className="h-5 w-5" />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="h-5 w-5" />
      )}
    </button>
  );
}
