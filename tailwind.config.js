/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Isso substituirá a fonte sans-serif padrão
      },
      colors:{
        primary:'#0CA7FF',
        primary2:"#696969",
        secondary:'ebf7ff'
      }
    },
  },
  plugins: [],
}

