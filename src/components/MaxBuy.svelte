<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import { store } from '../store/store.svelte';
	import { format } from '../util/number_formatting';
	import Button from './Button.svelte';
	export let amount: number;
	export let cost: number;
	export let onclick: MouseEventHandler<HTMLButtonElement>;
</script>

<Button
	class="{amount > 1
		? 'block'
		: 'hidden'} relative  w-32 bg-primary border border-black disabled:bg-bg p-2 rounded-md my-1"
	{onclick}
>
	<strong class="text-lg">+{format(amount, store.settings.formatting)}</strong><br />
	💰 <span class="text-xs"><strong>{format(cost, store.settings.formatting)}</strong></span>
</Button>
