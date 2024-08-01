import { writable, type Writable } from 'svelte/store';
import { items } from '../types/item';
import type { CurrentGameState, GameState } from '../types/gameState';

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

export const initialGameState: GameState = {
	current: structuredClone(initialCurrentGameState),
	harvested: {
		harvestCount: 0,
		clicks: 0,
		seeds: 0,
		seconds: 0,
	},
};

export const gameState: Writable<GameState> = writable(structuredClone(initialGameState));
