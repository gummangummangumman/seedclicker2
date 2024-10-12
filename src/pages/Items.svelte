<script lang="ts">
	import ItemView from '../components/ItemView.svelte';
	import { gameState } from '../store/store';
	import { items } from '../types/item';
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	{#each items as item, index}
		{#if !item.requirement?.shouldHideFully($gameState)}
			<ItemView {item} {index} />
		{/if}
	{/each}
</div>
