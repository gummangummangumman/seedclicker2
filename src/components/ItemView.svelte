<script lang="ts">
	import type { Item } from '../types/item';
	import { store, updateGameState } from '../store/store.svelte';
	import { format } from '../util/number_formatting';
	import Button from './Button.svelte';
	import ItemAmountPicture from './ItemAmountPicture.svelte';
	import ItemAmount from './ItemAmount.svelte';
	import { ItemView } from '../types/settings';
	export let item: Item;
	export let index: number;

	function buyItem() {
		const price = getPrice();
		if (store.gameState.current.seeds < price) {
			return;
		}
		let newGameState = store.gameState;
		newGameState.current.seeds -= price;
		newGameState.current.items[index][1]++;
		updateGameState(newGameState);
	}

	function canBuy() {
		return store.gameState.current.seeds >= getPrice();
	}

	function getPrice() {
		const numberOfItems = store.gameState.current.items[index];
		return Math.floor(item.basePrice * Math.pow(item.priceScaling, numberOfItems[1]));
	}

	function getName() {
		if (!item.requirement?.shouldOnlyShowOutline()) {
			return item.name;
		} else {
			return '???';
		}
	}

	function isOutLine() {
		return item.requirement?.shouldOnlyShowOutline();
	}

	/**
	 * @returns tuple of [how many of this item you can afford to buy, total price]
	 */
	function amountCanBuy(): [number, number] {
		//TODO unit test this
		//TODO move to gamelogic class, move out of
		//TODO see if Geometric Sum Formula is usable even with the constant use of Math.floor() in getPrice. GSF should be more performant than doing a while loop
		let amount = 0;
		let totalPrice = 0;
		let currentPrice = getPrice();
		let numberOfItem = store.gameState.current.items[index][1];
		while (store.gameState.current.seeds > totalPrice + currentPrice) {
			totalPrice += currentPrice;
			amount++;
			numberOfItem++;
			currentPrice = Math.floor(item.basePrice * Math.pow(item.priceScaling, numberOfItem));
		}

		return [amount, totalPrice];
	}
</script>

<Button
	onclick={() => buyItem()}
	disabled={!canBuy() || isOutLine()}
	class="block relative w-full bg-primary border border-black disabled:bg-bg p-2 rounded-md my-1"
>
	<div class="flex items-center space-x-4 mx-auto w-full">
		{#if store.settings.itemView == ItemView.NoPicture}
			<ItemAmount amount={store.gameState.current.items[index][1]} />
		{:else}
			<ItemAmountPicture {item} amount={store.gameState.current.items[index][1]} isOutLine={isOutLine()} />
		{/if}
		<div class="w-full pr-20">
			<span class="text-lg font-bold">{getName()}</span>
			{#if !isOutLine()}
				<br />
				Cost: <strong>{format(getPrice(), store.settings.formatting)}</strong> seeds
				{#if store.gameState.current.items[index][1] > 0 && item.sps}
					<br />
					<span class="text-sm">
						Generating
						<strong
							>{format(
								store.gameState.current.items[index][1] * item.sps,
								store.settings.formatting,
							)}</strong
						>
						<span title="seeds per second">sps</span>
					</span>
				{/if}
				{#if store.gameState.current.items[index][1] > 0 && item.clickpower}
					<br />
					<span class="text-sm">
						Giving
						<strong
							>{format(
								store.gameState.current.items[index][1] * item.clickpower,
								store.settings.formatting,
							)}</strong
						>
						clickpower
					</span>
				{/if}
			{/if}
		</div>
	</div>
</Button>
{#if !isOutLine()}
	<Button onclick={() => alert('not implemented')}>
		Buy max (+{amountCanBuy()
			.flatMap((num, i) => (i == 0 ? num + ') - ' : format(num, store.settings.formatting)))
			.toString()
			.replace(',', '')}
	</Button>
{/if}
