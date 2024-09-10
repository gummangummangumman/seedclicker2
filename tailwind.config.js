/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#afa',
				primary: '#8f8',
				secondary: '#060',
				//TODO consider darkmode colours
				bgdark: '#060',
				primarydark: '#060',
				secondarydark: '#060',
			},
		},
	},
	plugins: [],
};
