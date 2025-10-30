/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ this scans all React files in src/
  ],
  theme: {
    extend: {
      fontFamily: {
        montreal: ['"Neue Montreal"', 'sans-serif'],
      },
    },
  
  plugins: [],
  }
}
