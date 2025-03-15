import { store } from '../store/store.svelte';
import { crops, type Crop } from '../types/plantation';
import { timestampSeconds } from '../util/save';

export function amountOfPlantations() {
	return store.gameState.current.items[5][1];
}

export function canPlantCrops(): Boolean {
	return amountOfPlantations() > store.gameState.current.plantedCrops.length;
}

export function getCrop(cropName: string): Crop | undefined {
	return crops.find((crop) => crop.name == cropName);
}

export function plantCrops(crop: Crop) {
	if (!canPlantCrops()) {
		console.error('Could not plant more crops, no more empty plantations!');
		return;
	}
	store.gameState.current.plantedCrops.push([crop.name, timestampSeconds()]);
}

export function cancelCrop(index: number) {
	store.gameState.current.plantedCrops.splice(index, 1);
}

export function collectCrop(index: number) {
	const name = store.gameState.current.plantedCrops[index][0];
	const crop = getCrop(name);
	crop?.onCollect();
	store.gameState.current.plantedCrops.splice(index, 1);
}
