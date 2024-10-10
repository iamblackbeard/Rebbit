/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary' : '#FC7B03',
        'onPrimary' : '#fafafa',
        'secondary' : '#000000',
        'off-white' : '#fafafa'
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')  
  ],
};
