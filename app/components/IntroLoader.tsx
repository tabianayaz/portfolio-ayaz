'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [terminalText, setTerminalText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState<'terminal' | 'logo' | 'fadeup' | 'exit'>('terminal');

  // Character typing speed
  const fullTerminalText = '> Loading Developer Profile...';

  useEffect(() => {
    // 1. Character Typing Sequence
    let currentIdx = 0;
    const typingInterval = setInterval(() => {
      if (currentIdx < fullTerminalText.length) {
        setTerminalText(fullTerminalText.slice(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(typingInterval);
        
        // Show success green indicator after typing finishes
        setTimeout(() => {
          setShowSuccess(true);
          
          // Switch to Phase 2 (Logo reveal)
          setTimeout(() => {
            setStep('logo');
            
            // Switch to Phase 3 (Text fadeup)
            setTimeout(() => {
              setStep('fadeup');
              
              // End animation and trigger flight to navbar
              setTimeout(() => {
                setStep('exit');
                localStorage.setItem('portfolio-visited', 'true');
                onComplete();
              }, 1200); // Wait for user to read text before starting flight
            }, 1800); // Duration for logo glow and sweep
          }, 600); // Pause on "System Ready"
        }, 300);
      }
    }, 25); // Fast, snappy typing speed

    return () => clearInterval(typingInterval);
  }, [onComplete]);

  useEffect(() => {
    // Disable scroll on body and document element
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      // Restore scroll when unmounted
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Floating background particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 200 - 100, // starting offsets from center
    y: Math.random() * 200 - 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 0.5,
  }));

  return (
    <motion.div
      className="fixed inset-0 bg-[#09090B] z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      {/* Glow highlight background */}
      <AnimatePresence>
        {step !== 'terminal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0.25, 
              scale: 1,
              transition: { duration: 1.5, ease: 'easeOut' }
            }}
            exit={{ opacity: 0 }}
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[100px] pointer-events-none -z-10"
          />
        )}
      </AnimatePresence>

      {/* Main Animation Node Container */}
      <div className="flex flex-col items-center justify-center text-center px-6 relative w-full h-full">
        
        {/* Step 1: Terminal Console Loader */}
        {step === 'terminal' && (
          <div className="font-mono text-sm md:text-base text-gray-text flex flex-col items-start space-y-2 select-text">
            <span className="flex items-center">
              {terminalText}
              <span className="w-1.5 h-4 bg-gray-text ml-1 animate-pulse" />
            </span>
            <AnimatePresence>
              {showSuccess && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 font-semibold drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                >
                  System Ready ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Step 2 & 3: Logo Reveal, Particles & Text fade-up */}
        {step !== 'terminal' && (
          <div className="flex flex-col items-center space-y-8 relative">
            
            {/* Ambient Particle Dust */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute left-1/2 top-1/2 rounded-full bg-primary/45"
                  style={{
                    width: p.size,
                    height: p.size,
                    marginLeft: p.x,
                    marginTop: p.y,
                  }}
                  animate={{
                    y: [0, -100 - Math.random() * 50],
                    x: [0, (Math.random() - 0.5) * 80],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>

            {/* Glowing TA Logo (Framer Motion layoutId for smooth flight to navbar) */}
            <motion.div
              layoutId="ta-brand-logo"
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.3)] shrink-0 ta-logo-glow"
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: 'blur(0px)',
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
              }}
            >
              <Image
                src="/logo.jpg"
                alt="TA Logo"
                fill
                className="object-cover"
                priority
              />
              
              {/* Glossy light sweep overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ left: '-150%' }}
                animate={{ 
                  left: '150%',
                  transition: { delay: 0.8, duration: 1.2, ease: 'easeInOut' }
                }}
              />
            </motion.div>

            {/* Step 3: Text fade-up */}
            <div className="h-20 flex flex-col items-center">
              <AnimatePresence>
                {step === 'fadeup' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      アヤズ タビアン イスラム
                    </h1>
                    <span className="text-sm font-semibold tracking-widest text-primary uppercase">
                      Software Engineer
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        )}

      </div>
    </motion.div>
  );
}
