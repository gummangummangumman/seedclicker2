import { store, updateGameState } from '../store/store.svelte';
import { type Item } from '../types/item';

export function getItemPrice(itemIndex: number, item: Item) {
	const numberOfItems = store.gameState.current.items[itemIndex];
	return Math.floor(item.basePrice * Math.pow(item.priceScaling, numberOfItems[1]));
}

/**
 * !! Just kept for debugging !!
 * Naive version of of {@link maxItemsAmount}. I assume it's terrible for performance as it uses a loop.
 * @returns tuple of [how many of this item you can afford to buy, total price]
 */
function naiveMaxItemsAmount(itemIndex: number, item: Item): [number, number] {
	let amount = 0;
	let totalPrice = 0;
	let currentPrice = getItemPrice(itemIndex, item);
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
export function maxItemsAmount(itemIndex: number, item: Item): [number, number] {
	//TODO unit test this
	let currentPrice = getItemPrice(itemIndex, item);

	const numUpgradesAffordable = Math.floor(
		Math.log((store.gameState.current.seeds / currentPrice) * (item.priceScaling - 1) + 1) /
			Math.log(item.priceScaling),
	);
	const totalCost = Math.floor(
		(currentPrice * (Math.pow(item.priceScaling, numUpgradesAffordable) - 1)) / (item.priceScaling - 1),
	);

	return [numUpgradesAffordable, totalCost];
}

export function buyItem(itemIndex: number, item: Item) {
	const price = getItemPrice(itemIndex, item);
	if (store.gameState.current.seeds < price) {
		return;
	}
	let newGameState = store.gameState;
	newGameState.current.seeds -= price;
	newGameState.current.items[itemIndex][1]++;
	updateGameState(newGameState);
}

export function buyMaxOfItem(itemIndex: number, item: Item) {
	const result = maxItemsAmount(itemIndex, item);

	let newGameState = store.gameState;
	newGameState.current.seeds -= result[1];
	newGameState.current.items[itemIndex][1] += result[0];
	updateGameState(newGameState);
}
