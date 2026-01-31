/**
 * Theme Context Module
 *
 * Provides dark/light mode functionality with localStorage persistence
 * and system preference detection.
 *
 * @module ThemeContext
 * @example
 * // Wrap your app with ThemeProvider
 * import { ThemeProvider } from './contexts/ThemeContext';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 *
 * @example
 * // Use the theme in components
 * import { useTheme } from './contexts/ThemeContext';
 *
 * function MyComponent() {
 *   const { isDarkMode, toggleTheme } = useTheme();
 *   return <button onClick={toggleTheme}>{isDarkMode ? 'Light' : 'Dark'}</button>;
 * }
 */
import { createContext, useContext, useState, useEffect } from 'react';

/**
 * @typedef {Object} ThemeContextValue
 * @property {boolean} isDarkMode - Whether dark mode is currently active
 * @property {() => void} toggleTheme - Function to toggle between light and dark mode
 */

/** @type {import('react').Context<ThemeContextValue | null>} */
const ThemeContext = createContext(null);

/**
 * Gets the initial theme preference from localStorage or system preference.
 *
 * @returns {boolean} True if dark mode should be active
 */
function getInitialTheme() {
  if (typeof window === 'undefined') return false;

  // Check localStorage for saved preference
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';

  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Theme Provider Component
 *
 * Wraps the application to provide theme context to all children.
 * Handles theme persistence in localStorage and applies the appropriate
 * CSS class to the document for Tailwind dark mode.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Update document class for Tailwind dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  /**
   * Toggle between light and dark mode
   */
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  /** @type {ThemeContextValue} */
  const value = { isDarkMode, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Custom hook to access theme context
 *
 * @throws {Error} If used outside of ThemeProvider
 * @returns {ThemeContextValue} Theme context value with isDarkMode and toggleTheme
 *
 * @example
 * const { isDarkMode, toggleTheme } = useTheme();
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
