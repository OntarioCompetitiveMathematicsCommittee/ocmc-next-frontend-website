/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'nav-break': '1080px',
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/ocmc-bg2.svg')",
        'contest-bg': "url('/assets/contest-bg.png')",
      },
      colors: {
        brandGreen: {
          100: '#E0FFFD',
          200: '#A8FFF9',
          300: '#70FFF6',
          400: '#38FFF2',
          500: '#21D9D0',
          600: '#05A69E',
          700: '#00736E',
          800: '#02403D',
          900: '#003331',
        },
        brandYellow: {
          100: '#FFF8E0',
          200: '#FFEBA8',
          300: '#FFDD70',
          400: '#FFD038',
          500: '#FFC300',
          600: '#CC9C00',
          700: '#997500',
          800: '#664E00',
          900: '#322600',
        },
        brandBlue: {
          100: '#E0F0FF',
          200: '#A8D5FF',
          300: '#70BAFF',
          400: '#389FFF',
          500: '#2182DB',
          600: '#006BCC',
          700: '#005099',
          800: '#003565',
          900: '#001B33',
        },
        brandNeutral: {
          100: '#F9FAFB',
          200: '#F0F1F2',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#030712',
        }
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }, 
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
  },
  safelist: [{pattern : /bg-brand(Green|Blue|Yellow)-(100|200|300|400|500|600|700|800|900)/,}],
  plugins: [],
}
