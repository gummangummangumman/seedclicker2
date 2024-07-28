import { writable, type Writable } from 'svelte/store';
import { items } from '../types/item';
import type { GameState } from '../types/gameState';

export const initialGameState = {
	clicks: 0,
	seeds: 0,
	peakLifetimeSeeds: 0,
	totalLifetimeSeeds: 0,
	items: items.map((item) => [item.name, 0]) as [string, number][],
	clickPower: 1,
	seconds: 0,
	talents: [],
};

export const gameState: Writable<GameState> = writable(structuredClone(initialGameState));
