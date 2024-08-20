import type { GameState } from './gameState';

export interface Talent {
	name: string;
	description: string;
	requires?: string; //name of another talent
	clickEffect?: (clickPower: number) => number;
	spsEffect?: (sps: number) => number;
}

export interface Spec {
	name: string;
	talents: Talent[];
}

export interface TalentTree {
	specs: Spec[];
}

export const talentTree: TalentTree = {
	specs: [
		{
			name: 'Click',
			talents: [
				{ name: 'Clicky Clara', description: '2x click power', clickEffect: (clickPower) => clickPower * 2 },
				{
					name: 'Click god',
					description: '3x click power',
					requires: 'Clicky Clara',
					clickEffect: (clickPower) => clickPower * 3,
				},
			],
		},
		{
			name: 'Idle',
			talents: [
				{ name: 'Passive Peter', description: '2x seeds per second', spsEffect: (sps) => sps * 2 },
				{
					name: 'Friend of the hourglass',
					description: '3x seeds per second',
					requires: 'Passive Peter',
					spsEffect: (sps) => sps * 3,
				},
			],
		},
	],
};

export function activeTalents(gameState: GameState): Talent[] {
	return talentTree.specs
		.flatMap((spec) => spec.talents)
		.filter((talent) => gameState.current.talents.includes(talent.name));
}
