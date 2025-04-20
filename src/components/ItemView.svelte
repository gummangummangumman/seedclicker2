<script lang="ts">
	import type { Item } from '../types/item';
	import { store } from '../store/store.svelte';
	import { format } from '../util/number_formatting';
	import Button from './Button.svelte';
	import ItemAmountPicture from './ItemAmountPicture.svelte';
	import ItemAmount from './ItemAmount.svelte';
	import MaxBuy from './MaxBuy.svelte';
	import { ItemView } from '../types/settings';
	import { buyItem, buyMaxOfItem, getItemPrice, maxItemsAmount } from '../game_logic/itemLogic';
	import { getLongSpsName, getSpsName } from '../game_logic/dailyLogic';
	export let item: Item;
	export let index: number;

	function buySingle() {
		buyItem(index);
	}

	function buyMax() {
		buyMaxOfItem(index);
	}

	function canBuy() {
		return store.gameState.current.seeds >= getPrice() && getPrice() != 0;
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

<div class="flex">
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
					{#if getPrice() != 0}
						<br />
						💰 <strong>{format(getPrice(), store.settings.formatting)}</strong>
					{/if}
					{#if store.gameState.current.items[index][1] > 0 && item.sps}
						<br />
						<span class="text-sm">
							⏱️
							<strong
								>{format(
									store.gameState.current.items[index][1] * item.sps,
									store.settings.formatting,
								)}</strong
							>
							<span title={getLongSpsName()}>{getSpsName()}</span>
						</span>
					{/if}
					{#if store.gameState.current.items[index][1] > 0 && item.clickpower}
						<br />
						<span class="text-sm">
							💪
							<strong
								>{format(
									store.gameState.current.items[index][1] * item.clickpower,
									store.settings.formatting,
								)}</strong
							>
							cp
						</span>
					{/if}
				{/if}
			</div>
		</div>
	</Button>
	{#if !isOutLine()}
		<MaxBuy amount={maxAmount()[0]} cost={maxAmount()[1]} onclick={() => buyMax()} />
	{/if}
</div>
