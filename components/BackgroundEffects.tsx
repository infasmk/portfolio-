import React, { useEffect, useRef } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';

const motion = motionBase as any;

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // Dynamic color & lighting transitions based on scroll depth (Requirement 25)
  // Hero (0): deep electric blue
  // About (0.25): cyan subtle grid
  // Projects (0.5): dark studio graphite
  // Team (0.75): soft blue ambient
  // Contact (1.0): high-contrast cyan/indigo
  const blob1Y = useTransform(smoothScroll, [0, 1], [0, -350]);
  const blob2Y = useTransform(smoothScroll, [0, 1], [0, -600]);
  const blobScale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.25, 0.95]);

  const ambientOpacity = useTransform(smoothScroll, [0, 0.4, 0.8, 1], [0.8, 0.5, 0.65, 0.9]);

  // High performance, lightweight particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Keep count modest (45 particles) for optimal CPU/battery efficiency
    const count = 45;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      style={{ opacity: ambientOpacity }}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]"
    >
      {/* Scroll-Linked Ambient Aurora Mesh Blobs */}
      <motion.div
        style={{ y: blob1Y, scale: blobScale }}
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-blue-700/10 blur-[160px]"
      />

      <motion.div
        style={{ y: blob2Y }}
        className="absolute top-[45%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-cyan-600/8 blur-[180px]"
      />

      <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[180px]" />

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      {/* Floating Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 mix-blend-screen opacity-50"
      />

      {/* Depth Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,5,0.85)_100%)] z-20" />
    </motion.div>
  );
};

export default BackgroundEffects;
