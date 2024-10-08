import { describe, it, expect } from 'vitest';
import type { GameState } from '../types/gameState';
import { initialGameState } from '../store/store';
import { click, harvest_multiplier, oneSecondPassing } from '../game_logic/gameLogic';

describe('Harvest multiplier', () => {
	it('Anything up to 15k is 1', () => {
		expect(harvest_multiplier(0)).toBe(1);
		expect(harvest_multiplier(5_000)).toBe(1);
		expect(harvest_multiplier(15_000)).toBe(1);
	});
	it('30k should be 2', () => {
		expect(harvest_multiplier(30_000)).toBe(2);
	});
	it('120k should be 4', () => {
		expect(harvest_multiplier(120_000)).toBe(4);
	});
});

describe('Game with 2 garden hoes & 1 sprinkler, no talents and no multiplier', () => {
	const gameState: GameState = initialGameState;
	gameState.current.items[0][1] = 2;
	gameState.current.items[3][1] = 1;
	it('has 2 garden hoes and 1 sprinkler', () => {
		expect(gameState.current.items.find((i) => i[0] == 'Garden hoe')?.[1]).toBe(2);
		expect(gameState.current.items.find((i) => i[0] == 'Sprinkler')?.[1]).toBe(1);
	});
	it('Gives 3 seeds on click', () => {
		expect(click(gameState).current.seeds).toBe(3);
	});
	it('Gives 10 sps', () => {
		expect(oneSecondPassing(gameState).current.seeds).toBe(10);
	});
});
