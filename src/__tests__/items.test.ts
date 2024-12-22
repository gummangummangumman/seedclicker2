import { describe, it, expect } from 'vitest';
import { initialGameState, store, updateGameState } from '../store/store.svelte';
import { buyItem, buyMaxOfItem } from '../game_logic/itemLogic';
import { addSeeds, click, oneSecondPassing } from '../game_logic/gameLogic';

describe("Can't buy items with no seeds", () => {
	it('No seeds granted after failing to buy single water can', () => {
		updateGameState(structuredClone(initialGameState));
		buyItem(1);
		oneSecondPassing();
		expect(store.gameState.current.seeds).toBe(0); //no seeds granted
	});
	it('No seeds granted after failing to buy max water cans', () => {
		updateGameState(structuredClone(initialGameState));
		buyMaxOfItem(1);
		oneSecondPassing();
		expect(store.gameState.current.seeds).toBe(0); //no seeds granted
	});
});

describe('Buying single items', () => {
	it('Three garden hoes with 200 seeds', () => {
		updateGameState(structuredClone(initialGameState));
		addSeeds(null, 200);
		buyItem(0); //-10 = 190
		buyItem(0); //-12 = 178
		buyItem(0); //-14 = 164
		click(); // +4 = 168
		expect(store.gameState.current.seeds).toBe(168);
	});

	it('Three sprinklers with 5 000 seeds', () => {
		updateGameState(structuredClone(initialGameState));
		addSeeds(null, 5_000);
		buyItem(3); //-1300 = 3700
		buyItem(3); //-1560 = 2140
		buyItem(3); //-1872 = 268
		buyItem(3); // -0 = 268. (Can not afford)
		expect(store.gameState.current.seeds).toBe(268);
		oneSecondPassing(); // +30 = 278
		expect(store.gameState.current.seeds).toBe(298);
	});
});

describe('Buying max item', () => {
	it('Max buying garden hoes with 60 seeds', () => {
		updateGameState(structuredClone(initialGameState));
		addSeeds(null, 60);
		buyMaxOfItem(0);
		// 60 - 10 - 12 - 14 - 17 = 7
		expect(store.gameState.current.items[0][1]).toBe(4);
		expect(store.gameState.current.seeds).toBe(7);
	});
	it('Single garden hoes with 60 seeds', () => {
		updateGameState(structuredClone(initialGameState));
		addSeeds(null, 60);
		buyItem(0); //-10 = 50
		buyItem(0); //-12 = 38
		buyItem(0); //-14 = 24
		buyItem(0); //-17 = 7
		expect(store.gameState.current.items[0][1]).toBe(4);
		expect(store.gameState.current.seeds).toBe(7);
	});
});
