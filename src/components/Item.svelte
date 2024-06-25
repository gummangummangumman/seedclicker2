<script lang="ts">
	import type { Item } from '../types/item';
	import { gameState } from '../store/store';
	export let item: Item;
	export let index: number;

	function buyItem() {
		//TODO ...
		$gameState.items[index]++;
	}
</script>

<div class="border border-black">
	<button on:click={() => buyItem()}>Buy {item.name}</button>
	<br />
	Cost: <strong>{item.cost}</strong> seeds
	<br />
	You have <strong>{$gameState.items[index]}</strong> {item.name}s
</div>
