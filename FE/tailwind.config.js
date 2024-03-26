/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    extend: {
      screens: {
        'ss': '1032px', // Define a custom screen size named 'custom' for 600px width
        'LeSS': { 'min': '0px', 'max': '1032px' },
      },
    },
  },
  plugins: [

  ],

}
