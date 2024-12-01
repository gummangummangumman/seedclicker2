import { store } from '../store/store.svelte';

export class Requirement {
	requirementToShowOutline: number; //peak lifetime seeds
	requirementToBuy: string | number; //peak lifetime seeds OR item bought

	constructor(requirementToShowOutline: number, requirementToBuy: string | number) {
		this.requirementToShowOutline = requirementToShowOutline;
		this.requirementToBuy = requirementToBuy;
	}

	shouldHideFully() {
		return this.requirementToShowOutline > store.gameState.current.peakLifetimeSeeds;
	}

	shouldOnlyShowOutline() {
		if (typeof this.requirementToBuy == 'number') {
			return this.requirementToBuy > store.gameState.current.peakLifetimeSeeds;
		}
		const item = store.gameState.current.items.find((i) => i?.[0] == this.requirementToBuy);
		if (!item) {
			return false;
		}
		return item[1] == 0;
	}
}
