/**
 * Sets the background-color on `:root` level.
 * Necessary because the `<html>` tag produced by the svelte app does not cover the entire screen.
 * @param theme theme from $settings
 */
export function setBackground(theme: string = '') {
	let bg = '';
	switch (theme) {
		case 'theme-light':
			bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-light');
			break;
		case 'theme-dark':
			bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-dark');
			break;
		case '':
		default:
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-dark');
			} else {
				bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-light');
			}
			break;
	}
	document.documentElement.style.setProperty('background-color', `rgb(${bg})`);
}
