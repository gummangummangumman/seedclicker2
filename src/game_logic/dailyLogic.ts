import { store } from '../store/store.svelte';
import { DailyChoice } from '../types/gameState';
import { addSeeds } from './gameLogic';

/**
 * Awards you seeds for the daily reward
 *
 * @returns the amount of seeds rewarded
 */
export function collectDaily(date: Date, treasure: DailyChoice): number {
	const totalSeeds = store.gameState.current.seeds + store.gameState.harvested.seeds;
	const rewarded = Math.floor(totalSeeds * 0.1); //10% of total seeds ever
	addSeeds(
		{
			...store.gameState,
			daily: {
				date: date.toDateString(),
				choice: treasure,
			},
		},
		rewarded,
		false,
	);
	return rewarded;
}

/**
 * @returns name of currency to show for players
 */
export function getCurrencyName(): string {
	switch (store.gameState.daily.choice) {
		case DailyChoice.lorrison:
			return 'Karma';
		case DailyChoice.pongo:
			return 'Bananas';
		case DailyChoice.gumman:
		default:
			return 'Seeds';
	}
}

/**
 * @returns short version of Sps
 */
export function getSpsName(): string {
	switch (store.gameState.daily.choice) {
		case DailyChoice.lorrison:
			return 'Kps';
		case DailyChoice.pongo:
			return 'Bps';
		case DailyChoice.gumman:
		default:
			return 'Sps';
	}
}

/**
 * @returns long version - like Seeds per second
 */
export function getLongSpsName(): string {
	switch (store.gameState.daily.choice) {
		case DailyChoice.lorrison:
			return 'Karma per second';
		case DailyChoice.pongo:
			return 'Bananas per second';
		case DailyChoice.gumman:
		default:
			return 'Seeds per second';
	}
}
