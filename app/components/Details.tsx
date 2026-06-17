'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { motion } from 'motion/react';
import { 
  Award, GraduationCap, Star, Target, GitCommit, 
  FolderGit2, Flame, RefreshCw, Layers, Sparkles
} from 'lucide-react';

// Custom high-performance Animated Counter
function AnimatedCounter({ value, suffix = '', duration = 1500 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={containerRef} className="font-mono">{count.toLocaleString()}{suffix}</span>;
}

export default function Details() {
  const { language } = useApp();
  const certsTrans = dictionary[language].qualifications;
  const eduTrans = dictionary[language].education;
  const prTrans = dictionary[language].selfPR;
  const careerTrans = dictionary[language].career;
  const ghTrans = dictionary[language].github;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const certifications = [
    { name: language === 'jp' ? '日本語能力試験 N2' : 'Japanese Language Proficiency Test (JLPT) N2' },
    { name: language === 'jp' ? '情報処理技術者能力認定試験 3級' : 'Information Processing Engineer Certification - Grade 3' },
    { name: language === 'jp' ? 'Webクリエイター能力認定試験 / HTML5 スタンダード' : 'Web Creator Certification / HTML5 Standard' },
    { name: language === 'jp' ? 'Duolingo English Test (100点)' : 'Duolingo English Test (Score: 100)' },
  ];

  return (
    <div className="relative py-12 px-6 overflow-hidden space-y-32">
      {/* 1. Certifications Section */}
      <section id="qualifications" className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16 items-start md:items-center text-left md:text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            {certsTrans.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {certsTrans.title}
          </h2>
          <div className="h-[3px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full w-[80px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glow-card glass-panel p-6 border border-card-border/60 hover:-translate-y-1 hover:bg-white/[0.03] cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground leading-snug">{cert.name}</h3>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary/80 uppercase font-mono tracking-widest bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
                PASS
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Education Section */}
      <section id="education" className="max-w-4xl mx-auto">
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
            {eduTrans.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {eduTrans.title}
          </h2>
          <div className="h-[3px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full w-[80px]" />
        </div>

        <div className="flex flex-col space-y-6">
          {eduTrans.items && eduTrans.items.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 border border-card-border/60 hover:bg-white/[0.02] flex flex-col md:flex-row items-center md:items-start justify-between gap-6"
            >
              <div className="flex items-center space-x-6 text-left">
                <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{item.school}</h3>
                  <p className="text-md text-gray-text font-light">{item.degree}</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end text-center md:text-right shrink-0">
                <span className="text-sm text-secondary font-bold font-mono tracking-wider">{item.period}</span>
                <span className="mt-2 px-3 py-1 rounded-full text-xs font-bold bg-secondary/15 text-secondary border border-secondary/25 uppercase tracking-widest">
                  {item.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Self PR & Career Goals */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Self PR */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 border border-card-border/60 hover:bg-white/[0.02] flex flex-col justify-between"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Star className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold uppercase tracking-widest text-yellow-400 font-mono">{prTrans.subtitle}</h3>
          </div>
          <div className="space-y-4 text-base font-light leading-relaxed text-gray-text select-text">
            <h4 className="text-xl font-bold text-foreground mb-2 select-text">{prTrans.title}</h4>
            {prTrans.prText.map((paragraph, index) => (
              <p key={index} className="select-text">{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Career Goals */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 border border-card-border/60 hover:bg-white/[0.02] flex flex-col justify-between"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold uppercase tracking-widest text-primary font-mono">{careerTrans.subtitle}</h3>
          </div>
          <div className="space-y-4 text-base font-light leading-relaxed text-gray-text select-text">
            <h4 className="text-xl font-bold text-foreground mb-2 select-text">{careerTrans.title}</h4>
            {careerTrans.goalsText.map((paragraph, index) => (
              <p key={index} className="select-text">{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
