<script lang="ts">
	import ItemView from '../components/ItemView.svelte';
	import { store } from '../store/store.svelte';
	import { items } from '../types/item';
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	{#each items as item, index}
		{#if !item.requirement?.shouldHideFully(store.gameState)}
			<ItemView {item} {index} />
		{/if}
	{/each}
</div>
