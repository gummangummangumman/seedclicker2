import { writable, type Writable } from 'svelte/store';
import { items } from '../types/item';
import type { CurrentGameState, GameState } from '../types/gameState';
import { initialSettings, type Settings } from '../types/settings';
import { initialHarvestedGameState } from '../game_logic/gameState';

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
	harvested: structuredClone(initialHarvestedGameState),
};

export const gameState: Writable<GameState> = writable(structuredClone(initialGameState));

export const settings: Writable<Settings> = writable(structuredClone(initialSettings));
