'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, RotateCcw, Smartphone, Bell, CheckCircle2, 
  Search, Cpu, Sparkles, TrendingUp, Calendar
} from 'lucide-react';

export default function Projects() {
  const { language } = useApp();
  const t = dictionary[language].projects;
  const items = t.items;

  // 1. Touchaku Wake Screenshots State
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const touchakuScreenshots = [
    { src: '/touchaku_home.png', jpName: 'ホーム画面', enName: 'Home Screen' },
    { src: '/touchaku_route.png', jpName: 'ルート設定', enName: 'Route Setup' },
    { src: '/touchaku_track.png', jpName: '位置追跡画面', enName: 'Tracking Screen' },
    { src: '/touchaku_setting.png', jpName: '設定画面', enName: 'Settings Screen' },
    { src: '/touchaku_app.png', jpName: '起動ロゴ画面', enName: 'Startup Logo' }
  ];

  // 2. AI Mikan Classifier State
  const [mikanType, setMikanType] = useState<'fresh' | 'rotten'>('fresh');
  const [isScanning, setIsScanning] = useState(false);
  const [confidence, setConfidence] = useState(98.4);

  const scanMikan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const nextType = mikanType === 'fresh' ? 'rotten' : 'fresh';
      setMikanType(nextType);
      setConfidence(nextType === 'fresh' ? 98.4 : 94.2);
    }, 1200);
  };

  // 3. Subsc Manager Dashboard State
  const [subscTotal, setSubscTotal] = useState(8450);
  const [activeSubscs, setActiveSubscs] = useState([
    { name: 'Azure Cloud', cost: 5980, active: true },
    { name: 'Netflix Premium', cost: 1490, active: true },
    { name: 'Spotify Duo', cost: 980, active: true }
  ]);

  const toggleSubsc = (index: number) => {
    const updated = [...activeSubscs];
    updated[index].active = !updated[index].active;
    setActiveSubscs(updated);

    const sum = updated.reduce((acc, curr) => curr.active ? acc + curr.cost : acc, 0);
    setSubscTotal(sum);
  };

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-20 items-start md:items-center text-left md:text-center">
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

        {/* Large Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Card 1: Dragon Blaze RPG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 border border-card-border/60 flex flex-col justify-between"
          >
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                {items.dragonBlaze.category}
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1 mb-3">
                {items.dragonBlaze.title}
              </h3>
              <p className="text-sm text-gray-text font-light leading-relaxed select-text">
                {items.dragonBlaze.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {items.dragonBlaze.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 text-[11px] rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Unity RPG Video Trailer */}
            <div className="w-full aspect-video rounded-xl border border-white/10 overflow-hidden relative bg-black/50">
              <video
                src="/trailor.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Card 2: Touchaku Wake Mobile App */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel p-8 border border-card-border/60 flex flex-col justify-between"
          >
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                {items.touchakuWake.category}
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1 mb-3">
                {items.touchakuWake.title}
              </h3>
              <p className="text-sm text-gray-text font-light leading-relaxed select-text">
                {items.touchakuWake.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {items.touchakuWake.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 text-[11px] rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Android App Screenshots Gallery */}
            <div className="w-full bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col md:flex-row gap-6 items-center min-h-[240px]">
              {/* Screen Bezel mockup */}
              <div className="relative aspect-[9/19] w-[110px] rounded-2xl overflow-hidden border-2 border-white/10 bg-black shadow-lg shrink-0">
                <Image
                  src={touchakuScreenshots[activeScreenIdx].src}
                  alt={touchakuScreenshots[activeScreenIdx].jpName}
                  fill
                  sizes="110px"
                  className="object-cover"
                />
              </div>
              
              {/* Navigation options */}
              <div className="flex-1 flex flex-col space-y-1.5 w-full font-mono text-[11px]">
                <span className="text-[10px] font-bold text-sky-400 font-mono tracking-wider mb-1">SCREENSHOTS</span>
                {touchakuScreenshots.map((screen, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveScreenIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs text-left transition-all cursor-pointer ${
                      activeScreenIdx === idx
                        ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 font-semibold border'
                        : 'bg-white/[0.01] border-transparent text-gray-text hover:text-white border'
                    }`}
                  >
                    {language === 'jp' ? screen.jpName : screen.enName}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: AI Mandarin Classifier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 border border-card-border/60 flex flex-col justify-between"
          >
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                {items.mikanAI.category}
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1 mb-3">
                {items.mikanAI.title}
              </h3>
              <p className="text-sm text-gray-text font-light leading-relaxed select-text">
                {items.mikanAI.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {items.mikanAI.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 text-[11px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Image Scan Widget */}
            <div className="w-full bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col justify-between min-h-[220px]">
              <div className="relative aspect-video w-full rounded-lg bg-black/80 overflow-hidden flex items-center justify-center border border-white/5">
                {isScanning && (
                  <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-0.5 bg-emerald-400/80 shadow-[0_0_10px_#10b981] z-10"
                  />
                )}

                <div className={`w-24 h-24 rounded-full bg-gradient-to-br transition-all duration-500 relative flex items-center justify-center shadow-lg ${
                  mikanType === 'fresh' 
                    ? 'from-amber-400 to-orange-500' 
                    : 'from-amber-900 to-emerald-950 border border-emerald-800'
                }`}>
                  <div className={`w-3 h-1.5 rounded-full absolute top-1 bg-green-600 transition-colors ${
                    mikanType === 'fresh' ? 'bg-green-600' : 'bg-emerald-800'
                  }`} />
                  <span className="text-xs font-bold text-white/80 uppercase tracking-widest font-mono">
                    {mikanType === 'fresh' ? 'Mikan' : 'Spoiled'}
                  </span>
                </div>

                {!isScanning && (
                  <div className={`absolute top-4 left-4 p-2 rounded bg-black/80 backdrop-blur-sm border text-[11px] font-mono flex items-center space-x-1.5 ${
                    mikanType === 'fresh' ? 'border-emerald-500 text-emerald-400' : 'border-red-500 text-red-400'
                  }`}>
                    <Cpu className="w-3.5 h-3.5" />
                    <span>
                      {mikanType === 'fresh' 
                        ? (language === 'jp' ? `新鮮 [${confidence}%]` : `Fresh [${confidence}%]`)
                        : (language === 'jp' ? `腐敗 [${confidence}%]` : `Spoiled [${confidence}%]`)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-text font-bold uppercase">{t.confidenceText}</span>
                  <span className="text-lg font-bold text-white font-mono">{confidence}%</span>
                </div>

                <button
                  onClick={scanMikan}
                  disabled={isScanning}
                  className="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-pointer disabled:opacity-50 transition-all text-xs font-semibold flex items-center space-x-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isScanning ? (language === 'jp' ? 'スキャン中...' : 'Scanning...') : (language === 'jp' ? '別の果物をスキャン' : 'Scan Alternate')}</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Subsc Manager Web App */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel p-8 border border-card-border/60 flex flex-col justify-between"
          >
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                {items.subsc.category}
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1 mb-3">
                {items.subsc.title}
              </h3>
              <p className="text-sm text-gray-text font-light leading-relaxed select-text">
                {items.subsc.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {items.subsc.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 text-[11px] rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Billing Manager Dashboard */}
            <div className="w-full bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col justify-between min-h-[220px]">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                <div className="flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[10px] font-bold text-gray-text uppercase">{t.demoDashboard}</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  {language === 'jp' ? `月額: ¥${subscTotal.toLocaleString()}` : `Total: ¥${subscTotal.toLocaleString()}/mo`}
                </span>
              </div>

              <div className="flex-1 flex flex-col space-y-2 mb-3">
                {activeSubscs.map((sub, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleSubsc(idx)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      sub.active 
                        ? 'bg-purple-500/5 border-purple-500/20 text-white' 
                        : 'bg-white/[0.01] border-white/5 text-gray-text/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className={`w-4 h-4 ${sub.active ? 'text-purple-400' : 'text-gray-600'}`} />
                      <span className="text-xs font-semibold">{sub.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold">¥{sub.cost.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 font-light flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>
                  {language === 'jp'
                    ? '次回の引き落とし予定日: 2026年7月1日'
                    : 'Next billing scheduled on July 1, 2026'}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
