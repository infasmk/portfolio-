/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#050505',
          graphite: '#0b0c10',
          card: '#10121a',
          surface: '#161922',
          border: 'rgba(255, 255, 255, 0.08)',
          blue: '#2563eb',
          electric: '#3b82f6',
          cyan: '#06b6d4',
          violet: '#6366f1',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 60%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 8s infinite ease-in-out',
        'float-slow': 'float 20s infinite ease-in-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
