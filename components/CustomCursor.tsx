import React, { useEffect, useState } from 'react';
import { motion as motionBase, useSpring, useMotionValue } from 'framer-motion';

const motion = motionBase as any;

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor'));
        setIsHovered(true);
        return;
      }

      const interactive = target.closest('button, a, [role="button"], input, textarea, select');
      if (interactive) {
        setCursorText(null);
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring / Label */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center rounded-full text-[9px] font-space font-bold tracking-widest uppercase transition-colors"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 68 : isHovered ? 44 : 28,
          height: cursorText ? 68 : isHovered ? 44 : 28,
          backgroundColor: cursorText ? 'rgba(37, 99, 235, 0.9)' : isHovered ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
          borderColor: cursorText ? 'rgba(96, 165, 250, 0.8)' : isHovered ? 'rgba(59, 130, 246, 0.6)' : 'rgba(255, 255, 255, 0.25)',
          borderWidth: cursorText ? 0 : 1,
          backdropFilter: cursorText ? 'blur(4px)' : 'none',
          color: '#ffffff',
          boxShadow: cursorText ? '0 0 25px rgba(37, 99, 235, 0.5)' : 'none',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 350 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="select-none tracking-wider text-[10px]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Precision Inner Dot */}
      {!cursorText && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[10001] shadow-[0_0_8px_rgba(34,211,238,0.9)]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovered ? 0 : 1,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </>
  );
};

export default CustomCursor;
