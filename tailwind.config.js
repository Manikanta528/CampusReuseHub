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
        'background-pattern-1': 'radial-gradient(#444cf7 1px, #ffffff 0.5px)',
      },
      backgroundSize :{
        '26' : '26px 26px',
      },
      animation: {
        border: 'border 1s ease infinite',
        'infinite-scroll': 'infinite-scroll 50s linear infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
      }
      },
    },
  },
  plugins: [],
}

