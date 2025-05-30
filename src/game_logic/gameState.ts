import { DailyChoice, type CurrentGameState, type DailyGameState, type HarvestedGameState } from '../types/gameState';
import { items } from '../types/item';
import { timestampSeconds } from '../util/save';

export const initialCurrentGameState: CurrentGameState = {
	clicks: 0,
	seeds: 0,
	peakLifetimeSeeds: 0,
	totalLifetimeSeeds: 0,
	items: items.map((item) => [item.name, 0]) as [string, number][],
	plantedCrops: [],
	cropsCollected: 0,
	clickPower: 1,
	seconds: 0,
	talents: [],
	lastTimeStampInSeconds: timestampSeconds(),
};

export const initialHarvestedGameState: HarvestedGameState = {
	harvestCount: 0,
	clicks: 0,
	seeds: 0,
	cropsCollected: 0,
	seconds: 0,
	talents: [],
};

export const initialDailyGameState: DailyGameState = {
	choice: DailyChoice.gumman,
	totalCollections: 0,
};
