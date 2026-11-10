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
        obsidian: '#080808',
        'deep-charcoal': '#111111',
        graphite: {
          DEFAULT: '#1A1A1A',
          light: '#242424',
        },
        'muted-silver': '#B8B8B8',
        'warm-ivory': '#F5F2EA',
        copper: {
          DEFAULT: '#B87350',
          light: '#D48B68',
          dark: '#8C4E31',
        },
        brand: {
          dark: '#080808',
          graphite: '#111111',
          card: '#1A1A1A',
          surface: '#242424',
          border: 'rgba(255, 255, 255, 0.08)',
          copper: '#B87350',
          'copper-light': '#D48B68',
          'copper-dark': '#8C4E31',
          ivory: '#F5F2EA',
          silver: '#B8B8B8',
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(184, 115, 80, 0.20) 0%, transparent 70%)',
        'copper-glow': 'radial-gradient(circle at 50% 50%, rgba(184, 115, 80, 0.25) 0%, transparent 60%)',
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
