import { store } from '../store/store.svelte';
import { DailyChoice } from './gameState';

export enum CropName {
	BabySunflower = 'Baby Sunflower',
	BananaTrees = 'Banana trees',
}

export interface Crop {
	name: CropName;
	growTime: number; // in seconds
	onCollect: () => void;
	requirement?: () => boolean;
}

/**
 * to be used in GameState.
 */
export interface PlantedCrop {
	name: CropName;
	plantedTime: number;
	finishTime: number;
}

export const crops: Crop[] = [
	{
		name: CropName.BabySunflower,
		growTime: 60 * 60 * 4,
		onCollect: () => {
			console.log('collected sunflowers, yay');
		},
	},
	{
		name: CropName.BananaTrees,
		growTime: 60 * 60 * 4,
		onCollect: () => {
			console.log('yummy bananas');
		},
		requirement: () => {
			return store.gameState.daily.choice == DailyChoice.pongo;
		},
	},
];
