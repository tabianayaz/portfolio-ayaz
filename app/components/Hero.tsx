'use client';

import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon as Github } from './BrandIcons';

export default function Hero() {
  const { language } = useApp();
  const t = dictionary[language].hero;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const nameText = t.name;
  const sentenceText = t.statement;

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
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
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 text-center overflow-hidden py-20 select-none"
    >
      <motion.div
        className="fixed w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 blur-[80px] pointer-events-none -z-10"
        style={{
          left: glowX,
          top: glowY,
        }}
      />

      <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-card-bg border border-card-border backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-gray-text tracking-wide uppercase">
            {t.hello}
          </span>
        </motion.div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 select-text"
        >
          {nameText.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ marginRight: char === ' ' ? '1rem' : '0' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-xl text-primary font-medium tracking-wide mb-2"
        >
          {t.university} <span className="text-foreground/40 font-light mx-2">|</span> {t.faculty} {t.department}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8"
        >
          {t.roles.map((role, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1 text-xs md:text-sm font-semibold rounded-md bg-white/[0.03] border border-white/[0.06] text-gray-text"
            >
              {role}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="text-lg md:text-2xl text-gray-text font-light max-w-2xl leading-relaxed mb-12 select-text"
        >
          {sentenceText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={scrollToProjects}
            className="animated-btn w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-black/40 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
          >
            {t.viewProjects}
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://github.com/tabianayaz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Github className="w-4 h-4 text-gray-text" />
            {t.viewGithub}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          const about = document.getElementById('about');
          if (about) {
            about.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-text">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full p-1 flex justify-center">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
