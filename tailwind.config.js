/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blackPrimary: '#13161C',
        blackSecundary: '#1E2229',
        blackNoir: '#0C0C0C',
        greyFocus: '#2D323A',
        auxGrey: '#a1a1aa',
        
      },
      boxShadow: {
        'border-inset': 'inset 0 0 0 2px #000',
      },
    },
  },
  plugins: [],
}
