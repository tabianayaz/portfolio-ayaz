'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const t = dictionary[language].nav;
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.home, id: 'home' },
    { label: t.about, id: 'about' },
    { label: t.skills, id: 'skills' },
    { label: t.projects, id: 'projects' },
    { label: t.qualifications, id: 'qualifications' },
    { label: t.contact, id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-background/70 backdrop-blur-md border-b border-card-border'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            onClick={() => scrollToSection('home')}
          >
            {language === 'jp' ? 'アヤズ.T' : 'Ayaz.T'}
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer text-gray-text relative group"
              >
                {item.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center bg-card-bg border border-card-border rounded-full p-1"
            >
              <button
                onClick={() => setLanguage('jp')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  language === 'jp'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-text hover:text-foreground'
                }`}
              >
                JP
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-text hover:text-foreground'
                }`}
              >
                EN
              </button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-card-bg border border-card-border hover:border-primary text-foreground transition-all cursor-pointer"
              aria-label="Theme toggle"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-primary" />
              )}
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'jp' ? 'en' : 'jp')}
              className="p-2 rounded-full bg-card-bg border border-card-border hover:border-primary text-foreground transition-all cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-4 h-4 text-primary" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-card-bg border border-card-border hover:border-primary text-foreground transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-primary" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-card-bg border border-card-border text-foreground transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[68px] z-40 bg-background/95 backdrop-blur-lg border-b border-card-border md:hidden flex flex-col justify-start pt-10 px-6 space-y-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-lg font-medium py-3 border-b border-card-border/50 text-gray-text hover:text-primary transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-sm text-gray-text">Language / 言語</span>
              <div className="flex items-center bg-card-bg border border-card-border rounded-full p-1">
                <button
                  onClick={() => setLanguage('jp')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    language === 'jp' ? 'bg-primary text-white' : 'text-gray-text'
                  }`}
                >
                  日本語
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    language === 'en' ? 'bg-primary text-white' : 'text-gray-text'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
