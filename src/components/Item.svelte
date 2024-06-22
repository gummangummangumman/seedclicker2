<script lang="ts">
	import type { Item } from '../types/item';
	export let item: Item;

	let number: number = 0; //TODO replace with gameState
</script>

<div class="border border-black">
	<button on:click={() => number++}>Buy {item.name}</button>
	<br />
	Cost: <strong>{item.cost}</strong> seeds
	<br />
	You have <strong>{number}</strong> {item.name}s
</div>
