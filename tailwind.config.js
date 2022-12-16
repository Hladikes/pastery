module.exports = {
  mode: 'jit',
  purge: {
    content: ['./public/index.html', './src/**/*.svelte'],
    options: {
      defaultExtractor: content => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
        ...(content.match(/([a-zA-Z0-9\-]{1,})=/g) || []).map(s=>s.substr(0,s.length-1))
      ],
    }
  },
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
