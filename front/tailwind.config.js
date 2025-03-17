/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#001C4D",
        brightYellow :"#FFCD0A",
        goodBlue: "#1A6CFF",
      }
    },
  },
  plugins: [],
}