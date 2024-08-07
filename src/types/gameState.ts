import { items } from './item';
import { activeTalents } from './talent';

export interface GameState {
	current: CurrentGameState;
	harvested: HarvestedGameState;
	antiCheatToken?: string;
}

export interface CurrentGameState {
	clicks: number;
	seeds: number;
	peakLifetimeSeeds: number;
	totalLifetimeSeeds: number;
	items: [string, number][]; //name, amount
	clickPower: number;
	seconds: number;
	talents: string[];
}

export interface HarvestedGameState {
	harvestCount: number;
	clicks: number;
	seeds: number;
	seconds: number;
}

/* --------- Game logic below this line --------- */

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

export function addSeeds(gameState: GameState, seeds: number): GameState {
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
