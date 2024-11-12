<script lang="ts">
	import { store } from '../store/store.svelte';
	import type { Item } from '../types/item';
	import { isDarkMode } from '../util/background';
	import { format } from '../util/number_formatting';

	interface Props {
		item: Item;
		amount?: number;
		isOutLine?: boolean;
	}

	let { item, amount = 0, isOutLine = false }: Props = $props();
</script>

<div class="w-20 relative">
	<img
		src={isOutLine ? '/mystery.png' : `/items/${item.name.replaceAll(' ', '_').toLowerCase()}.png`}
		alt={item.name}
		width="80px"
		class="rounded-full border border-secondary {isDarkMode(store.settings) ? 'invert' : ''}"
	/>
	{#if amount > 0}
		<span class="absolute bottom-0 right-0 text-xs p-1 bg-bg border border-secondary rounded-full">
			{format(amount, store.settings.formatting)}
		</span>
	{/if}
</div>
