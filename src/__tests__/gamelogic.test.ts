import { describe, it, expect } from 'vitest';
import type { GameState } from '../types/gameState';
import { initialGameState } from '../store/store';
import { click, oneSecondPassing } from '../game_logic/gameLogic';

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
