import type { GameState } from '../types/gameState';
import type { Talent } from '../types/talent';

export function getTalentCost(gameState: GameState) {
	return 15_000_000 * Math.pow(10, 0 + gameState.current.talents.length);
}

export function talentOwned(gameState: GameState, talent: Talent): Boolean {
	return gameState.current.talents.includes(talent.name);
}

export function requirementFulfilled(gameState: GameState, talent: Talent): Boolean {
	return !talent.requires || gameState.current.talents.includes(talent.requires);
}

export function canBuy(gameState: GameState, talent: Talent): boolean {
	if (gameState.current.talents.includes(talent.name)) {
		return false;
	}
	const cost = getTalentCost(gameState);
	if (cost > gameState.current.seeds) {
		return false;
	}
	if (talent.requires && !gameState.current.talents.includes(talent.requires)) {
		return false;
	}
	return true;
}

export function buyTalent(gameState: GameState, talent: Talent): GameState {
	if (!canBuy(gameState, talent)) {
		console.warn(`Can not buy talent ${talent.name}!`);
		return gameState;
	}
	const cost = getTalentCost(gameState);

	gameState.current.talents.push(talent.name);
	return {
		...gameState,
		current: {
			...gameState.current,
			seeds: gameState.current.seeds - cost,
		},
	};
}
