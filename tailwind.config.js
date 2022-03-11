module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
        'retro': ['\'Press Start 2P\'', 'serif']
      },
      colors: {
        'black': '#001207',
        'white': '#F8FFFB',
        'green-dark': '#285238',
        'green': '#138A36',
        'green-light': '#18FF6D',
        'red': '#FF0000',
        'red-dark': '#cc0000',
        'gray': '#839595',
        'pink': '#FF6666',
        'yellow': '#FFE971'
      },
      boxShadow: {
        DEFAULT: '0 0 50px rgba(4, 232, 36, 1)',
        md: '-1px 0px 15px black'
      },
      keyframes: {
        floatToBottomLeft: {
          '0%': { top: '-100%', right: '-50%', },
          '100%': { top: '100%', right: '100%' }
        },
        floatToBottomRight: {
          '0%': { top: '-100%', left: '-50%', },
          '100%': { top: '100%', left: '100%' }
        },
        floatToTopRight: {
          '0%': { top: '100%', left: '-50%', },
          '100%': { top: '-100%', left: '100%' }
        },
        expand: {
          '100%': { transform: 'scale(1.05)' }
        }
      },
      animation: {
        'float-bl': 'floatToBottomLeft 8s linear infinite',
        'float-br': 'floatToBottomRight 10s linear infinite',
        'float-tr': 'floatToTopRight 6s linear infinite',
        'expand': 'expand 0.2s linear 1 forwards'
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
