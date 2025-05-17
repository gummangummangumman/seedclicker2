import { store } from '../store/store.svelte';
import { crops, type Crop } from '../types/plantation';
import { activeTalents } from '../types/talent';
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

/**
 * With talents applied
 */
export function getGrowTime(crop: Crop): number {
	return activeTalents().reduce(
		(growTime, talent) => (growTime = talent.cropTimeEffect?.(growTime, crop) ?? growTime),
		crop.growTime,
	);
}

export function plantCrops(crop: Crop) {
	if (!canPlantCrops()) {
		console.error('Could not plant more crops, no more empty plantations!');
		return;
	}
	const currentTime = timestampSeconds();
	store.gameState.current.plantedCrops.push({
		name: crop.name,
		plantedTime: currentTime,
		finishTime: currentTime + getGrowTime(crop),
	});
}

export function cancelCrop(index: number) {
	store.gameState.current.plantedCrops.splice(index, 1);
}

export function collectCrop(index: number) {
	const plantedCrop = store.gameState.current.plantedCrops[index];
	if (plantedCrop.finishTime > timestampSeconds()) {
		console.warn('Can not collect crop before finish time: ' + plantedCrop.finishTime);
		return;
	}
	const name = plantedCrop.name;
	const crop = getCrop(name);
	crop?.onCollect();
	store.gameState.current.plantedCrops.splice(index, 1);
}
