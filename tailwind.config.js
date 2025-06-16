/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'instagram-gradient': 'linear-gradient(135deg, #833ab4 10%, #fd1d1d 50%, #fcb045 90%)',
        'instagram-gradient-alt': 'linear-gradient(135deg, #8a3ab9 0%, #e95950 35%, #fccc63 100%)',
      }
    },
  },
  plugins: [],
}
