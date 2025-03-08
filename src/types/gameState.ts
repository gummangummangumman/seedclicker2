export interface GameState {
	current: CurrentGameState;
	harvested: HarvestedGameState;
	lastCollectedDaily: LastCollectedDaily;
	antiCheatToken?: string;
}

export interface CurrentGameState {
	clicks: number;
	seeds: number;
	peakLifetimeSeeds: number;
	totalLifetimeSeeds: number;
	items: [string, number][]; //name, amount
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

export interface LastCollectedDaily {
	date?: string;
	choice: DailyChoice;
}

export enum DailyChoice {
	gumman = 'gumman',
	pongo = 'pongo',
	lorrison = 'lorrison',
}
