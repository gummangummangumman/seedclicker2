import { store } from '../store/store.svelte';
import { DailyChoice } from './gameState';

export interface Crop {
	name: string;
	growTime: number; // in seconds
	onCollect: () => void;
	requirement?: () => boolean;
}

export const crops: Crop[] = [
	{
		name: 'Baby Sunflowers',
		growTime: 60 * 60 * 4,
		onCollect: () => {
			console.log('collected sunflowers, yay');
		},
	},
	{
		name: 'Banana trees',
		growTime: 60 * 60 * 4,
		onCollect: () => {
			console.log('yummy bananas');
		},
		requirement: () => {
			return store.gameState.daily.choice == DailyChoice.pongo;
		},
	},
];
