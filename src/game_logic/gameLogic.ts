import { store, updateGameState } from '../store/store.svelte';
import type { GameState } from '../types/gameState';
import { items } from '../types/item';
import { activeTalents } from '../types/talent';
import { HARVEST_BASE_SEEDS } from '../util/constants';

export function click() {
	const newGameState = {
		...store.gameState,
		current: {
			...store.gameState.current,
			clicks: store.gameState.current.clicks + 1,
		},
	};
	addSeeds(newGameState, total_clickpower());
}

export function total_sps(): number {
	const spsFromItems: number = store.gameState.current.items.reduce(
		(accumulator, amountOfCurrentItem, index) => accumulator + (items[index].sps ?? 0) * amountOfCurrentItem[1],
		0,
	);
	return activeTalents().reduce((sps, talent) => (sps = talent.spsEffect?.(sps) ?? sps), spsFromItems);
}

export function total_clickpower() {
	const clickpowerFromItems: number = store.gameState.current.items.reduce(
		(accumulator, amountOfCurrentItem, index) =>
			accumulator + (items[index].clickpower ?? 0) * amountOfCurrentItem[1],
		1,
	);
	return activeTalents().reduce(
		(clickpower, talent) => (clickpower = talent.clickEffect?.(clickpower) ?? clickpower),
		clickpowerFromItems,
	);
}

/**
 * Starts going from 1 at {@link HARVEST_BASE_SEEDS} and doubles for every 2x
 */
export function harvest_multiplier(harvestedSeeds: number) {
	return 1 + Math.log2(Math.max(1, harvestedSeeds / HARVEST_BASE_SEEDS));
}

export function oneSecondPassing() {
	const newGameState = {
		...store.gameState,
		current: {
			...store.gameState.current,
			seconds: store.gameState.current.seconds + 1,
		},
	};
	addSeeds(newGameState, total_sps());
}

/**
 * @param gameState new gameState to overwrite the old one. can be left null to use current gamestate
 * @param seeds seeds to add
 * @param applyMultiplier whether to use the harvest multiplier or not - default is true.
 */
export function addSeeds(gameState: GameState | null, seeds: number, applyMultiplier: boolean = true) {
	if (!gameState) {
		gameState = store.gameState;
	}
	seeds = applyMultiplier ? Math.floor(harvest_multiplier(gameState.harvested.seeds) * seeds) : seeds;
	const newSeedAmount = gameState.current.seeds + seeds;
	updateGameState({
		...gameState,
		current: {
			...gameState.current,
			seeds: newSeedAmount,
			peakLifetimeSeeds: Math.max(gameState.current.peakLifetimeSeeds, newSeedAmount),
			totalLifetimeSeeds: gameState.current.totalLifetimeSeeds + seeds,
		},
	});
}
