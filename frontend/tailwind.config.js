/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        op: {
          '0%': { opacity: '0' },
          '10%': { opacity: '0.1' },
          '20%': { opacity: '0.2' },
          '30%': { opacity: '0.3' },
          '40%': { opacity: '0.4' },
          '50%': { opacity: '0.5' },
          '60%': { opacity: '0.6' },
          '70%': { opacity: '0.7' },
          '80%': { opacity: '0.8' },
          '90%': { opacity: '0.9' },
          '100%': { opacity: '1.0' },
        },
      },
      animation: {
        opac: 'op 2s linear',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),
  ],
}