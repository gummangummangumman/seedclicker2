import type { GameState } from './gameState';

export class Requirement {
	requirementToShowOutline: number; //peak lifetime seeds
	requirementToBuy: string | number; //peak lifetime seeds OR item bought

	constructor(requirementToShowOutline: number, requirementToBuy: string | number) {
		this.requirementToShowOutline = requirementToShowOutline;
		this.requirementToBuy = requirementToBuy;
	}

	shouldHideFully(gameState: GameState) {
		return this.requirementToShowOutline > gameState.current.peakLifetimeSeeds;
	}

	shouldOnlyShowOutline(gameState: GameState) {
		if (typeof this.requirementToBuy == 'number') {
			return this.requirementToBuy > gameState.current.peakLifetimeSeeds;
		}
		const item = gameState.current.items.find((i) => i?.[0] == this.requirementToBuy);
		if (!item) {
			return false;
		}
		return item[1] == 0;
	}
}
