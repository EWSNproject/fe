// tailwind.config.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          50: '#ffffff',
          100: '#EBEBF1',
          200: '#D9D9D9',
          300: '#BFBFBF',
          400: '#767676',
          500: '#505050',
          600: '#3c3c3c',
          700: '#2E2E2E',
          800: '#1F1F1F',
          900: '#191919',
          950: '#000000',
        },
        gray: {
          50: '#FCFCFD',
          100: '#F1F3F6',
          200: '#E0E4EA',
          300: '#C8CED9',
          400: '#A8B3C4',
          500: '#8292AA',
          600: '#5B6B86',
          700: '#384252',
          800: '#242B35',
          900: '#191D24',
          950: '#15181E',
        },
        yellow: {
          50: '#FFFEFC',
          100: '#FFFDF4',
          200: '#FFFAE7',
          300: '#FFF7D5',
          400: '#FFF2BD',
          500: '#FFECA0',
          600: '#FFE57E',
          700: '#FFDE59',
          800: '#E0B300',
          900: '#534300',
          950: '#332900',
        },
        error: '#D6173A',
        tag: {
          red: '#DA5D3F',
          orange: '#F4992A',
          green: '#55BC8A',
          blue: '#529FCD',
          purple: '#A67DC1',
        },
        'tag-bg-orange': '#FFF6EB',
        'tag-bg-green': '#E4FFF2',
        'tag-bg-blue': '#DCF2FF',
        'tag-bg-checkorange': '#FFD8A8',
        'tag-bg-checkgreen': '#97F0C3',
        'tag-bg-checkblue': '#8DD4FF',
      },
      screens: {
        md: { min: '360px', max: '743px' },
        lg: { min: '360px', max: '1280px' },
        desktop: '1281px',
      },
    }
  },
  plugins: [],
};
