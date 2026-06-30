'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type TiltCardProps = React.ComponentProps<typeof motion.div> & {
  /** Max rotation in degrees on either axis. Default 8. */
  tiltStrength?: number;
};

/**
 * Wraps a glass-panel card with a cursor-driven 3D tilt + a soft
 * radial highlight that follows the pointer. Falls back to a flat,
 * static card when the user has prefers-reduced-motion enabled.
 *
 * Usage: replace `<motion.div className="glass-panel ...">` with
 * `<TiltCard className="glass-panel ...">` and keep all the same
 * initial / whileInView / transition props — they pass straight through.
 */
export default function TiltCard({
  children,
  className = '',
  style,
  tiltStrength = 8,
  ...motionProps
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Normalized pointer position: -0.5 (left/top) to 0.5 (right/bottom)
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [tiltStrength, -tiltStrength]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-tiltStrength, tiltStrength]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    px.set(nx - 0.5);
    py.set(ny - 0.5);
    el.style.setProperty('--mx', `${nx * 100}%`);
    el.style.setProperty('--my', `${ny * 100}%`);
  };

  const handleMouseLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1000,
        ...style,
      }}
      className={`tilt-card ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
