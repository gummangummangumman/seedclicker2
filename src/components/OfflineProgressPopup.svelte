<script lang="ts">
	import { getCurrencyName } from '../game_logic/dailyLogic';
	import { store } from '../store/store.svelte';
	import type { OfflineProgress } from '../types/offlineProgress';
	import { format, formatSeconds } from '../util/number_formatting';
	import Button from './Button.svelte';
	export let offlineProgress: OfflineProgress;
	export let onClose: any;
</script>

<div class="fixed w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center top-0 z-50">
	<div class="w-4/5 h-4/5 bg-bg shadow-lg flex flex-col items-center justify-center rounded-md p-2">
		<p class="text-lg">Welcome back! ^_^</p>
		<br />
		<p>You were gone for <strong>{formatSeconds(offlineProgress.secondsElapsed)}</strong>.</p>
		<p>
			You earned <strong>{format(offlineProgress.seedsEarned, store.settings.formatting)}</strong>
			{getCurrencyName()} while you were gone.
		</p>
		<Button onclick={onClose} class="my-2">Cool</Button>
	</div>
</div>
