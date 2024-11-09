<script lang="ts">
	import { settings } from '../store/store';
	import { format } from '../util/number_formatting';

	interface Props {
		amount?: number;
	}

	let { amount = 0 }: Props = $props();
</script>

<span class="w-20 h-16 border border-secondary rounded-full flex items-center justify-center">
	{amount == 0 ? '-' : format(amount, $settings.formatting)}
</span>
