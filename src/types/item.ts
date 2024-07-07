import { Requirement } from './requirement';

export interface Item {
	name: string;
	basePrice: number;
	sps: number;
	priceScaling: number;
	requirement?: Requirement;
}

export const items: Item[] = [
	{ name: 'Water can', basePrice: 10, sps: 1, priceScaling: 1.2 },
	{ name: 'Fertilizer Bag', basePrice: 22, sps: 2, priceScaling: 1.2 },
	{ name: 'Sprinkler', basePrice: 1_300, sps: 5, priceScaling: 1.2 },
	{ name: 'Tractor', basePrice: 180_000, sps: 10, priceScaling: 1.2 },
	{ name: 'Plantation', basePrice: 5_000_000, sps: 20, priceScaling: 1.2 },
	{
		name: 'Sun',
		basePrice: 5_000_000_000,
		sps: 1_000,
		priceScaling: 1.2,
		requirement: new Requirement(180_000, 'Plantation'),
	},
];
