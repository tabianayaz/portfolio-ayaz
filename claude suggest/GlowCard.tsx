'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';

type GlowCardProps = React.ComponentProps<typeof motion.div>;

/**
 * Wraps a glass-panel card with a soft radial highlight that follows
 * the cursor — pure CSS glow via custom properties, no 3D rotation.
 *
 * Usage: replace `<motion.div className="glass-panel ...">` with
 * `<GlowCard className="glass-panel ...">` and keep all the same
 * initial / whileInView / transition props — they pass straight through.
 */
export default function GlowCard({
  children,
  className = '',
  ...motionProps
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 100;
    const ny = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${nx}%`);
    el.style.setProperty('--my', `${ny}%`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`glow-card ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
