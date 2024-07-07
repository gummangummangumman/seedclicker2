export interface GameState {
	clicks: number;
	seeds: number;
	peakLifetimeSeeds: number;
	totalLifetimeSeeds: number;
	items: [string, number][]; //name, amount
	clickPower: number;
	seconds: number;
}

export function addSeeds(gameState: GameState, seeds: number): GameState {
	const newSeedAmount = gameState.seeds + seeds;
	return {
		...gameState,
		seeds: newSeedAmount,
		peakLifetimeSeeds: Math.max(gameState.peakLifetimeSeeds, newSeedAmount),
		totalLifetimeSeeds: gameState.totalLifetimeSeeds + seeds,
	};
}
