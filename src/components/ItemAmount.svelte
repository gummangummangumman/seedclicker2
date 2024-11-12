<script lang="ts">
	import { store } from '../store/store.svelte';
	import { format } from '../util/number_formatting';

	interface Props {
		amount?: number;
	}

	let { amount = 0 }: Props = $props();
</script>

<span class="w-20 h-16 border border-secondary rounded-full flex items-center justify-center">
	{amount == 0 ? '-' : format(amount, store.settings.formatting)}
</span>
