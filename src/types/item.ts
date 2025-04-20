import { store } from '../store/store.svelte';
import { Requirement } from './requirement';

export interface Item {
	name: string;
	basePrice: number;
	sps?: number;
	clickpower?: number;
	priceScaling: number;
	requirement?: Requirement;
	maxAmount?: number;
}

export const items: Item[] = [
	{ name: 'Garden hoe', basePrice: 10, clickpower: 1, priceScaling: 1.2 },
	{ name: 'Water can', basePrice: 50, sps: 1, priceScaling: 1.2 },
	{ name: 'Fertilizer Bag', basePrice: 100, sps: 2, priceScaling: 1.2 },
	{ name: 'Sprinkler', basePrice: 1_300, sps: 10, priceScaling: 1.2 },
	{
		name: 'Tractor',
		basePrice: 180_000,
		sps: 30,
		clickpower: 30,
		priceScaling: 1.2,
		requirement: new Requirement(100, 1_000),
	},
	{
		name: 'Plantation',
		basePrice: 5_000_000,
		sps: 100,
		priceScaling: 5,
		requirement: new Requirement(100_000, 1_000_000),
		maxAmount: 9,
	},
	{
		name: 'Sun',
		basePrice: 5_000_000_000,
		sps: 1_000,
		priceScaling: 1.2,
		requirement: new Requirement(750_000, 'Plantation'),
	},
	{
		name: 'Garden gnome',
		basePrice: 25_000_000_000,
		sps: 1_337,
		clickpower: 1_337,
		priceScaling: 1.2,
		requirement: new Requirement(4_000_000_000, 10_000_000_000),
	},
];

/**
 * @returns how many you currently have of the item
 */
export function amountOf(name: string): number {
	const amount = store.gameState.current.items.find((item) => item[0].toLowerCase() == name.toLowerCase())?.[1];
	if (!amount) {
		return 0;
	}
	return amount;
}
