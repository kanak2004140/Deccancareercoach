/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f0f1e',
        'dark-card': '#1a1a2e',
        'dark-accent': '#16213e',
        'neon-purple': '#9d4edd',
        'neon-blue': '#00d4ff',
        'neon-pink': '#ff006e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(157, 78, 221, 0.5)',
        'neon-blue-glow': '0 0 20px rgba(0, 212, 255, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
