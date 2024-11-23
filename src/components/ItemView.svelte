<script lang="ts">
	import type { Item } from '../types/item';
	import { store, updateGameState } from '../store/store.svelte';
	import type { GameState } from '../types/gameState';
	import { format } from '../util/number_formatting';
	import Button from './Button.svelte';
	import ItemAmountPicture from './ItemAmountPicture.svelte';
	import ItemAmount from './ItemAmount.svelte';
	import { ItemView } from '../types/settings';
	export let item: Item;
	export let index: number;

	function buyItem(gameState: GameState) {
		const price = getPrice(gameState);
		if (gameState.current.seeds < price) {
			return;
		}
		gameState.current.seeds -= price;
		gameState.current.items[index][1]++;
		updateGameState(gameState);
	}

	function canBuy(gameState: GameState) {
		return gameState.current.seeds >= getPrice(gameState);
	}

	function getPrice(gameState: GameState) {
		const numberOfItems = gameState.current.items[index];
		return Math.floor(item.basePrice * Math.pow(item.priceScaling, numberOfItems[1]));
	}

	function getName(gameState: GameState) {
		if (!item.requirement?.shouldOnlyShowOutline(gameState)) {
			return item.name;
		} else {
			return '???';
		}
	}

	function isOutLine(gameState: GameState) {
		return item.requirement?.shouldOnlyShowOutline(gameState);
	}

	/**
	 * @returns tuple of [how many of this item you can afford to buy, total price]
	 */
	function amountCanBuy(gameState: GameState): [number, number] {
		//TODO unit test this
		//TODO move to gamelogic class, move out of
		//TODO see if Geometric Sum Formula is usable even with the constant use of Math.floor() in getPrice. GSF should be more performant than doing a while loop
		let amount = 0;
		let totalPrice = 0;
		let currentPrice = getPrice(gameState);
		let numberOfItem = gameState.current.items[index][1];
		while (gameState.current.seeds > totalPrice + currentPrice) {
			totalPrice += currentPrice;
			amount++;
			numberOfItem++;
			currentPrice = Math.floor(item.basePrice * Math.pow(item.priceScaling, numberOfItem));
		}

		return [amount, totalPrice];
	}
</script>

<Button
	onclick={() => buyItem(store.gameState)}
	disabled={!canBuy(store.gameState) || isOutLine(store.gameState)}
	class="block relative w-full bg-primary border border-black disabled:bg-bg p-2 rounded-md my-1"
>
	<div class="flex items-center space-x-4 mx-auto w-full">
		{#if store.settings.itemView == ItemView.NoPicture}
			<ItemAmount amount={store.gameState.current.items[index][1]} />
		{:else}
			<ItemAmountPicture
				{item}
				amount={store.gameState.current.items[index][1]}
				isOutLine={isOutLine(store.gameState)}
			/>
		{/if}
		<div class="w-full pr-20">
			<span class="text-lg font-bold">{getName(store.gameState)}</span>
			{#if !isOutLine(store.gameState)}
				<br />
				Cost: <strong>{format(getPrice(store.gameState), store.settings.formatting)}</strong> seeds
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
<Button onclick={() => alert('not implemented')}>
	Buy max (+{amountCanBuy(store.gameState)
		.flatMap((num, i) => (i == 0 ? num + ') - ' : format(num, store.settings.formatting)))
		.toString()
		.replace(',', '')}
</Button>
