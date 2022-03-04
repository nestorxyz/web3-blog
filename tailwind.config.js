module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff8867',
        secondary: {
          DEFAULT: '#ff52ff',
          200: '#ffcbff',
          500: '#d339b3',
        },
        background: {
          DEFAULT: '#F0F5F4',
          light: '#f5f5f5',
        },
        sea: {
          DEFAULT: '#00E1C9',
          200: '#d1eeeb',
          500: '#02a090',
        },
        purple: '#8d4ff6',
        gray: {
          DEFAULT: '#708A87',
          dark: '#4f5857',
          light: '#e2e8f0',
        },
      },
    },
  },
  plugins: [],
}