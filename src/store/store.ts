import { writable, type Writable } from 'svelte/store';
import { items } from '../types/item';
import type { GameState } from '../types/gameState';

export const gameState: Writable<GameState> = writable({
	clicks: 0,
	seeds: 0,
	peakLifetimeSeeds: 0,
	totalLifetimeSeeds: 0,
	items: items.map((item) => [item.name, 0]),
	clickPower: 1,
});
