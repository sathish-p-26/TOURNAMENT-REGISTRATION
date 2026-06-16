/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-primary': '#cfa83b',
        'gold-light': '#f3e5ab',
        'neon-yellow': '#e6ff00',
        'dark-bg': '#08080a',
        'dark-card': 'rgba(14, 14, 18, 0.65)',
        'dark-input': 'rgba(0, 0, 0, 0.45)',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(230, 255, 0, 0.25)',
        'neon-glow-strong': '0 0 35px rgba(230, 255, 0, 0.45)',
        'gold-glow': '0 0 20px rgba(207, 168, 59, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
