'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { motion } from 'motion/react';
import { 
  Flame, Cpu, Database, Code2, Cloud, GitBranch, 
  Terminal, Layers, Smartphone, Sparkles, Binary
} from 'lucide-react';

interface SkillItem {
  name: string;
  level: string;
  description: string;
  icon: React.ReactNode;
  gridClass: string;
  color: string;
}

export default function Skills() {
  const { language } = useApp();
  const t = dictionary[language].skills;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const skillItems: SkillItem[] = [
    {
      name: 'Next.js / React',
      level: 'Advanced',
      description: language === 'jp' ? 'SSR/ISR、App Routerを使用した高品質Webアプリ開発。' : 'High-perf web apps using SSR/ISR and App Router.',
      icon: <Layers className="w-6 h-6" />,
      gridClass: 'md:col-span-2 md:row-span-1',
      color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400'
    },
    {
      name: 'Unity',
      level: 'Advanced',
      description: language === 'jp' ? '2D/3Dゲーム開発、C#スクリプティング、敵AI実装。' : '2D/3D game development, C# scripting, and enemy AI.',
      icon: <Flame className="w-6 h-6" />,
      gridClass: 'md:col-span-2 md:row-span-1',
      color: 'from-orange-500/20 to-red-500/20 text-orange-400'
    },
    {
      name: 'Azure',
      level: 'Intermediate',
      description: language === 'jp' ? 'AZ-900取得。クラウド構築、仮想マシン、基本インフラ。' : 'AZ-900 Certified. VM provisioning and basic cloud infra.',
      icon: <Cloud className="w-6 h-6" />,
      gridClass: 'md:col-span-1 md:row-span-1',
      color: 'from-sky-500/20 to-blue-600/20 text-sky-400'
    },
    {
      name: 'Python',
      level: 'Advanced',
      description: language === 'jp' ? 'データ解析、AIモデル作成、自動化スクリプト開発。' : 'Data analysis, AI model crafting, and automation scripts.',
      icon: <Binary className="w-6 h-6" />,
      gridClass: 'md:col-span-1 md:row-span-1',
      color: 'from-yellow-500/20 to-green-500/20 text-yellow-400'
    },
    {
      name: 'TypeScript',
      level: 'Advanced',
      description: language === 'jp' ? '型安全なWeb開発。API統合、スケーラブルなコード設計。' : 'Type-safe front-end engineering and modular APIs.',
      icon: <Code2 className="w-6 h-6" />,
      gridClass: 'md:col-span-1 md:row-span-1',
      color: 'from-blue-600/20 to-indigo-500/20 text-indigo-400'
    },
    {
      name: 'OpenCV',
      level: 'Intermediate',
      description: language === 'jp' ? 'Python連携による画像処理、リアルタイム物体認識。' : 'Image processing and real-time object detection using Python.',
      icon: <Cpu className="w-6 h-6" />,
      gridClass: 'md:col-span-2 md:row-span-1',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400'
    },
    {
      name: 'Android',
      level: 'Intermediate',
      description: language === 'jp' ? 'Java/Kotlinを用いたモバイルアプリ開発、UI設計。' : 'Native mobile application design utilizing Java/Kotlin.',
      icon: <Smartphone className="w-6 h-6" />,
      gridClass: 'md:col-span-1 md:row-span-1',
      color: 'from-green-600/20 to-emerald-500/20 text-green-400'
    },
    {
      name: 'Docker',
      level: 'Intermediate',
      description: language === 'jp' ? 'コンテナ化による一貫した開発・デプロイ環境の構築。' : 'Containerizing applications for consistent deployment.',
      icon: <Terminal className="w-6 h-6" />,
      gridClass: 'md:col-span-1 md:row-span-1',
      color: 'from-cyan-600/20 to-blue-500/20 text-cyan-400'
    },
    {
      name: 'Git',
      level: 'Advanced',
      description: language === 'jp' ? 'ブランチ管理、Github Actionsによるチーム開発の効率化。' : 'Branch management and CI/CD automation via GitHub.',
      icon: <GitBranch className="w-6 h-6" />,
      gridClass: 'md:col-span-1 md:row-span-1',
      color: 'from-red-500/20 to-rose-600/20 text-rose-400'
    },
    {
      name: 'SQL',
      level: 'Advanced',
      description: language === 'jp' ? 'リレーショナルデータベース設計、クエリ最適化。' : 'RDBMS schema design and query latency optimization.',
      icon: <Database className="w-6 h-6" />,
      gridClass: 'md:col-span-1 md:row-span-1',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400'
    },
    {
      name: 'Firebase',
      level: 'Intermediate',
      description: language === 'jp' ? 'NoSQL、認証、ホスティングを利用した高速開発。' : 'Serverless auth, NoSQL database, and swift deployment.',
      icon: <Sparkles className="w-6 h-6" />,
      gridClass: 'md:col-span-1 md:row-span-1',
      color: 'from-amber-500/20 to-orange-600/20 text-amber-400'
    }
  ];

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden bg-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16 items-start md:items-center text-left md:text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            {t.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {t.title}
          </h2>
          <div className="h-[3px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm md:text-base text-gray-text max-w-xl font-light"
          >
            {t.bentoDescription}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {skillItems.map((skill, index) => (
            <motion.div
              key={index}
              onMouseMove={handleMouseMove}
              className={`glow-card glass-panel group p-6 border border-card-border/60 hover:bg-white/[0.03] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between min-h-[180px] ${skill.gridClass}`}
              style={{ contentVisibility: 'auto' }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} border border-white/[0.05]`}>
                  {skill.icon}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  {skill.level}
                </span>
              </div>

              <div className="z-10 mt-auto select-none">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs text-gray-text font-light leading-relaxed select-text">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
