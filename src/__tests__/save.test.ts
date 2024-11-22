import { describe, it, expect } from 'vitest';
import { initialGameState } from '../store/store.svelte';
import { getSave, loadSave } from '../util/save';
import type { GameState } from '../types/gameState';

describe('Saving and loading', () => {
	it('Saved string is unreadable', () => {
		const saveString = getSave(initialGameState);
		expect(saveString.includes('clicks')).toBe(false);
		expect(saveString.includes('seeds')).toBe(false);
		expect(saveString.includes('items')).toBe(false);
	});
	it('Saved and loaded game is a valid gameState object', () => {
		const saveString = getSave(initialGameState);
		const loadedGame = loadSave(saveString);
		expect(loadedGame.current.seeds).toBe(0);
		expect(loadedGame.current.seconds).toBe(0);
		expect(loadedGame.harvested.seeds).toBe(0);
	});
	it('Saved and loaded has an anti-cheat token', () => {
		const saveString = getSave(initialGameState);
		const loadedGame = loadSave(saveString);
		expect(loadedGame.antiCheatToken).toBeTruthy();
	});
});

describe('Anti-cheat', () => {
	it('Saved and loaded has an anti-cheat token', () => {
		const saveString = getSave(initialGameState);
		const loadedGame = loadSave(saveString);
		expect(loadedGame.antiCheatToken).toBeTruthy();
	});
	it('Randomly tampered with file throws error', () => {
		const saveString = getSave(initialGameState);
		const tamperedWithSaveString = saveString.replace('a', 'b');
		expect(() => loadSave(tamperedWithSaveString)).toThrowError();
	});
	it('Decoded save string which is cheated and encoded throws an error', () => {
		const saveString = getSave(initialGameState);

		let decoded = atob(saveString);
		const decoder = new TextDecoder();
		const uintArray = new Uint8Array([...decoded].map((char) => char.charCodeAt(0)));
		decoded = decoder.decode(uintArray);
		const cheatJson = decoded.replace('"seeds":0', '"seeds":123');

		// verifying cheat attempt
		const cheatGameState = JSON.parse(cheatJson) as GameState;
		expect(cheatGameState.current.seeds).toBe(123);

		// cheated json throws an error
		const encoder = new TextEncoder();
		const encodedCheatJson = btoa(String.fromCharCode(...encoder.encode(cheatJson)));
		expect(() => loadSave(encodedCheatJson)).toThrowError();

		// valid json does get loaded with this method
		const encodedValidJson = btoa(String.fromCharCode(...encoder.encode(decoded)));
		expect(loadSave(encodedValidJson).current.seeds).toBe(0);
	});
});
