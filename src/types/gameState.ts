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
	plantedCrops: [string, number][]; //crop name, time planted
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
