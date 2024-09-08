import { Requirement } from './requirement';

export interface Item {
	name: string;
	basePrice: number;
	sps?: number;
	clickpower?: number;
	priceScaling: number;
	requirement?: Requirement;
}

export const items: Item[] = [
	{ name: 'Garden hoe', basePrice: 10, clickpower: 1, priceScaling: 1.2 },
	{ name: 'Water can', basePrice: 50, sps: 1, priceScaling: 1.2 },
	{ name: 'Fertilizer Bag', basePrice: 100, sps: 2, priceScaling: 1.2 },
	{ name: 'Sprinkler', basePrice: 1_300, sps: 10, priceScaling: 1.2 },
	{ name: 'Tractor', basePrice: 180_000, sps: 30, clickpower: 30, priceScaling: 1.2 },
	{
		name: 'Plantation',
		basePrice: 5_000_000,
		sps: 20,
		priceScaling: 1.2,
		requirement: new Requirement(5_000, 100_000),
	},
	{
		name: 'Sun',
		basePrice: 5_000_000_000,
		sps: 1_000,
		priceScaling: 1.2,
		requirement: new Requirement(180_000, 'Plantation'),
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
