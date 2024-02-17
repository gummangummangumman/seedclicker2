/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#afa',
				'bg-dark': '#060',
			},
		},
	},
	plugins: [],
};
