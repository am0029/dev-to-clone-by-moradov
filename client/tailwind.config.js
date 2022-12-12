module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        white: 'rgb(255, 252, 252)',
        blue: 'rgb(59, 73, 223)',
        'light-blue': 'rgb(226, 227, 243)',
        'lightest-gray': 'rgb(229, 229, 229)',
        'lighter-gray': 'rgb(245, 245, 245)',
        'light-gray': 'rgb(189, 189, 189)',
        gray: 'rgb(163, 163, 163)',
        'dark-gray': `rgb(73, 73, 73)`,
        'darker-gray': 'rgb(82, 82, 82)',
        black: 'rgb(23, 23, 23)',
        red: 'rgb(220, 38, 38)',
        'heart-bg': 'rgb(243, 224, 224)',
        'heart-text': 'rgb(220, 38, 38)',
        'unicorn-bg': 'rgb(220, 235, 231)',
        'unicorn-text': 'rgb(5, 150, 105)',
        'bookmark-bg': 'rgb(228, 227, 244)',
        'bookmark-text': 'rgb(116, 108, 233)',
      },
      maxWidth: {
        pg: '1280px',
        search: '800px',
      },
      spacing: {
        sm: '1rem',
        md: '2.25rem',
        lg: '3.5rem',
        xl: '10rem',
        pg: '2rem',
      },
      screens: {
        lap: { max: '1024px' },
        mob: { max: '768px' },
        sm: { max: '468px' },
      },
      fontFamily: { default: 'sans-serif' },
      fontSize: { default: '16px' },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),

  ],
};