
import React, { useEffect, useState, useRef } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';

const motion = motionBase as any;

const BackgroundEffects: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Smoothed scroll progress for fluid animations
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll-based parallax and visual transformations for the "Mesh" blobs
  const y1 = useTransform(smoothScroll, [0, 1], [0, -500]);
  const x1 = useTransform(smoothScroll, [0, 1], [0, 100]);
  
  const y2 = useTransform(smoothScroll, [0, 1], [0, -900]);
  const x2 = useTransform(smoothScroll, [0, 1], [0, -150]);
  
  const y3 = useTransform(smoothScroll, [0, 1], [0, -300]);
  const scale3 = useTransform(smoothScroll, [0, 1], [1, 1.5]);

  // Dynamic color shift based on scroll depth (fuller spectrum for more impact)
  const hueShift = useTransform(smoothScroll, [0, 1], [0, 60]);
  const globalOpacity = useTransform(smoothScroll, [0, 0.5, 1], [0.8, 0.4, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle System with Scroll Interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      velocity: { x: number; y: number };
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.4;
        this.density = Math.random() * 20 + 1;
        this.velocity = {
          x: (Math.random() - 0.5) * 0.25,
          y: (Math.random() - 0.5) * 0.25,
        };
        this.color = Math.random() > 0.6 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(99, 102, 241, 0.2)';
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update(width: number, height: number, mouseX: number, mouseY: number, sVel: number) {
        // Apply scroll-based vertical "wind"
        this.y += this.velocity.y + (sVel * 0.04 * this.density);
        this.x += this.velocity.x;

        // Mouse interaction (Repulsion)
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 180;
        
        if (distance < maxDistance) {
          let force = (maxDistance - distance) / maxDistance;
          let directionX = (dx / distance) * force * this.density * 0.7;
          let directionY = (dy / distance) * force * this.density * 0.7;
          this.x -= directionX;
          this.y -= directionY;
        }

        // Screen wrap
        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 14000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height, mousePos.x, mousePos.y, scrollVelocity);
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030303]"
      style={{ 
        filter: useTransform(hueShift, (v) => `hue-rotate(${v}deg)`),
        opacity: globalOpacity 
      } as any}
    >
      {/* Background Mesh Gradient - Multiple Layers */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Blob 1 */}
        <motion.div
          style={{ x: x1, y: y1 }}
          className="absolute -top-[10%] -right-[10%] w-[80vw] h-[80vw] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-glow"
        />
        
        {/* Animated Gradient Blob 2 */}
        <motion.div
          style={{ x: x2, y: y2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-900/20 blur-[180px] animate-float-slow [animation-duration:30s]"
        />

        {/* Animated Gradient Blob 3 - Interactive Position */}
        <motion.div
          style={{ y: y3, scale: scale3 }}
          className="absolute top-[30%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-blue-400/5 blur-[120px] animate-pulse-glow [animation-delay:2s]"
        />
        
        {/* Animated Gradient Blob 4 - Accent */}
        <motion.div
          className="absolute top-[60%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-indigo-500/5 blur-[100px] animate-float-slow [animation-direction:reverse]"
        />
      </div>

      {/* Grid Pattern */}
      <motion.div 
        className="absolute inset-0 bg-grid opacity-[0.07]"
        style={{ y: useTransform(smoothScroll, [0, 1], [0, -80]) }}
      />
      
      {/* Particles Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] mix-blend-screen opacity-40"
      />

      {/* Cinematic Vignettes and Depth Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-90 z-[2]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-[2]" />

      {/* Top Edge Glow */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-blue-500/10 to-transparent z-[2]"
        style={{ opacity: useTransform(smoothScroll, [0, 0.4], [1, 0]) }}
      />

      {/* Dynamic Cursor Light */}
      <motion.div
        className="absolute w-[1200px] h-[1200px] rounded-full opacity-[0.15] hidden md:block z-[3]"
        animate={{
          x: mousePos.x - 600,
          y: mousePos.y - 600,
        }}
        transition={{ type: 'spring', damping: 60, stiffness: 35, mass: 1.2 }}
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          mixBlendMode: 'screen'
        } as any}
      />
    </motion.div>
  );
};

export default BackgroundEffects;
