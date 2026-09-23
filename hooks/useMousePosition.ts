import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX;
      const y = e.clientY;
      const normalizedX = (x / innerWidth) * 2 - 1;
      const normalizedY = -(y / innerHeight) * 2 + 1;

      setMousePosition({
        x,
        y,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
}
