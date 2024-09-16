"use client";

import { Moon, Sun } from 'lucide-react';
import { useEffect,useState } from 'react';

export const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('theme');
        setDarkMode(theme === 'dark');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }
    }, []);
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      if (darkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    };
  
    return (
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  };