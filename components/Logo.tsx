import React, { useId } from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

export interface LogoProps {
  variant?: 'full' | 'mark';
  theme?: 'light' | 'dark'; // 'light' is for dark backgrounds (default), 'dark' is for light backgrounds
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  className?: string;
  animateOnHover?: boolean;
  monogramClassName?: string;
  wordmarkClassName?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
  animateOnHover = true,
  monogramClassName = '',
  wordmarkClassName = '',
  onClick,
}) => {
  const uid = useId().replace(/:/g, '');

  // Pre-calculated size mappings
  const sizeStyles = {
    xs: {
      mark: 'w-6 h-6',
      full: 'h-6',
    },
    sm: {
      mark: 'w-7 h-7',
      full: 'h-7',
    },
    md: {
      mark: 'w-9 h-9',
      full: 'h-9',
    },
    lg: {
      mark: 'w-11 h-11',
      full: 'h-11',
    },
    xl: {
      mark: 'w-14 h-14',
      full: 'h-14',
    },
    custom: {
      mark: '',
      full: '',
    },
  };

  const selectedSize = sizeStyles[size] || sizeStyles.md;

  const isDarkTheme = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3 select-none cursor-pointer ${
        animateOnHover ? 'transition-transform duration-250 ease-out hover:scale-[1.015] active:scale-[0.99]' : ''
      } ${className}`}
    >
      <style>{`
        @keyframes boltCurrentSweep_${uid} {
          0% {
            filter: drop-shadow(0 0 0px rgba(0, 194, 255, 0)) brightness(1);
          }
          40% {
            filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.85)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.95)) brightness(1.35);
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(0, 194, 255, 0.25)) brightness(1);
          }
        }

        .bolt-element-${uid} {
          transition: filter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        ${animateOnHover ? `
          .group:hover .bolt-element-${uid} {
            animation: boltCurrentSweep_${uid} 350ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        ` : ''}

        @media (prefers-reduced-motion: reduce) {
          .group:hover .bolt-element-${uid} {
            animation: none !important;
            filter: none !important;
          }
          .group {
            transform: none !important;
          }
        }
      `}</style>

      {/* Monogram SVG */}
      <svg
        viewBox="0 0 240 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 overflow-visible ${size !== 'custom' ? selectedSize.mark : ''} ${monogramClassName}`}
        aria-hidden="true"
      >
        <defs>
          {/* Light Theme Gradients (for dark background) */}
          <linearGradient id={`leftGrad_${uid}`} x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F1F5F9" />
            <stop offset="75%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id={`foldGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id={`midFrontGrad_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          <linearGradient id={`midBevelGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Dark Theme Gradients (for light background) */}
          <linearGradient id={`darkLeftGrad_${uid}`} x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="40%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id={`darkFoldGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id={`darkMidFrontGrad_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id={`darkMidBevelGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Electric Blue Bolt Gradient */}
          <linearGradient id={`boltGrad_${uid}`} x1="30%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#1683FF" />
            <stop offset="35%" stopColor="#0091FF" />
            <stop offset="75%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#67E8F9" />
          </linearGradient>
        </defs>

        {/* 1. Left outer stem */}
        <polygon
          points="18,61 58,61 96,122 86,174"
          fill={isDarkTheme ? `url(#darkLeftGrad_${uid})` : `url(#leftGrad_${uid})`}
        />

        {/* 2. Inner Ribbon Shadow Fold */}
        <polygon
          points="92,88 96,122 86,174 105,124"
          fill={isDarkTheme ? `url(#darkFoldGrad_${uid})` : `url(#foldGrad_${uid})`}
        />

        {/* 3. Center Spine Stem (Front face) */}
        <polygon
          points="92,88 126,88 152,176 105,124"
          fill={isDarkTheme ? `url(#darkMidFrontGrad_${uid})` : `url(#midFrontGrad_${uid})`}
        />

        {/* 3b. Center Spine Right Bevel */}
        <polygon
          points="126,88 132,94 156,182 152,176"
          fill={isDarkTheme ? `url(#darkMidBevelGrad_${uid})` : `url(#midBevelGrad_${uid})`}
        />

        {/* 4. Integrated Electric Lightning Bolt */}
        <polygon
          points="214,35 155,114 179,116 156,182 218,98 192,96"
          fill={`url(#boltGrad_${uid})`}
          className={`bolt-element-${uid}`}
        />
      </svg>

      {/* Wordmark (for variant="full") */}
      {variant === 'full' && (
        <span
          className={`font-space font-extrabold tracking-[-0.035em] leading-none transition-colors duration-200 ${
            size === 'xs'
              ? 'text-base'
              : size === 'sm'
              ? 'text-lg'
              : size === 'md'
              ? 'text-xl'
              : size === 'lg'
              ? 'text-2xl'
              : size === 'xl'
              ? 'text-3xl'
              : 'text-xl'
          } ${wordmarkClassName}`}
        >
          <span className={isDarkTheme ? 'text-[#090D16]' : 'text-white'}>Web</span>
          <span className={isDarkTheme ? 'text-[#64748B]' : 'text-[#94A3B8]'}>Bits</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
