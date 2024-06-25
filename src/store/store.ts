import { writable, type Writable } from 'svelte/store';
import { items } from '../types/item';
import type { GameState } from '../types/gameState';

export const gameState: Writable<GameState> = writable({
	clicks: 0,
	seeds: 0,
	items: Array(items.length).fill(0),
});
