/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'var(--poppins-font)',
      },
      maxWidth: {
        container: 'calc(1216px + 64px)',
      },
      backgroundImage: {
        auth: 'url("https://source.unsplash.com/random/?house")',
        hero: 'url("/assets/imgs/house-bg-hero.png")',
        'house-linear':
          'linear-gradient(180deg, rgba(17, 24, 39, 0.00) 60.11%, rgba(17, 24, 39, 0.50) 100%);',
      },
      boxShadow: {
        'button-primary': '0px 0px 0px 1px #3730a3',
        'button-secondary': '0px 0px 0px 1px #CBD5E1',
      },
      gridTemplateColumns: {
        testimonials: 'repeat(3,1080px)',
      },
    },
  },
  plugins: [],
}
