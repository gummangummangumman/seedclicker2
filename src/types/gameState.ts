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
}

export interface HarvestedGameState {
	harvestCount: number;
	clicks: number;
	seeds: number;
	seconds: number;
}

export function addSeeds(gameState: GameState, seeds: number): GameState {
	const newSeedAmount = gameState.current.seeds + seeds;
	return {
		...gameState,
		current: {
			...gameState.current,
			seeds: newSeedAmount,
			peakLifetimeSeeds: Math.max(gameState.current.peakLifetimeSeeds, newSeedAmount),
			totalLifetimeSeeds: gameState.current.totalLifetimeSeeds + seeds,
		},
	};
}
