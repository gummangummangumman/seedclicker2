import { initialGameState } from '../store/store.svelte';
import type { GameState } from '../types/gameState';
import { initialSettings, type Settings } from '../types/settings';

const LOCALSTORAGE_GAME_NAME = 'save';
const LOCALSTORAGE_SETTINGS_NAME = 'settings';

export function saveGameToLocalStorage(gameState: GameState) {
	if (typeof window === 'undefined') {
		return;
	}
	localStorage.setItem(LOCALSTORAGE_GAME_NAME, JSON.stringify(gameState));
}

export function loadGameFromLocalStorage(): GameState {
	if (typeof window === 'undefined') {
		return initialGameState;
	}
	const save = localStorage.getItem(LOCALSTORAGE_GAME_NAME);
	if (save == null) {
		return initialGameState;
	}
	return JSON.parse(save!);
}

export function saveSettingsToLocationStorage(settings: Settings) {
	if (typeof window === 'undefined') {
		return;
	}
	localStorage.setItem(LOCALSTORAGE_SETTINGS_NAME, JSON.stringify(settings));
}

export function loadSettingsFromLocalStorage(): Settings {
	if (typeof window === 'undefined') {
		return initialSettings;
	}
	const settings = localStorage.getItem(LOCALSTORAGE_SETTINGS_NAME);
	if (settings == null) {
		return initialSettings;
	}
	return JSON.parse(settings!);
}
