import type { GameState } from '../types/gameState';
import { items } from '../types/item';
import { activeTalents } from '../types/talent';
import { HARVEST_BASE_SEEDS } from '../util/constants';

export function click(gameState: GameState): GameState {
	const newGameState = {
		...gameState,
		current: {
			...gameState.current,
			clicks: gameState.current.clicks + 1,
		},
	};
	return addSeeds(newGameState, total_clickpower(gameState));
}

export function total_sps(gameState: GameState) {
	const spsFromItems: number = gameState.current.items.reduce(
		(accumulator, amountOfCurrentItem, index) => accumulator + (items[index].sps ?? 0) * amountOfCurrentItem[1],
		0,
	);
	return activeTalents(gameState).reduce((sps, talent) => (sps = talent.spsEffect?.(sps) ?? sps), spsFromItems);
}

export function total_clickpower(gameState: GameState) {
	const clickpowerFromItems: number = gameState.current.items.reduce(
		(accumulator, amountOfCurrentItem, index) =>
			accumulator + (items[index].clickpower ?? 0) * amountOfCurrentItem[1],
		1,
	);
	return activeTalents(gameState).reduce(
		(clickpower, talent) => (clickpower = talent.clickEffect?.(clickpower) ?? clickpower),
		clickpowerFromItems,
	);
}

/**
 * Starts going from 1 at {@link HARVEST_BASE_SEEDS} and doubles for every 10x
 */
export function harvest_multiplier(harvestedSeeds: number) {
	return 1 + Math.log10(Math.max(1, harvestedSeeds / HARVEST_BASE_SEEDS));
}

export function oneSecondPassing(gameState: GameState): GameState {
	const newGameState = {
		...gameState,
		current: {
			...gameState.current,
			seconds: gameState.current.seconds + 1,
		},
	};
	return addSeeds(newGameState, total_sps(gameState));
}

export function addSeeds(gameState: GameState, seeds: number, applyMultiplier: boolean = true): GameState {
	seeds = applyMultiplier ? Math.floor(harvest_multiplier(gameState.harvested.seeds) * seeds) : seeds;
	const newSeedAmount = gameState.current.seeds + seeds;
	return {
		...gameState,
		current: {
			...gameState.current,
			seeds: newSeedAmount,
			peakLifetimeSeeds: Math.max(gameState.current.peakLifetimeSeeds, newSeedAmount),
			totalLifetimeSeeds: gameState.current.totalLifetimeSeeds + seeds,
		},
	};
}
