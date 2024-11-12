import type { GameState } from '../types/gameState';
import { initialSettings, type Settings } from '../types/settings';
import { initialHarvestedGameState, initialCurrentGameState } from '../game_logic/gameState';

export const initialGameState: GameState = {
	current: structuredClone(initialCurrentGameState),
	harvested: structuredClone(initialHarvestedGameState),
};

// needs to be wrapped in a class, as exported values cannot be directly reassigned
export class Store {
	gameState = $state(structuredClone(initialGameState));
	settings = $state(structuredClone(initialSettings));
}
export const store: Store = new Store();

export function updateGameState(newGameState: GameState) {
	store.gameState = newGameState;
}

export function updateSettings(newSettings: Settings) {
	store.settings = newSettings;
}
