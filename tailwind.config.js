/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: 'rgba(var(--bg))',
				primary: 'rgba(var(--primary))',
				secondary: 'rgba(var(--secondary))',
				text: 'rgba(var(--text))',
			},
			textColor: {
				DEFAULT: 'rgba(var(--text))',
			},
		},
	},
	plugins: [],
};
