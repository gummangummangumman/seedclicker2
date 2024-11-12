import { Theme, type Settings } from '../types/settings';

/**
 * Sets the background-color on `:root` level.
 * Necessary because the `<html>` tag produced by the svelte app does not cover the entire screen.
 * @param theme theme from settings
 */
export function setBackground(theme: string = '') {
	let bg = '';
	switch (theme) {
		case Theme.Light:
			bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-light');
			break;
		case Theme.Dark:
			bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-dark');
			break;
		case Theme.System:
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

/**
 * @returns True if player has chosen dark mode OR if user uses system theming, and their system uses darkmode
 */
export function isDarkMode(settings: Settings): boolean {
	return (
		settings.theme == Theme.Dark ||
		(settings.theme == Theme.System && window.matchMedia('(prefers-color-scheme: dark)').matches)
	);
}
