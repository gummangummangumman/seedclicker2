import type { GameState } from '../types/gameState';

/**
 * Generate a consistent anti-cheat token based on game state.
 */
export function hash(gameState: GameState) {
	const normalizedCurrent = normalizeObject(gameState.current);
	const normalizedHarvested = normalizeObject(gameState.harvested);

	const jsonString = JSON.stringify(normalizedCurrent) + JSON.stringify(normalizedHarvested);

	return simpleHash(jsonString);
}

export function verifyGameSave(gameState: GameState): Boolean {
	return hash(gameState) == gameState.antiCheatToken;
}

/** Sort keys alphabetically  */
function normalizeObject(object: any): any {
	if (object === null || typeof object !== 'object') {
		return object;
	}

	if (Array.isArray(object)) {
		return object.map((item) => normalizeObject(item));
	}

	const sortedKeys = Object.keys(object).sort();
	const sortedObject: any = {};

	for (const key of sortedKeys) {
		sortedObject[key] = normalizeObject(object[key]);
	}

	return sortedObject;
}

function simpleHash(str: string): string {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return hash.toString();
}
