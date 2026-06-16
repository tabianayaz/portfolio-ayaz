'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { motion } from 'motion/react';
import { Gamepad2, Code, Camera, Brain } from 'lucide-react';

export default function About() {
  const { language } = useApp();
  const t = dictionary[language].about;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-primary" />;
      case 'Code':
        return <Code className="w-5 h-5 text-secondary" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-purple-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-blue-400" />;
      default:
        return <Code className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-16 items-start md:items-center text-left md:text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-primary mb-2"
          >
            {t.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            {t.title}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-[3px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full"
          />
        </div>

        {/* Top Section: Split Profile & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-[380px] aspect-square rounded-[30px] p-2 bg-gradient-to-tr from-primary/30 to-secondary/30 backdrop-blur-md shadow-2xl border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Ayaz Tabian Islam"
                  fill
                  sizes="(max-w-768px) 100vw, 380px"
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              className="space-y-4 text-base md:text-lg leading-relaxed text-gray-text font-light select-text"
            >
              {t.bioParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={index === 0 ? 'text-2xl font-semibold text-foreground select-text' : 'select-text'}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="pt-8">
          <div className="flex flex-col space-y-6">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl font-bold tracking-tight text-foreground border-l-4 border-primary pl-3"
            >
              {t.hobbiesTitle}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {t.hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-panel p-5 flex items-center space-x-4 border border-card-border/60 hover:bg-white/[0.04]"
                >
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    {getIcon(hobby.icon)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{hobby.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
