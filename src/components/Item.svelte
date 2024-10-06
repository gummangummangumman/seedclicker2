<script lang="ts">
	import type { Item } from '../types/item';
	import { gameState, settings } from '../store/store';
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
		$gameState.current.seeds -= price;
		$gameState.current.items[index][1]++;
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
</script>

<Button
	on:click={() => buyItem($gameState)}
	disabled={!canBuy($gameState)}
	className="block relative w-full bg-primary border border-black disabled:bg-bg p-2 rounded-md my-1"
>
	<div class="flex items-center space-x-4 mx-auto w-full">
		{#if $settings.itemView == ItemView.Picture}
			<ItemAmountPicture {item} amount={$gameState.current.items[index][1]} isOutLine={isOutLine($gameState)} />
		{:else}
			<ItemAmount amount={$gameState.current.items[index][1]} />
		{/if}
		<div>
			<span class="text-lg font-bold">{getName($gameState)}</span>
			{#if !isOutLine($gameState)}
				<br />
				Cost: <strong>{format(getPrice($gameState), $settings.formatting)}</strong> seeds
				{#if $gameState.current.items[index][1] > 0 && item.sps}
					<br />
					Generating
					<strong>{format($gameState.current.items[index][1] * item.sps, $settings.formatting)}</strong>
					<span title="seeds per second">sps</span>
				{/if}
				{#if $gameState.current.items[index][1] > 0 && item.clickpower}
					<br />
					Giving
					<strong>{format($gameState.current.items[index][1] * item.clickpower, $settings.formatting)}</strong
					> clickpower
				{/if}
			{/if}
		</div>
	</div>
</Button>
