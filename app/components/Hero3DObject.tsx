'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * A single, focused 3D centerpiece for the hero section — distinct from
 * ThreeBackground's ambient particle field. Renders a glass-like
 * icosahedron with a wireframe shell, lit with two colored point lights
 * matching the site's primary/secondary palette, rotating gently and
 * tilting toward the cursor.
 *
 * Skipped on small screens and when prefers-reduced-motion is set, to
 * keep the hero light on mobile and respect motion preferences.
 */
export default function Hero3DObject() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isSmallScreen = window.innerWidth < 768;
    if (isSmallScreen) return; // keep mobile hero lightweight, no WebGL cost

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Glass-like core
    const coreGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#8B5CF6'),
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.9,
      thickness: 1.2,
      transparent: true,
      opacity: 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Wireframe shell for structural definition
    const wireGeometry = new THREE.IcosahedronGeometry(2.16, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#3B82F6'),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wire);

    // Lighting matching the site's primary/secondary palette
    const keyLight = new THREE.PointLight('#8B5CF6', 14, 20);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight('#3B82F6', 9, 20);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight('#ffffff', 0.15));

    // Theme Switch Observer to adjust lighting & core opacity in Light Mode
    const handleThemeChange = () => {
      const isLight = document.documentElement.classList.contains('light');
      if (isLight) {
        keyLight.intensity = 20;
        rimLight.intensity = 15;
        coreMaterial.opacity = 0.45;
        coreMaterial.color.set('#7C3AED');
        wireMaterial.opacity = 0.35;
        wireMaterial.color.set('#2563EB');
      } else {
        keyLight.intensity = 14;
        rimLight.intensity = 9;
        coreMaterial.opacity = 0.32;
        coreMaterial.color.set('#8B5CF6');
        wireMaterial.opacity = 0.22;
        wireMaterial.color.set('#3B82F6');
      }
      coreMaterial.needsUpdate = true;
      wireMaterial.needsUpdate = true;
    };

    handleThemeChange();

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;
        core.rotation.y += 0.0025;
      }

      core.rotation.x = mouseY * 0.5;
      core.rotation.y += prefersReducedMotion ? 0 : mouseX * 0.002;
      wire.rotation.x = core.rotation.x;
      wire.rotation.y = core.rotation.y;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      renderer.dispose();
      coreGeometry.dispose();
      wireGeometry.dispose();
      coreMaterial.dispose();
      wireMaterial.dispose();
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-2 pointer-events-none hidden md:block"
      aria-hidden="true"
    />
  );
}
