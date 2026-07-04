'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../locales/dictionary';

type Theme = 'dark' | 'light';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  isIntroActive: boolean;
  setIsIntroActive: (active: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('jp');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isIntroActive, setIsIntroActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('portfolio-visited');
    }
    return true;
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio-lang') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }

    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('portfolio-lang', lang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        language, 
        setLanguage: changeLanguage, 
        theme, 
        toggleTheme, 
        isIntroActive, 
        setIsIntroActive 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
