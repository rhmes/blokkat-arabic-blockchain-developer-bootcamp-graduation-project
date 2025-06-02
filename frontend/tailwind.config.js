// tailwind.config.js
module.exports = {
  darkMode: 'class', // MUST be set to 'class' to work with manual toggling
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}