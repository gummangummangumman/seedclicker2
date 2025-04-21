import type { PlantedCrop } from './plantation';

export interface GameState {
	current: CurrentGameState;
	harvested: HarvestedGameState;
	daily: DailyGameState;
	antiCheatToken?: string;
}

export interface CurrentGameState {
	clicks: number;
	seeds: number;
	peakLifetimeSeeds: number;
	totalLifetimeSeeds: number;
	items: [string, number][]; //name, amount
	plantedCrops: [PlantedCrop]; //crop name, time planted, time when grown //TODO consider making a type PlantedCrop
	clickPower: number;
	seconds: number;
	talents: string[];
	lastTimeStampInSeconds: number;
}

export interface HarvestedGameState {
	harvestCount: number;
	clicks: number;
	seeds: number;
	seconds: number;
	talents: string[];
}

export interface DailyGameState {
	date?: string;
	choice: DailyChoice;
	totalCollections: number;
}

export enum DailyChoice {
	gumman = 'gumman',
	pongo = 'pongo',
	lorrison = 'lorrison',
}
