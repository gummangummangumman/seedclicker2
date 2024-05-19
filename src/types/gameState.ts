import { items } from './item';

export interface GameState {
	clicks: number;
	seeds: number;
	items: number[];
}

export const gameState: GameState = {
	clicks: 0,
	seeds: 0,
	items: Array(items.length).fill(0),
};
