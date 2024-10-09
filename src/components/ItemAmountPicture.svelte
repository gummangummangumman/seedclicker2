<script lang="ts">
	import { settings } from '../store/store';
	import type { Item } from '../types/item';
	import { isDarkMode } from '../util/background';
	import { format } from '../util/number_formatting';

	export let item: Item;
	export let amount: number = 0;
	export let isOutLine: boolean = false;
</script>

<div class="w-20 relative">
	<img
		src={isOutLine ? '/items/mystery.png' : `/items/${item.name.replaceAll(' ', '_').toLowerCase()}.png`}
		alt={item.name}
		width="80px"
		class="rounded-full border border-secondary {isDarkMode($settings) ? 'invert' : ''}"
	/>
	{#if amount > 0}
		<span class="absolute bottom-0 right-0 text-xs p-1 bg-bg border border-secondary rounded-full">
			{format(amount, $settings.formatting)}
		</span>
	{/if}
</div>
