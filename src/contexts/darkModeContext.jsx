import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(
    function () {
      if (darkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    },
    [darkMode]
  );

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }

  return context;
}

export { DarkModeProvider, useDarkMode };
