import type { GameState } from '../types/gameState';
import { items } from '../types/item';
import { activeTalents } from '../types/talent';

export function click(gameState: GameState): GameState {
	const newGameState = {
		...gameState,
		current: {
			...gameState.current,
			clicks: gameState.current.clicks + 1,
		},
	};
	const effectiveClickPower: number = activeTalents(gameState).reduce(
		(clickPower, talent) => (clickPower = talent.clickEffect?.(clickPower) ?? clickPower),
		gameState.current.clickPower,
	);
	return addSeeds(newGameState, effectiveClickPower);
}

export function total_sps(gameState: GameState) {
	const spsFromItems: number = gameState.current.items.reduce(
		(accumulator, amountOfCurrentItem, index) => accumulator + items[index].sps * amountOfCurrentItem[1],
		0,
	);
	return activeTalents(gameState).reduce((sps, talent) => (sps = talent.spsEffect?.(sps) ?? sps), spsFromItems);
}

export function harvest_multiplier(harvestedSeeds: number) {
	return 1 + Math.log(Math.max(1, harvestedSeeds));
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
