import { initialGameState } from '../store/store';
import type { GameState } from '../types/gameState';

export function saveToLocalStorage(gameState: GameState) {
	if (typeof window === 'undefined') {
		return;
	}
	localStorage.setItem('save', JSON.stringify(gameState));
}

export function loadFromLocalStorage(): GameState {
	if (typeof window === 'undefined') {
		return initialGameState;
	}
	const save = localStorage.getItem('save');
	if (save == null) {
		return initialGameState;
	}
	return JSON.parse(save!);
}
