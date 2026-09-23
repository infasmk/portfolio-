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

  // Parallax shifts on scroll
  const blob1Y = useTransform(smoothScroll, [0, 1], [0, -350]);
  const blob2Y = useTransform(smoothScroll, [0, 1], [0, -600]);
  const gridY = useTransform(smoothScroll, [0, 1], [0, -120]);

  // Continuous drifting particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const count = 50;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY + Math.sin(t + p.phase) * 0.1;

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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Continuous Animated Aurora Orbs with Scroll Parallax */}
      <motion.div
        style={{ y: blob1Y }}
        animate={{
          x: [0, 40, -30, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-blue-700/10 blur-[160px]"
      />

      <motion.div
        style={{ y: blob2Y }}
        animate={{
          x: [0, -50, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-cyan-600/8 blur-[180px]"
      />

      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-indigo-900/10 blur-[180px]"
      />

      {/* Parallax Digital Grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 bg-grid opacity-[0.04]"
      />

      {/* Continuous Drifting Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 mix-blend-screen opacity-50"
      />

      {/* Depth Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(5,5,5,0.85)_100%)] z-20" />
    </div>
  );
};

export default BackgroundEffects;
