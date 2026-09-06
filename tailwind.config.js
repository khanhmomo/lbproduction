/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#FFF9C4',
          200: '#F9E79F',
          300: '#F5D45E',
          400: '#F5C518',
          500: '#E3B008',
          600: '#C99A0A',
        },
        dark: '#0a0a0a',
        darker: '#050505',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
