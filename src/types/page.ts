import type { GameState } from './gameState';

export interface Page {
	name: string;
	component: any; //Svelte component
	requirement?: (gameState: GameState) => boolean;
}
