import { store, updateGameState } from '../store/store.svelte';
import { items } from '../types/item';
import { activeTalents } from '../types/talent';

export function getItemPrice(itemIndex: number) {
	const item = items[itemIndex];
	const numberOfItems = store.gameState.current.items[itemIndex];
	const price = item.basePrice * Math.pow(item.priceScaling, numberOfItems[1]);
	return Math.floor(activeTalents().reduce((sps, talent) => (sps = talent.costEffect?.(sps, item) ?? sps), price));
}

/**
 * !! Just kept for debugging !!
 * Naive version of of {@link maxItemsAmount}. I assume it's terrible for performance as it uses a loop.
 * @returns tuple of [how many of this item you can afford to buy, total price]
 */
function naiveMaxItemsAmount(itemIndex: number): [number, number] {
	const item = items[itemIndex];
	let amount = 0;
	let totalPrice = 0;
	let currentPrice = getItemPrice(itemIndex);
	let numberOfItem = store.gameState.current.items[itemIndex][1];
	while (store.gameState.current.seeds > totalPrice + currentPrice) {
		totalPrice += currentPrice;
		amount++;
		numberOfItem++;
		currentPrice = Math.floor(item.basePrice * Math.pow(item.priceScaling, numberOfItem));
	}

	return [amount, totalPrice];
}

/**
 * Based on geometrical series.
 * Note that it is NOT entirely the same amount as you would get when buying them one by one, because it uses Math.floor on every item bought.
 *
 * Theory: https://www.youtube.com/watch?v=zRKZ0-kOUZM / https://www.reddit.com/r/incremental_gamedev/comments/1hgqhln/comment/m2z9npu/
 * @returns tuple of [how many of this item you can afford to buy, total price]
 */
export function maxItemsAmount(itemIndex: number): [number, number] {
	const item = items[itemIndex];
	let currentPrice = getItemPrice(itemIndex);

	const numUpgradesAffordable = Math.floor(
		Math.log((store.gameState.current.seeds / currentPrice) * (item.priceScaling - 1) + 1) /
			Math.log(item.priceScaling),
	);
	const totalCost = Math.floor(
		(currentPrice * (Math.pow(item.priceScaling, numUpgradesAffordable) - 1)) / (item.priceScaling - 1),
	);

	return [numUpgradesAffordable, totalCost];
}

export function buyItem(itemIndex: number) {
	const price = getItemPrice(itemIndex);
	if (store.gameState.current.seeds < price) {
		return;
	}
	let newGameState = store.gameState;
	newGameState.current.seeds -= price;
	newGameState.current.items[itemIndex][1]++;
	updateGameState(newGameState);
}

export function buyMaxOfItem(itemIndex: number) {
	const result = maxItemsAmount(itemIndex);

	let newGameState = store.gameState;
	newGameState.current.seeds -= result[1];
	newGameState.current.items[itemIndex][1] += result[0];
	updateGameState(newGameState);
}
