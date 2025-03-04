import { store } from '../store/store.svelte';
import { amountOf, type Item } from './item';

/**
 * Make sure all effects are multiplicative!
 * This way, the order of which they are added doesn't matter.
 */
export interface Talent {
	name: string;
	description: string;
	requires?: string; //name of another talent
	clickEffect?: (clickPower: number) => number;
	spsEffect?: (sps: number) => number;
	costEffect?: (cost: number, item: Item) => number;
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
				{ name: 'Clicky Clara', description: '5x click power', clickEffect: (clickPower) => clickPower * 5 },
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
					description: '+3% of base clickpower each water item (water cans and sprinklers)',
					requires: 'Click god',
					clickEffect: (clickPower) => {
						const totalWaterItems = amountOf('water can') + amountOf('sprinkler');
						return clickPower + clickPower * 0.03 * totalWaterItems;
					},
				},
				{ name: '2', description: '2x cp', requires: 'Click god', clickEffect: (clickPower) => clickPower * 2 },
				{
					name: 'Bargaining Barry',
					description: 'All items that give sps are 90% cheaper',
					requires: 'Friend of the hourglass',
					costEffect: (cost, item) => {
						if (item.sps) {
							return cost / 10;
						} else {
							return cost;
						}
					},
				},
				{ name: '4', description: '2x sps', requires: 'Friend of the hourglass', spsEffect: (sps) => sps * 2 },
			],
		},
	],
};

export function activeTalents(): Talent[] {
	return talentTree.levels
		.flatMap((level) => level.talents)
		.filter((talent) => store.gameState.current.talents.includes(talent.name));
}
