import { initialGameState } from '../store/store.svelte';
import type { GameState } from '../types/gameState';
import { initialSettings, type Settings } from '../types/settings';
import { getSave, loadSave } from '../util/save';

const LOCALSTORAGE_GAME_NAME = 'save';
const LOCALSTORAGE_SETTINGS_NAME = 'settings';

export function saveGameToLocalStorage(gameState: GameState) {
	if (typeof window === 'undefined') {
		return;
	}
	const save = getSave(gameState);
	localStorage.setItem(LOCALSTORAGE_GAME_NAME, save);
}

export function loadGameFromLocalStorage(): GameState {
	if (typeof window === 'undefined') {
		return initialGameState;
	}
	const save = localStorage.getItem(LOCALSTORAGE_GAME_NAME);
	if (save == null) {
		return initialGameState;
	}
	try {
		const gameState = loadSave(save);
		return gameState;
	} catch (e: any) {
		console.error('Could not load save from browser');
		console.error(e);
		return initialGameState;
	}
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
	try {
		return JSON.parse(settings!);
	} catch (e: any) {
		return initialSettings;
	}
}
