<script lang="ts">
	import Item from '../components/Item.svelte';
	import { gameState } from '../store/store';
	import { items } from '../types/item';
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	{#each items as item, index}
		{#if !item.requirement?.shouldHideFully($gameState)}
			<Item {item} {index} />
		{/if}
	{/each}
</div>
