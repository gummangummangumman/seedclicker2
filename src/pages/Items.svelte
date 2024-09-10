<script lang="ts">
	import Item from '../components/Item.svelte';
	import { gameState } from '../store/store';
	import { items } from '../types/item';
</script>

{#each items as item, index}
	{#if !item.requirement?.shouldHideFully($gameState)}
		<Item {item} {index} />
	{/if}
{/each}
