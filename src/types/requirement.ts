import type { GameState } from './gameState';

export class Requirement {
	requirementToShowOutline: number; //peak lifetime seeds
	requirementToBuy: string | number; //peak lifetime seeds OR item bought

	constructor(requirementToShowOutline: number, requirementToBuy: string | number) {
		this.requirementToShowOutline = requirementToShowOutline;
		this.requirementToBuy = requirementToBuy;
	}

	shouldHideFully(gameState: GameState) {
		return this.requirementToShowOutline > gameState.peakLifetimeSeeds;
	}

	shouldOnlyShowOutline(gameState: GameState) {
		if (typeof this.requirementToBuy == 'number') {
			return this.requirementToBuy > gameState.peakLifetimeSeeds;
		}
		const item = gameState.items.find((i) => i?.[0] == this.requirementToBuy);
		if (!item) {
			return false;
		}
		return item[1] == 0;
	}
}
