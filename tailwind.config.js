/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf9f4',
          100: '#f7f1e6',
          200: '#eddcb7',
          300: '#e0d3b8',
          400: '#b89243',
          500: '#8c6a24',
          600: '#75561b',
          700: '#5c4215',
          800: '#fffefcff',
          900: '#945207ff',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  safelist: [
    {
      pattern: /bg-gold-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /border-gold-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-gold-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  plugins: [],
};
