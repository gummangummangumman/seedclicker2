import type { CurrentGameState, HarvestedGameState } from '../types/gameState';
import { items } from '../types/item';

export const initialCurrentGameState: CurrentGameState = {
	clicks: 0,
	seeds: 0,
	peakLifetimeSeeds: 0,
	totalLifetimeSeeds: 0,
	items: items.map((item) => [item.name, 0]) as [string, number][],
	clickPower: 1,
	seconds: 0,
	talents: [],
};

export const initialHarvestedGameState: HarvestedGameState = {
	harvestCount: 0,
	clicks: 0,
	seeds: 0,
	seconds: 0,
	talents: [],
};
