/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#1A0033',
        'purple-glow': '#8B5CF6',
        'light-purple': '#A855F7',
        'card-bg': '#2C2C4A',
        'accent-purple': '#7C3AED',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'purple-glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card-glow': '0 0 15px rgba(168, 85, 247, 0.2)',
      }
    },
  },
  plugins: [],
}


