/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {
          colors: {
            primary: '#87CEEB',
            secondary: '#F0F8FF',
            accent: '#1E90FF',
          },
        },
      },
      plugins: [],
    }
