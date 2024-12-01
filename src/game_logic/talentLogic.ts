import { store, updateGameState } from '../store/store.svelte';
import type { Talent } from '../types/talent';

export function getTalentCost() {
	return 15_000_000 * Math.pow(10, 0 + store.gameState.current.talents.length);
}

export function talentOwned(talent: Talent): Boolean {
	return store.gameState.current.talents.includes(talent.name);
}

export function requirementFulfilled(talent: Talent): Boolean {
	return !talent.requires || store.gameState.current.talents.includes(talent.requires);
}

export function canBuy(talent: Talent): boolean {
	if (store.gameState.current.talents.includes(talent.name)) {
		return false;
	}
	const cost = getTalentCost();
	if (cost > store.gameState.current.seeds) {
		return false;
	}
	if (talent.requires && !store.gameState.current.talents.includes(talent.requires)) {
		return false;
	}
	return true;
}

export function buyTalent(talent: Talent) {
	if (!canBuy(talent)) {
		console.warn(`Can not buy talent ${talent.name}!`);
		return;
	}
	const cost = getTalentCost();
	let newGameState = store.gameState;
	newGameState.current.talents.push(talent.name);
	updateGameState({
		...newGameState,
		current: {
			...newGameState.current,
			seeds: newGameState.current.seeds - cost,
		},
	});
}
