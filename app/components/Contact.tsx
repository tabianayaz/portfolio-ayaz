'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, FileDown, Copy, Check, Send
} from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './BrandIcons';

export default function Contact() {
  const { language } = useApp();
  const t = dictionary[language].contact;
  const f = dictionary[language].footer;

  const personalEmail = 'tabian.ayaz@gmail.com';
  const universityEmail = 'c6p31591@bunkyo.ac.jp';
  const [copiedPersonal, setCopiedPersonal] = useState(false);
  const [copiedUniversity, setCopiedUniversity] = useState(false);

  const copyPersonal = () => {
    navigator.clipboard.writeText(personalEmail);
    setCopiedPersonal(true);
    setTimeout(() => setCopiedPersonal(false), 2000);
  };

  const copyUniversity = () => {
    navigator.clipboard.writeText(universityEmail);
    setCopiedUniversity(true);
    setTimeout(() => setCopiedUniversity(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="contact" className="relative pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col min-h-[70vh] justify-between">
        
        {/* Contact Content Wrapper */}
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col mb-16 items-center text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              {t.subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {t.title}
            </h2>
            <div className="h-[3px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full w-[80px]" />
          </div>

          {/* Glass Card Container */}
          <motion.div
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glow-card glass-panel p-8 md:p-12 border border-card-border/60 hover:bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
          >
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                {language === 'jp' ? '一緒に新しい挑戦を始めましょう。' : "Let's build something incredible together."}
              </h3>
              <p className="text-sm text-gray-text font-light leading-relaxed select-text">
                {t.intro}
              </p>

              {/* Email Copier List */}
              <div className="flex flex-col space-y-3 pt-2">
                {/* Personal Email */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs font-semibold text-gray-text w-24">
                    {language === 'jp' ? '個人用:' : 'Personal:'}
                  </span>
                  <div className="inline-flex items-center space-x-2 bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2 font-mono text-xs select-text max-w-fit">
                    <span className="text-gray-text select-text">{personalEmail}</span>
                    <button
                      onClick={copyPersonal}
                      className="p-1 rounded hover:bg-white/5 text-primary transition-all cursor-pointer"
                      title={t.copyEmail}
                    >
                      {copiedPersonal ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {copiedPersonal && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="text-[10px] text-green-400 font-bold tracking-wide"
                      >
                        {t.copied}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* University Email */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs font-semibold text-gray-text w-24">
                    {language === 'jp' ? '大学用:' : 'University:'}
                  </span>
                  <div className="inline-flex items-center space-x-2 bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2 font-mono text-xs select-text max-w-fit">
                    <span className="text-gray-text select-text">{universityEmail}</span>
                    <button
                      onClick={copyUniversity}
                      className="p-1 rounded hover:bg-white/5 text-primary transition-all cursor-pointer"
                      title={t.copyEmail}
                    >
                      {copiedUniversity ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {copiedUniversity && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="text-[10px] text-green-400 font-bold tracking-wide"
                      >
                        {t.copied}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Social Grid (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0 w-full md:w-auto">
              {/* GitHub */}
              <a
                href="https://github.com/tabianayaz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-6 py-3.5 text-xs font-semibold text-white bg-white/[0.03] border border-white/[0.08] hover:border-primary/50 hover:bg-white/[0.06] rounded-xl transition-all hover:scale-102 cursor-pointer"
              >
                <Github className="w-4 h-4 text-gray-text" />
                <span>{t.github}</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-6 py-3.5 text-xs font-semibold text-white bg-white/[0.03] border border-white/[0.08] hover:border-secondary/50 hover:bg-white/[0.06] rounded-xl transition-all hover:scale-102 cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-gray-text" />
                <span>{t.linkedin}</span>
              </a>

              {/* Send Email direct mailto */}
              <a
                href={`mailto:${personalEmail}`}
                className="animated-btn flex items-center justify-center space-x-2 px-6 py-3.5 text-xs font-semibold text-white bg-black/40 rounded-xl shadow-lg transition-all hover:scale-102 cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{t.email}</span>
              </a>

              {/* Resume download */}
              <a
                href="https://forms.gle/MsnTkj5ovFbfjGEi7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-6 py-3.5 text-xs font-semibold text-white bg-white/[0.03] border border-white/[0.08] hover:border-primary/50 hover:bg-white/[0.06] rounded-xl transition-all hover:scale-102 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-gray-text animate-pulse" />
                <span>{t.resume}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="border-t border-card-border/40 pt-8 mt-24 text-center space-y-2">
          <p className="text-xs font-bold text-gray-text/75 tracking-wider">
            {f.developedBy}
          </p>
          <p className="text-[10px] text-gray-text/40 tracking-widest font-mono">
            &copy; 2026 {f.rights}
          </p>
        </div>

      </div>
    </section>
  );
}
