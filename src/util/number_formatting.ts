import { NumberFormatting } from '../types/settings';

interface siValue {
	value: number;
	symbol: string;
}
const si: siValue[] = [
	{ value: 1, symbol: '' },
	{ value: 1e3, symbol: ' k' },
	{ value: 1e6, symbol: ' million' },
	{ value: 1e9, symbol: ' billion' },
	{ value: 1e12, symbol: ' trillion' },
	{ value: 1e15, symbol: ' quadrillion' },
	{ value: 1e18, symbol: ' quintillion' },
	{ value: 1e21, symbol: ' sextillion' },
	{ value: 1e24, symbol: ' septillion' },
	{ value: 1e27, symbol: ' octillion' },
	{ value: 1e30, symbol: ' nonillion' },
	{ value: 1e30, symbol: ' decillion' },
	{ value: 1e36, symbol: ' undecillion' },
];
const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

/**
 * @returns number in a human readable format
 */
export function format(num: number, format: NumberFormatting, digits: number = 3) {
	let i;
	for (i = si.length - 1; i > 0; i--) {
		if (num >= si[i].value) {
			break;
		}
	}
	let symbol;
	switch (format) {
		case NumberFormatting.Engineering:
			if (num < 1e3) {
				symbol = '';
				break;
			}
			symbol = 'e' + Math.log10(si[i].value);
			break;
		case NumberFormatting.Normal:
		default:
			symbol = si[i].symbol;
			break;
	}
	return (num / si[i].value).toFixed(digits).replace(rx, '$1') + symbol;
}

/**
 * @returns hh:mm:ss
 */
export function formatSeconds(seconds: number) {
	if (seconds < 0) {
		return '00:00:00';
	}
	return `${Math.floor(seconds / 3600)
		.toString()
		.padStart(2, '0')}:${Math.floor((seconds % 3600) / 60)
		.toString()
		.padStart(2, '0')}:${Math.floor((seconds % 3600) % 60)
		.toString()
		.padStart(2, '0')}`;
}
