'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { dictionary } from '../locales/dictionary';
import { motion } from 'motion/react';
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Cpu,
  Gamepad2,
  Wrench,
  GraduationCap,
  Sparkles,
  Binary,
  Layers,
  Terminal,
  FileCode,
  Flame,
  Globe,
  Palette,
  Wind,
  Zap,
  Network,
  MapPin,
  ShieldCheck,
  Eye,
  Activity,
  GitBranch,
  Send,
  Smartphone,
  Boxes
} from 'lucide-react';

interface SkillItem {
  name: string;
  level: 'Advanced' | 'Intermediate' | 'Beginner';
  icon?: React.ReactNode;
}

interface SkillCategory {
  id: string;
  titleJp: string;
  titleEn: string;
  icon: React.ReactNode;
  accentColor: string;
  skills: SkillItem[];
}

interface CurrentlyLearningItem {
  nameJp: string;
  nameEn: string;
  icon: React.ReactNode;
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

  const categories: SkillCategory[] = [
    {
      id: 'languages',
      titleJp: 'プログラミング言語',
      titleEn: 'Programming Languages',
      icon: <Code2 className="w-5 h-5 text-amber-400" />,
      accentColor: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400',
      skills: [
        { name: 'Python', level: 'Advanced', icon: <Binary className="w-3.5 h-3.5 text-yellow-400" /> },
        { name: 'TypeScript', level: 'Intermediate', icon: <Code2 className="w-3.5 h-3.5 text-blue-400" /> },
        { name: 'Java', level: 'Intermediate', icon: <FileCode className="w-3.5 h-3.5 text-orange-400" /> },
        { name: 'C#', level: 'Intermediate', icon: <Flame className="w-3.5 h-3.5 text-purple-400" /> },
        { name: 'SQL', level: 'Intermediate', icon: <Database className="w-3.5 h-3.5 text-cyan-400" /> }
      ]
    },
    {
      id: 'frontend',
      titleJp: 'フロントエンド',
      titleEn: 'Frontend',
      icon: <Layout className="w-5 h-5 text-cyan-400" />,
      accentColor: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400',
      skills: [
        { name: 'React', level: 'Intermediate', icon: <Layers className="w-3.5 h-3.5 text-cyan-400" /> },
        { name: 'TypeScript', level: 'Intermediate', icon: <Code2 className="w-3.5 h-3.5 text-blue-400" /> },
        { name: 'HTML5', level: 'Advanced', icon: <Globe className="w-3.5 h-3.5 text-orange-400" /> },
        { name: 'CSS3', level: 'Intermediate', icon: <Palette className="w-3.5 h-3.5 text-blue-400" /> },
        { name: 'Tailwind CSS', level: 'Intermediate', icon: <Wind className="w-3.5 h-3.5 text-sky-400" /> }
      ]
    },
    {
      id: 'backend',
      titleJp: 'バックエンド',
      titleEn: 'Backend',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      accentColor: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      skills: [
        { name: 'FastAPI', level: 'Intermediate', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" /> },
        { name: 'Python Backend Development', level: 'Intermediate', icon: <Terminal className="w-3.5 h-3.5 text-green-400" /> },
        { name: 'REST API', level: 'Intermediate', icon: <Network className="w-3.5 h-3.5 text-teal-400" /> }
      ]
    },
    {
      id: 'databases',
      titleJp: 'データベース',
      titleEn: 'Databases',
      icon: <Database className="w-5 h-5 text-purple-400" />,
      accentColor: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
      skills: [
        { name: 'PostgreSQL', level: 'Intermediate', icon: <Database className="w-3.5 h-3.5 text-blue-400" /> },
        { name: 'PostGIS', level: 'Beginner', icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" /> },
        { name: 'Firebase Firestore', level: 'Intermediate', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
        { name: 'Supabase', level: 'Beginner', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" /> }
      ]
    },
    {
      id: 'cloud',
      titleJp: 'クラウド・認証',
      titleEn: 'Cloud & Authentication',
      icon: <Cloud className="w-5 h-5 text-sky-400" />,
      accentColor: 'from-sky-500/20 to-blue-600/20 border-sky-500/30 text-sky-400',
      skills: [
        { name: 'Microsoft Azure', level: 'Beginner', icon: <Cloud className="w-3.5 h-3.5 text-sky-400" /> },
        { name: 'Azure AI', level: 'Beginner', icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" /> },
        { name: 'Firebase Authentication', level: 'Intermediate', icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> },
        { name: 'Firebase', level: 'Intermediate', icon: <Flame className="w-3.5 h-3.5 text-orange-400" /> }
      ]
    },
    {
      id: 'ai',
      titleJp: 'AI・コンピュータビジョン',
      titleEn: 'AI & Computer Vision',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      accentColor: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400',
      skills: [
        { name: 'MediaPipe', level: 'Intermediate', icon: <Activity className="w-3.5 h-3.5 text-pink-400" /> },
        { name: 'OpenCV', level: 'Intermediate', icon: <Eye className="w-3.5 h-3.5 text-emerald-400" /> },
        { name: 'Computer Vision', level: 'Intermediate', icon: <Cpu className="w-3.5 h-3.5 text-indigo-400" /> },
        { name: 'AI Application Development', level: 'Intermediate', icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" /> }
      ]
    },
    {
      id: 'game',
      titleJp: 'ゲーム開発',
      titleEn: 'Game Development',
      icon: <Gamepad2 className="w-5 h-5 text-orange-400" />,
      accentColor: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400',
      skills: [
        { name: 'Unity', level: 'Intermediate', icon: <Gamepad2 className="w-3.5 h-3.5 text-orange-400" /> },
        { name: '2D Game Development', level: 'Intermediate', icon: <Layers className="w-3.5 h-3.5 text-amber-400" /> },
        { name: 'Game UI Development', level: 'Beginner', icon: <Layout className="w-3.5 h-3.5 text-rose-400" /> }
      ]
    },
    {
      id: 'tools',
      titleJp: '開発ツール',
      titleEn: 'Developer Tools',
      icon: <Wrench className="w-5 h-5 text-rose-400" />,
      accentColor: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400',
      skills: [
        { name: 'Git', level: 'Intermediate', icon: <GitBranch className="w-3.5 h-3.5 text-red-400" /> },
        { name: 'GitHub', level: 'Intermediate', icon: <GitBranch className="w-3.5 h-3.5 text-gray-300" /> },
        { name: 'Visual Studio Code', level: 'Advanced', icon: <Terminal className="w-3.5 h-3.5 text-blue-400" /> },
        { name: 'Android Studio', level: 'Intermediate', icon: <Smartphone className="w-3.5 h-3.5 text-green-400" /> },
        { name: 'Postman', level: 'Intermediate', icon: <Send className="w-3.5 h-3.5 text-orange-400" /> }
      ]
    }
  ];

  const currentlyLearningItems: CurrentlyLearningItem[] = [
    { nameJp: 'Docker', nameEn: 'Docker', icon: <Boxes className="w-4 h-4 text-cyan-400" /> },
    { nameJp: 'GitHub Actions (CI/CD)', nameEn: 'GitHub Actions (CI/CD)', icon: <GitBranch className="w-4 h-4 text-purple-400" /> },
    { nameJp: 'Azure Cloud Services', nameEn: 'Azure Cloud Services', icon: <Cloud className="w-4 h-4 text-sky-400" /> },
    { nameJp: 'PostgreSQL / PostGIS', nameEn: 'PostgreSQL / PostGIS', icon: <Database className="w-4 h-4 text-blue-400" /> },
    { nameJp: 'システム設計', nameEn: 'System Design', icon: <Network className="w-4 h-4 text-emerald-400" /> }
  ];

  const renderLevelBadge = (level: 'Advanced' | 'Intermediate' | 'Beginner') => {
    let badgeColor = '';
    if (level === 'Advanced') {
      badgeColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    } else if (level === 'Intermediate') {
      badgeColor = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    } else {
      badgeColor = 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }

    return (
      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${badgeColor} shrink-0`}>
        {level}
      </span>
    );
  };

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden bg-black/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
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
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm md:text-base text-gray-text max-w-2xl font-light leading-relaxed select-text"
          >
            {t.bentoDescription}
          </motion.p>
        </div>

        {/* 4-Column Grid for Desktop, 2-Column for Tablet, 1-Column for Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glow-card glass-panel group p-6 border border-card-border/60 hover:bg-white/[0.03] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-white/5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.accentColor} border border-white/[0.08]`}>
                    {category.icon}
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {language === 'jp' ? category.titleJp : category.titleEn}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start justify-between gap-2 py-2 px-2 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-start space-x-2.5 min-w-0 flex-1">
                        {skill.icon && (
                          <span className="p-1 rounded bg-white/5 text-gray-300 shrink-0 mt-0.5">
                            {skill.icon}
                          </span>
                        )}
                        <span className="text-xs md:text-sm font-medium text-foreground/90 leading-snug break-words">
                          {skill.name}
                        </span>
                      </div>
                      <div className="shrink-0 pt-0.5">
                        {renderLevelBadge(skill.level)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Currently Learning Card (Featured Card) */}
          <motion.div
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glow-card glass-panel group p-6 md:p-8 border border-primary/30 hover:border-primary/50 hover:-translate-y-1.5 cursor-pointer col-span-1 sm:col-span-2 lg:col-span-4 mt-2"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-3 shrink-0">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 text-primary">
                  <GraduationCap className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                      {t.currentlyLearningSubtitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mt-1">
                    {t.currentlyLearningTitle}
                  </h3>
                </div>
              </div>

              {/* Learning Items Grid */}
              <div className="flex flex-wrap gap-2.5 flex-1 md:justify-end">
                {currentlyLearningItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-primary/10 border border-white/[0.08] hover:border-primary/30 transition-all text-xs font-semibold text-foreground/90"
                  >
                    {item.icon}
                    <span>{language === 'jp' ? item.nameJp : item.nameEn}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
