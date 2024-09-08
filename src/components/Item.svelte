<script lang="ts">
	import type { Item } from '../types/item';
	import { gameState } from '../store/store';
	import type { GameState } from '../types/gameState';
	import { format } from '../util/number_formatting';
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

{#if !item.requirement?.shouldHideFully($gameState)}
	<div class="border border-black">
		<button on:click={() => buyItem($gameState)} disabled={!canBuy($gameState)} class="disabled:line-through"
			>Buy {getName($gameState)}</button
		>
		{#if !isOutLine($gameState)}
			<br />
			Cost: <strong>{format(getPrice($gameState))}</strong> seeds
			<br />
			You have <strong>{format($gameState.current.items[index][1])}</strong>
			{#if $gameState.current.items[index][1] > 0 && item.sps}
				<br />
				Generating <strong>{format($gameState.current.items[index][1] * item.sps)}</strong>
				<span title="seeds per second">sps</span>
			{/if}
			{#if $gameState.current.items[index][1] > 0 && item.clickpower}
				<br />
				Giving <strong>{format($gameState.current.items[index][1] * item.clickpower)}</strong> clickpower
			{/if}
		{/if}
	</div>
{/if}
