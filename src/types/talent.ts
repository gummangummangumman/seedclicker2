import { store } from '../store/store.svelte';
import { amountOf } from './item';

/**
 * Make sure the clickEffects and spsEffects are multiplicative!
 * This way, the order of which they are added doesn't matter.
 */
export interface Talent {
	name: string;
	description: string;
	requires?: string; //name of another talent
	clickEffect?: (clickPower: number) => number;
	spsEffect?: (sps: number) => number;
}

export interface TalentLevel {
	talents: Talent[];
}

export interface TalentTree {
	levels: TalentLevel[];
}

export const talentTree: TalentTree = {
	levels: [
		{
			talents: [
				{ name: 'Clicky Clara', description: '3x click power', clickEffect: (clickPower) => clickPower * 3 },
				{ name: 'Passive Peter', description: '3x seeds per second', spsEffect: (sps) => sps * 3 },
			],
		},
		{
			talents: [
				{
					name: 'Click god',
					description: '2x click power',
					requires: 'Clicky Clara',
					clickEffect: (clickPower) => clickPower * 2,
				},
				{
					name: 'Friend of the hourglass',
					description: '2x seeds per second',
					requires: 'Passive Peter',
					spsEffect: (sps) => sps * 2,
				},
			],
		},
		{
			talents: [
				{
					name: 'Water',
					description: '+100% of base clickpower each water item (water cans and sprinklers)',
					requires: 'Click god',
					clickEffect: (clickPower) => {
						const totalWaterItems = amountOf('water can') + amountOf('sprinkler');
						if (totalWaterItems == 0) {
							return clickPower;
						}
						return clickPower * (2 * totalWaterItems);
					},
				},
				{
					name: '2',
					description: '...',
					requires: 'Click god',
					clickEffect: (clickPower) => clickPower * 2,
				},
				{
					name: '3',
					description: '...',
					requires: 'Friend of the hourglass',
					spsEffect: (sps) => sps * 2,
				},
				{
					name: '4',
					description: '...',
					requires: 'Friend of the hourglass',
					spsEffect: (sps) => sps * 2,
				},
			],
		},
	],
};

export function activeTalents(): Talent[] {
	return talentTree.levels
		.flatMap((level) => level.talents)
		.filter((talent) => store.gameState.current.talents.includes(talent.name));
}
