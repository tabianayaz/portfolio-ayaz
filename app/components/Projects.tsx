'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { motion } from 'motion/react';
import {
  Play, Smartphone, Bell, CheckCircle2,
  Search, Cpu, Sparkles, TrendingUp, Calendar,
  ZoomIn, Maximize2, Globe
} from 'lucide-react';
import TiltCard from './TiltCard';
import ImageLightbox, { LightboxImage } from './ImageLightbox';

export default function Projects() {
  const { language } = useApp();
  const t = dictionary[language].projects;
  const items = t.items;

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: LightboxImage[], startIndex: number = 0) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  // 1. Touchaku Wake Screenshots State (JP & EN versions)
  const [touchakuVersion, setTouchakuVersion] = useState<'jp' | 'en'>('jp');
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);

  const touchakuJpScreenshots: LightboxImage[] = [
    { src: '/JAVAR_touchaku_home.png', jpName: 'ホーム画面 (日本語版)', enName: 'Home Screen (JP UI)', projectTitle: 'Touchaku Wake', version: 'JP' },
    { src: '/JAVAR_touchaku_train route.png', jpName: '電車ルート設定 (日本語版)', enName: 'Train Route Setup (JP UI)', projectTitle: 'Touchaku Wake', version: 'JP' },
    { src: '/JAVAR_touchaku_live tracking.png', jpName: 'リアルタイム位置追跡 (日本語版)', enName: 'Live Tracking (JP UI)', projectTitle: 'Touchaku Wake', version: 'JP' },
    { src: '/JAVAR_touchaku_saved location.png', jpName: '保存済み場所 (日本語版)', enName: 'Saved Locations (JP UI)', projectTitle: 'Touchaku Wake', version: 'JP' },
    { src: '/JAVAR_touchaku icon.png', jpName: 'アプリ統合アイコン (日本語版)', enName: 'App Startup Icon (JP UI)', projectTitle: 'Touchaku Wake', version: 'JP' }
  ];

  const touchakuEnScreenshots: LightboxImage[] = [
    { src: '/touchaku_home.png', jpName: 'ホーム画面 (英語版)', enName: 'Home Screen (Global UI)', projectTitle: 'Touchaku Wake', version: 'EN' },
    { src: '/touchaku_route.png', jpName: 'ルート設定 (英語版)', enName: 'Route Setup (Global UI)', projectTitle: 'Touchaku Wake', version: 'EN' },
    { src: '/touchaku_track.png', jpName: '位置追跡画面 (英語版)', enName: 'Tracking Screen (Global UI)', projectTitle: 'Touchaku Wake', version: 'EN' },
    { src: '/touchaku_setting.png', jpName: '設定画面 (英語版)', enName: 'Settings Screen (Global UI)', projectTitle: 'Touchaku Wake', version: 'EN' },
    { src: '/touchaku_app.png', jpName: '起動ロゴ画面 (英語版)', enName: 'Startup Logo (Global UI)', projectTitle: 'Touchaku Wake', version: 'EN' }
  ];

  const currentTouchakuScreenshots = touchakuVersion === 'jp' ? touchakuJpScreenshots : touchakuEnScreenshots;
  const allTouchakuScreenshots = [...touchakuJpScreenshots, ...touchakuEnScreenshots];

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

  // 3. Azure AI Chat State
  const [activeAzureScreenIdx, setActiveAzureScreenIdx] = useState(0);
  const azureScreenshots: LightboxImage[] = [
    { src: '/azure login ss.png', jpName: 'ログイン画面', enName: 'Login Screen', projectTitle: 'Azure AI Chat' },
    { src: '/azure create account ss.png', jpName: 'アカウント作成画面', enName: 'Registration Screen', projectTitle: 'Azure AI Chat' },
    { src: '/azure ai chat ss.png', jpName: 'AI対話画面', enName: 'AI Conversation', projectTitle: 'Azure AI Chat' },
    { src: '/azure user chat ss.png', jpName: 'チャット履歴画面', enName: 'Chat History', projectTitle: 'Azure AI Chat' },
    { src: '/azure setting ss.png', jpName: 'パラメータ設定画面', enName: 'Model Settings', projectTitle: 'Azure AI Chat' }
  ];

  // 4. FitAI Trainer State
  const [activeFitAiScreenIdx, setActiveFitAiScreenIdx] = useState(0);
  const fitAiScreenshots: LightboxImage[] = [
    { src: '/login ui fitAi.png', jpName: 'ログイン画面', enName: 'Login Screen', projectTitle: 'FitAI Trainer' },
    { src: '/dashboaedfitAi.png', jpName: 'ダッシュボード統計', enName: 'Dashboard Stats', projectTitle: 'FitAI Trainer' },
    { src: '/exercisefitAI.png', jpName: 'ポーズ姿勢解析 (骨格推定)', enName: 'AI Posture Tracker (Skeleton)', projectTitle: 'FitAI Trainer' },
    { src: '/historyfitAI.png', jpName: 'トレーニング履歴', enName: 'Workout History', projectTitle: 'FitAI Trainer' },
    { src: '/profilefitAi.png', jpName: 'ユーザープロファイル', enName: 'Profile Settings', projectTitle: 'FitAI Trainer' },
    { src: '/settingfitAi.png', jpName: '詳細システム設定 P1', enName: 'System Configurations P1', projectTitle: 'FitAI Trainer' },
    { src: '/settingp2fitAi.png', jpName: '詳細システム設定 P2', enName: 'System Configurations P2', projectTitle: 'FitAI Trainer' }
  ];

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
          <TiltCard
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
          </TiltCard>

          {/* Card 2: Touchaku Wake Mobile App */}
          <TiltCard
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
            <div className="w-full bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col md:flex-row gap-6 items-center min-h-[260px]">
              {/* Screen Bezel mockup (Clickable for Lightbox) */}
              <div
                onClick={() =>
                  openLightbox(
                    allTouchakuScreenshots,
                    (touchakuVersion === 'jp' ? 0 : 5) + activeScreenIdx
                  )
                }
                className="relative aspect-[9/19] w-[115px] rounded-2xl overflow-hidden border-2 border-white/10 bg-black shadow-lg shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-105"
                title={language === 'jp' ? 'クリックして拡大表示' : 'Click to enlarge'}
              >
                <Image
                  src={currentTouchakuScreenshots[activeScreenIdx].src}
                  alt={currentTouchakuScreenshots[activeScreenIdx].jpName}
                  fill
                  sizes="115px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-1 backdrop-blur-[2px]">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow" />
                  <span className="text-[9px] font-bold text-white tracking-wider font-mono">拡大表示</span>
                </div>
              </div>
              
              {/* Controls & Navigation options */}
              <div className="flex-1 flex flex-col space-y-3 w-full font-mono text-[11px]">
                {/* Version Switcher */}
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <span className="text-[10px] font-bold text-sky-400 font-mono tracking-wider">UI VERSION</span>
                  <div className="inline-flex p-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px]">
                    <button
                      onClick={() => {
                        setTouchakuVersion('jp');
                        setActiveScreenIdx(0);
                      }}
                      className={`px-2 py-0.5 rounded-md transition-all font-semibold cursor-pointer ${
                        touchakuVersion === 'jp'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🇯🇵 日本語版 (JP)
                    </button>
                    <button
                      onClick={() => {
                        setTouchakuVersion('en');
                        setActiveScreenIdx(0);
                      }}
                      className={`px-2 py-0.5 rounded-md transition-all font-semibold cursor-pointer ${
                        touchakuVersion === 'en'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🌐 Global (EN)
                    </button>
                  </div>
                </div>

                {/* Screenshot buttons */}
                <div className="flex flex-col space-y-1.5">
                  {currentTouchakuScreenshots.map((screen, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveScreenIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                        activeScreenIdx === idx
                          ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 font-semibold border'
                          : 'bg-white/[0.01] border-transparent text-gray-text hover:text-white border'
                      }`}
                    >
                      <span className="truncate">{language === 'jp' ? screen.jpName : screen.enName}</span>
                      {activeScreenIdx === idx && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(
                              allTouchakuScreenshots,
                              (touchakuVersion === 'jp' ? 0 : 5) + idx
                            );
                          }}
                          className="text-[10px] text-sky-400 hover:underline flex items-center space-x-1 shrink-0 ml-2"
                        >
                          <ZoomIn className="w-3 h-3" />
                          <span>拡大</span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Open Full Lightbox Button */}
                <button
                  onClick={() =>
                    openLightbox(
                      allTouchakuScreenshots,
                      (touchakuVersion === 'jp' ? 0 : 5) + activeScreenIdx
                    )
                  }
                  className="mt-1 w-full py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition-all text-xs font-semibold flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{language === 'jp' ? '全画面ギャラリーを開く (10枚)' : 'Open Fullscreen Gallery (10 Screens)'}</span>
                </button>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: AI Mandarin Classifier */}
          <TiltCard
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
          </TiltCard>

          {/* Card 4: Azure AI Chat Web App */}
          <TiltCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel p-8 border border-card-border/60 flex flex-col justify-between"
          >
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                {items.azureChat.category}
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1 mb-3">
                {items.azureChat.title}
              </h3>
              <p className="text-sm text-gray-text font-light leading-relaxed select-text">
                {items.azureChat.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {items.azureChat.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 text-[11px] rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Browser Screenshots Gallery */}
            <div className="w-full bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col gap-4 min-h-[300px]">
              {/* Browser Bezel mockup (Clickable for Lightbox) */}
              <div
                onClick={() => openLightbox(azureScreenshots, activeAzureScreenIdx)}
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-black shadow-lg cursor-pointer group"
                title={language === 'jp' ? 'クリックして拡大表示' : 'Click to enlarge'}
              >
                {/* Window header */}
                <div className="h-6 bg-white/[0.04] border-b border-white/[0.06] px-3 flex items-center space-x-1.5 shrink-0 select-none z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  <div className="flex-1 bg-white/[0.02] h-3.5 rounded text-[8px] text-white/30 flex items-center justify-center font-mono select-none">
                    azure-chat.ai
                  </div>
                </div>
                <div className="relative w-full h-[calc(100%-24px)] bg-zinc-950">
                  <Image
                    src={azureScreenshots[activeAzureScreenIdx].src}
                    alt={azureScreenshots[activeAzureScreenIdx].jpName}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-1 backdrop-blur-[2px]">
                    <ZoomIn className="w-7 h-7 text-white drop-shadow" />
                    <span className="text-xs font-bold text-white tracking-wider font-mono">クリックで拡大表示</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation options */}
              <div className="flex flex-col space-y-1.5 w-full font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-400 font-mono tracking-wider">SCREENSHOTS</span>
                  <button
                    onClick={() => openLightbox(azureScreenshots, activeAzureScreenIdx)}
                    className="text-[10px] text-purple-400 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>{language === 'jp' ? '全画面ギャラリー' : 'Fullscreen'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {azureScreenshots.map((screen, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveAzureScreenIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs text-left transition-all cursor-pointer truncate ${
                        activeAzureScreenIdx === idx
                          ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 font-semibold border'
                          : 'bg-white/[0.01] border-transparent text-gray-text hover:text-white border'
                      }`}
                    >
                      {language === 'jp' ? screen.jpName : screen.enName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 5: FitAI Trainer */}
          <TiltCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel p-8 border border-card-border/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:col-span-2 mt-4"
          >
            {/* Left Content (Explanation & Controls) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                  {items.fitAi.category}
                </span>
                <h3 className="text-3xl font-bold text-foreground mt-1 mb-4">
                  {items.fitAi.title}
                </h3>
                <p className="text-base text-gray-text font-light leading-relaxed select-text">
                  {items.fitAi.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {items.fitAi.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 text-[11px] rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation options */}
              <div className="flex flex-col space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-pink-400 font-mono tracking-wider">SCREENSHOTS</span>
                  <button
                    onClick={() => openLightbox(fitAiScreenshots, activeFitAiScreenIdx)}
                    className="text-[10px] text-pink-400 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>{language === 'jp' ? '全画面ギャラリー (7枚)' : 'Fullscreen (7 Screens)'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {fitAiScreenshots.map((screen, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFitAiScreenIdx(idx)}
                      className={`px-3 py-2 rounded-lg text-xs text-left transition-all cursor-pointer truncate ${
                        activeFitAiScreenIdx === idx
                          ? 'bg-pink-500/10 border-pink-500/30 text-pink-400 font-semibold border'
                          : 'bg-white/[0.01] border-transparent text-gray-text hover:text-white border'
                      }`}
                    >
                      {language === 'jp' ? screen.jpName : screen.enName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content (Mockup Desktop Window - Clickable for Lightbox) */}
            <div className="lg:col-span-5 flex justify-center items-center bg-black/40 rounded-xl border border-white/5 p-4 h-full min-h-[350px]">
              {/* Browser Bezel mockup */}
              <div
                onClick={() => openLightbox(fitAiScreenshots, activeFitAiScreenIdx)}
                className="relative aspect-[1272/826] w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl transition-transform duration-300 hover:scale-102 cursor-pointer group"
                title={language === 'jp' ? 'クリックして拡大表示' : 'Click to enlarge'}
              >
                {/* Window header */}
                <div className="h-6 bg-white/[0.04] border-b border-white/[0.06] px-3 flex items-center space-x-1.5 shrink-0 select-none z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  <div className="flex-1 bg-white/[0.02] h-3.5 rounded text-[8px] text-white/30 flex items-center justify-center font-mono select-none">
                    fit-ai-trainer
                  </div>
                </div>
                <div className="relative w-full h-[calc(100%-24px)] bg-zinc-950">
                  <Image
                    src={fitAiScreenshots[activeFitAiScreenIdx].src}
                    alt={fitAiScreenshots[activeFitAiScreenIdx].jpName}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-1.5 backdrop-blur-[2px]">
                    <ZoomIn className="w-8 h-8 text-white drop-shadow" />
                    <span className="text-xs font-bold text-white tracking-wider font-mono">クリックで拡大表示</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}
