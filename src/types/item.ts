export interface Item {
	name: string;
	basePrice: number;
	sps: number;
	priceScaling: number;
}

export const items: Item[] = [
	{ name: 'Water can', basePrice: 10, sps: 1, priceScaling: 1.2 },
	{ name: 'Fertilizer Bag', basePrice: 22, sps: 2, priceScaling: 1.2 },
	{ name: 'Sprinkler', basePrice: 1_300, sps: 5, priceScaling: 1.2 },
	{ name: 'Tractor', basePrice: 12_000, sps: 10, priceScaling: 1.2 },
	{ name: 'Plantation', basePrice: 500_000, sps: 20, priceScaling: 1.2 },
	{ name: 'Sun', basePrice: 9_999_999, sps: 1_000, priceScaling: 1.2 },
];
