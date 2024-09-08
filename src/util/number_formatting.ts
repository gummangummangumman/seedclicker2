export function format(num: number, digits: number = 3) {
	const si = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: ' k' },
		{ value: 1e6, symbol: ' million' },
		{ value: 1e9, symbol: ' billion' },
		{ value: 1e12, symbol: ' trillion' },
		{ value: 1e15, symbol: ' quadrillion' },
		{ value: 1e18, symbol: ' quintillion' },
		{ value: 1e21, symbol: ' sextillion' },
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	let i;
	for (i = si.length - 1; i > 0; i--) {
		if (num >= si[i].value) {
			break;
		}
	}
	return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

/**
 * hh:mm:ss
 */
export function formatSeconds(seconds: number) {
	return `${Math.floor(seconds / 3600)
		.toString()
		.padStart(2, '0')}:${Math.floor((seconds % 3600) / 60)
		.toString()
		.padStart(2, '0')}:${Math.floor((seconds % 3600) % 60)
		.toString()
		.padStart(2, '0')}`;
}
