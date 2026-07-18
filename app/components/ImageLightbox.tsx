'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface LightboxImage {
  src: string;
  jpName: string;
  enName: string;
  projectTitle?: string;
  category?: string;
  version?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate
}: ImageLightboxProps) {
  const { language } = useApp();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const currentImage = images[currentIndex];

  // Reset zoom state when active image changes or lightbox opens/closes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex, isOpen]);

  // Lock document body scroll when lightbox modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation & ESC close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (images.length > 1) {
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }
      } else if (e.key === 'ArrowRight') {
        if (images.length > 1) {
          onNavigate((currentIndex + 1) % images.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.25, 3));
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () =>
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleDoubleTapZoom = () => {
    if (scale > 1) {
      handleResetZoom();
    } else {
      setScale(2);
    }
  };

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-xl flex flex-col justify-between p-4 md:p-6 select-none overflow-hidden"
          onClick={onClose}
        >
          {/* Top Control Bar (Glassmorphism) */}
          <div
            className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 bg-white/[0.05] border border-white/10 rounded-2xl px-4 md:px-6 py-3 backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Project Title & Active Screen Name */}
            <div className="flex items-center space-x-3 truncate">
              {currentImage.projectTitle && (
                <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 shrink-0">
                  {currentImage.projectTitle}
                </span>
              )}
              <span className="text-sm md:text-base font-semibold text-white truncate font-mono">
                {language === 'jp' ? currentImage.jpName : currentImage.enName}
              </span>
            </div>

            {/* Right: Counter, Zoom Controls, Close Button */}
            <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
              {/* Image Counter Indicator */}
              {images.length > 1 && (
                <span className="text-xs font-mono font-bold text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  {currentIndex + 1} / {images.length}
                </span>
              )}

              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= 1}
                  className="p-1.5 rounded text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-bold text-gray-300 px-1.5 min-w-[36px] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= 3}
                  className="p-1.5 rounded text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {scale > 1 && (
                  <button
                    onClick={handleResetZoom}
                    className="p-1.5 rounded text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image Canvas */}
          <div
            className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center my-4 overflow-hidden"
            onWheel={handleWheel}
            onClick={onClose}
          >
            {/* Previous Arrow Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((currentIndex - 1 + images.length) % images.length);
                }}
                className="absolute left-2 md:left-4 z-30 p-3 md:p-4 rounded-2xl bg-black/60 hover:bg-black/85 border border-white/15 text-white backdrop-blur-md shadow-2xl transition-all cursor-pointer hover:scale-110 active:scale-95 group"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Active Enlarged Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.src}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: scale, x: position.x, y: position.y }}
                exit={{ opacity: 0, scale: 0.92, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                drag={scale > 1 ? true : 'x'}
                dragConstraints={
                  scale > 1
                    ? { left: -300, right: 300, top: -300, bottom: 300 }
                    : { left: 0, right: 0 }
                }
                dragElastic={scale > 1 ? 0.1 : 0.25}
                onDragEnd={(e, info) => {
                  if (scale === 1 && images.length > 1) {
                    if (info.offset.x < -80) {
                      onNavigate((currentIndex + 1) % images.length);
                    } else if (info.offset.x > 80) {
                      onNavigate((currentIndex - 1 + images.length) % images.length);
                    }
                  }
                }}
                onDoubleClick={toggleDoubleTapZoom}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-full max-h-[75vh] md:max-h-[82vh] rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-white/15 cursor-grab active:cursor-grabbing flex items-center justify-center bg-black/40"
              >
                <img
                  src={currentImage.src}
                  alt={language === 'jp' ? currentImage.jpName : currentImage.enName}
                  className="max-w-full max-h-[75vh] md:max-h-[82vh] object-contain rounded-2xl pointer-events-none select-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next Arrow Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((currentIndex + 1) % images.length);
                }}
                className="absolute right-2 md:right-4 z-30 p-3 md:p-4 rounded-2xl bg-black/60 hover:bg-black/85 border border-white/15 text-white backdrop-blur-md shadow-2xl transition-all cursor-pointer hover:scale-110 active:scale-95 group"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Thumbnail Strip & Navigation Hints */}
          <div
            className="w-full max-w-7xl mx-auto z-20 flex flex-col items-center space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto max-w-full p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate(idx)}
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      currentIndex === idx
                        ? 'border-primary scale-105 shadow-[0_0_15px_rgba(139,92,246,0.6)] ring-2 ring-primary/40'
                        : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.jpName}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            <span className="text-[10px] text-gray-400 font-mono tracking-wider text-center">
              {language === 'jp'
                ? 'ヒント: ESCキーで閉じる • スワイプ/矢印キーで切替 • ダブルタップ/ホイールで拡大'
                : 'Hint: Press ESC to close • Swipe/Arrow keys to navigate • Double-click/Scroll to zoom'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
