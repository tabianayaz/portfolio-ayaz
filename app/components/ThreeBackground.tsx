'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle Geometry
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2; // Z

      velocities[i * 3] = (Math.random() - 0.5) * 0.003; // X
      velocities[i * 3 + 1] = Math.random() * 0.003 + 0.001; // Y
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002; // Z

      scales[i] = Math.random() * 0.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Canvas Texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.18,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Theme Switch Observer to adjust particle colors/blending in Light Mode
    const handleThemeChange = () => {
      const isLight = document.documentElement.classList.contains('light');
      if (isLight) {
        material.blending = THREE.NormalBlending;
        material.opacity = 0.65;
        material.color.set('#8B5CF6');
      } else {
        material.blending = THREE.AdditiveBlending;
        material.opacity = 1.0;
        material.color.set('#ffffff');
      }
      material.needsUpdate = true;
    };

    handleThemeChange();

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3] += velocities[i * 3] + mouseX * 0.002;
        posArray[i * 3 + 2] += velocities[i * 3 + 2];

        if (posArray[i * 3 + 1] > 6) {
          posArray[i * 3 + 1] = -6;
          posArray[i * 3] = (Math.random() - 0.5) * 12;
        }
        if (posArray[i * 3] > 6) posArray[i * 3] = -6;
        if (posArray[i * 3] < -6) posArray[i * 3] = 6;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y += 0.0008;
      points.rotation.x = -mouseY * 0.12;
      points.rotation.y = mouseX * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-5 pointer-events-none overflow-hidden"
    />
  );
}
