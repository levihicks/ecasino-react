module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
      },
      colors: {
        'black': '#001207',
        'white': '#F8FFFB',
        'green-dark': '#285238',
        'green': '#138A36',
        'green-light': '#18FF6D',
        'red': '#FF0000',
      },
      boxShadow: {
        DEFAULT: '0 0 50px rgba(4, 232, 36, 1)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
