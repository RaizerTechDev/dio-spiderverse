/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    backgroundImage: {
      'hero-pattern': 'linear-gradient(#0069e3,#0056ba)'
    },
    extend: {
      maxWidth: {
        'hero': '1920px',
      },
      objectPosition: {
        'center-right': 'center right',
      },
      screens: {
        'hero-screen': '1920px'
      }
    },
  },
  plugins: [],
}
