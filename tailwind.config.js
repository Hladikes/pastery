module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#292b2b',
        'primary-dark': '#181a1a',
        'accent': '#65c2b2',
        'secondary': '#959595'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
