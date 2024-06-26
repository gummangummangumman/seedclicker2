<script lang="ts">
	import type { Item } from '../types/item';
	import { gameState } from '../store/store';
	import type { GameState } from '../types/gameState';
	export let item: Item;
	export let index: number;

	function buyItem(gameState: GameState) {
		const price = getPrice(gameState)
		if (gameState.seeds < price) {
			return;
		}
		$gameState.seeds -= price;
		$gameState.items[index]++;
	}

	function canBuy(gameState: GameState) {
		return gameState.seeds >= getPrice(gameState);
	}

	function getPrice(gameState: GameState) {
		const numberOfItems = gameState.items[index]
		return Math.floor(item.basePrice * Math.pow(item.priceScaling, numberOfItems));
	}
</script>

<div class="border border-black">
	<button on:click={() => buyItem($gameState)} disabled={!canBuy($gameState)} class="disabled:line-through">Buy {item.name}</button>
	<br />
	Cost: <strong>{getPrice($gameState)}</strong> seeds
	<br />
	You have <strong>{$gameState.items[index]}</strong> {item.name}s
	{#if $gameState.items[index] > 0}
	<br />
	Generating {$gameState.items[index] * item.sps} <span title="seeds per second">sps</span>
	{/if}
</div>
