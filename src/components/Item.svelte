<script lang="ts">
	import type { Item } from '../types/item';
	import { gameState } from '../store/store';
	export let item: Item;
	export let index: number;

	function buyItem() {
		const price = item.basePrice
		if ($gameState.seeds < price) {
			return;
		}
		$gameState.seeds -= price;
		$gameState.items[index]++;
	}
</script>

<div class="border border-black">
	<button on:click={() => buyItem()}>Buy {item.name}</button>
	<br />
	Cost: <strong>{item.basePrice}</strong> seeds
	<br />
	You have <strong>{$gameState.items[index]}</strong> {item.name}s
	{#if $gameState.items[index] > 0}
	<br />
	Generating {$gameState.items[index] * item.sps} <span title="seeds per second">sps</span>
	{/if}
</div>
