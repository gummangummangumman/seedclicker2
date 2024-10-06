<script lang="ts">
	import { settings } from '../store/store';
	import type { Item } from '../types/item';
	import { format } from '../util/number_formatting';

	export let item: Item;
	export let amount: number = 0;
	export let isOutLine: boolean = false;
</script>

<div class="w-20 h-20 relative">
	<img src={isOutLine ? 'gumman_mystery.webp' : 'gumman.jpg'} alt={item.name} width="80px" class="rounded-full" />
	{#if amount > 0}
		<span class="absolute bottom-0 right-0 text-xs p-1 bg-bg border border-secondary rounded-full">
			{format(amount, $settings.formatting)}
		</span>
	{/if}
</div>
