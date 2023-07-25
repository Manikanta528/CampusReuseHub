/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage :{
        'background-pattern': 'linear-gradient(#fafafa 1.3px, transparent 1.3px),linear-gradient(to right, #fafafa 1.3px, #ffffff 1.3px)',
      },
      backgroundSize :{
        '26' : '26px 26px',
      }
    },
  },
  plugins: [],
}

