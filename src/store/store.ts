import { writable, type Writable } from 'svelte/store';
import type { GameState } from '../types/gameState';
import { initialCurrentGameState, initialHarvestedGameState } from '../game_logic/gameState';

export const initialGameState: GameState = {
	current: structuredClone(initialCurrentGameState),
	harvested: structuredClone(initialHarvestedGameState),
};

export const gameState: Writable<GameState> = writable(structuredClone(initialGameState));

export const settings: Writable<string> = writable('');
