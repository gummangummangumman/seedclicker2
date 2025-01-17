import type { GameState } from '../types/gameState';

export function getSave(gameState: GameState): string {
	const save = JSON.stringify({ ...gameState, antiCheatToken: hash(gameState) });
	return encode(save);
}

export function loadSave(loadText: string): GameState {
	let save: GameState;
	try {
		const decoded = decode(loadText);
		save = JSON.parse(decoded);
	} catch (e) {
		throw '⚠️ Something went wrong trying to read the save! ⚠️';
	}

	console.log('loading save', save);
	//TODO first verify that save is a proper GameState object, so that the cheating errorMessage is justifiably given
	if (!verifyGameSave(save)) {
		throw '💀 Cheating detected! 💀';
	}

	return save;
}

function encode(save: string): string {
	const encoder = new TextEncoder();
	return btoa(String.fromCharCode(...encoder.encode(save)));
}

function decode(save: string): string {
	const decoded = atob(save);
	const decoder = new TextDecoder();
	const uintArray = new Uint8Array([...decoded].map((char) => char.charCodeAt(0)));
	return decoder.decode(uintArray);
}

/**
 * Generate a consistent anti-cheat token based on game state.
 */
function hash(gameState: GameState) {
	const normalizedCurrent = normalizeObject(gameState.current);
	const normalizedHarvested = normalizeObject(gameState.harvested);

	const jsonString = JSON.stringify(normalizedCurrent) + JSON.stringify(normalizedHarvested);

	return simpleHash(jsonString);
}

function verifyGameSave(gameState: GameState): Boolean {
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

/**
 * Date.now() with seconds instead of ms
 */
export function timestampSeconds() {
	return Math.floor(Date.now() / 1000);
}
