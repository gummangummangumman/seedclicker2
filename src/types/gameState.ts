export interface GameState {
	current: CurrentGameState;
	harvested: HarvestedGameState;
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
