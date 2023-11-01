/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '630px': '630px',
      },
      extend: {
        translate: {
          'right-50': '50px',
          top: {
            "100%": "100%"
          }
        },
      },
      plugins: [],
    }
  }
}