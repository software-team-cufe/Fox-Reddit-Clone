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
        'ss': { 'min': '901.6px', 'max': '1280px' }, // Define a custom screen size named 'custom' for 600px width
        'LeSS': { 'min': '0px', 'max': '902px' },
        //'smo' : { 'min': '767px', 'max': '1280px' },
      },
    },
  },
  plugins: [

  ],
}