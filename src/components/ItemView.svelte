<script lang="ts">
	import type { Item } from '../types/item';
	import { store } from '../store/store.svelte';
	import { format } from '../util/number_formatting';
	import Button from './Button.svelte';
	import ItemAmountPicture from './ItemAmountPicture.svelte';
	import ItemAmount from './ItemAmount.svelte';
	import { ItemView } from '../types/settings';
	import { buyItem, buyMaxOfItem, getItemPrice, maxItemsAmount } from '../game_logic/itemLogic';
	export let item: Item;
	export let index: number;

	function buySingle() {
		buyItem(index);
	}

	function buyMax() {
		buyMaxOfItem(index);
	}

	function canBuy() {
		return store.gameState.current.seeds >= getPrice();
	}

	function getPrice() {
		return getItemPrice(index);
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

	function maxAmount(): [number, number] {
		return maxItemsAmount(index);
	}
</script>

<Button
	onclick={() => buySingle()}
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
	<Button onclick={() => buyMax()}>
		Buy max (+{maxAmount()
			.flatMap((num, i) => (i == 0 ? num + ') - ' : format(num, store.settings.formatting)))
			.toString()
			.replace(',', '')}
	</Button>
{/if}
