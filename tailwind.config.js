// const colors = require('tailwindcss/colors')

// yg cms biru cnbc
// yg admin kemerah

const setting = {
  content: ['*/pages/**/*.{js,ts,jsx,tsx}', '*/components/**/*.{js,ts,jsx,tsx}'],
  // purge: [],
  // darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#2b58bd",
          secondary: "#1f2945",
          darkSecondary: '#1b2239'
        }
      },
      backgroundColor:{
        redDashboard: '#ad3c34',
        grayDashboard: '#EDEDED',
        greenDashboard: '#568850',
        blackDashboard: '#23282D',
        blueDashboard: '#366bbe',
        writeArticlebg: '##fafafa'
      },
      textColor: {
        whiteText: '#FFFAFA',
        redDashboard: '#ad3c34',
        greenDashboard: '#568850',
        blackDashboard: '#23282D',
        blueDashboard: '#366bbe'
      },
      borderColor:{
        redDashboard: '#ad3c34',
        greenDashboard: '#568850',
        blackDashboard: '#23282D',
        blueDashboard: '#366bbe'
      },
      fontSize: {
        'vs': '.60rem',
      },
      
      screens: {
        mobile: '320px',
        tablet: '630px',
        laptop: '1024px',
        desktop: '1280px',
      },
      container: {
        center: true,
      },
      height: {
        eight: '80vh',
        seven: '70vh',
        six: '60vh',
        five: '50vh',
        four: '40vh',
        tri: '30vh',
        100: '30rem',
      },
      boxShadow: {
        flat: '2px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms')({
    //   strategy: 'class',
    // }),
  ],
}

module.exports = setting
