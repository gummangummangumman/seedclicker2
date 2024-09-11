import type { GameState } from './gameState';

export interface Page {
	name: string;
	description?: string; //If the name is just an emoji, you can add a description
	component: any; //Svelte component
	requirement?: (gameState: GameState) => boolean;
}
