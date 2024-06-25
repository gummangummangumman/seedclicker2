export interface Item {
	name: string;
	basePrice: number;
	sps: number;
}

export const items: Item[] = [
	{ name: 'Water can', basePrice: 10, sps: 1 },
	{ name: 'Fertilizer Bag', basePrice: 22, sps: 2 },
	{ name: 'Sprinkler', basePrice: 1_300, sps: 5 },
	{ name: 'Tractor', basePrice: 12_000, sps: 10 },
	{ name: 'Plantation', basePrice: 500_000, sps: 20 },
	{ name: 'Sun', basePrice: 9_999_999, sps: 1_000 },
];
