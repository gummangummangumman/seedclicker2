import { describe, it, expect } from 'vitest';
import { format, formatSeconds } from '../util/number_formatting';
import { NumberFormatting } from '../types/settings';

describe('Normal formatting', () => {
	const nf = NumberFormatting.Normal;
	it('<1k is shown normally', () => {
		expect(format(1, nf)).toBe('1');
		expect(format(123, nf)).toBe('123');
	});
	it('big round numbers are shown correctly', () => {
		expect(format(1e6, nf)).toBe('1 million');
		expect(format(1e12, nf)).toBe('1 trillion');
		expect(format(1e21, nf)).toBe('1 sextillion');
		expect(format(2e14, nf)).toBe('200 trillion');
	});
	it('all big numbers are shown correctly', () => {
		expect(format(463286432874682, nf)).toBe('463.286 trillion');
		expect(format(83249873295793276329678239, nf)).toBe('83.25 septillion');
	});
});

describe('Engineering formatting', () => {
	const nf = NumberFormatting.Engineering;
	it('<1k is shown normally', () => {
		expect(format(1, nf)).toBe('1');
		expect(format(123, nf)).toBe('123');
	});
	it('big round numbers are shown correctly', () => {
		expect(format(1e6, nf)).toBe('1e6');
		expect(format(1e12, nf)).toBe('1e12');
		expect(format(1e21, nf)).toBe('1e21');
		expect(format(2e14, nf)).toBe('200e12');
	});
	it('all big numbers are shown correctly', () => {
		expect(format(463286432874682, nf)).toBe('463.286e12');
		expect(format(83249873295793276329678239, nf)).toBe('83.25e24');
	});
});

describe('time formatting', () => {
	it('a few seconds are shown normally', () => {
		expect(formatSeconds(5)).toBe('00:00:05');
	});
	it('hours minutes seconds', () => {
		expect(formatSeconds(11 * 60 * 60 + 18 * 60 + 34)).toBe('11:18:34');
	});
	it('850 hours+', () => {
		expect(formatSeconds(850 * 60 * 60 + 18 * 60 + 34)).toBe('850:18:34');
	});
});
