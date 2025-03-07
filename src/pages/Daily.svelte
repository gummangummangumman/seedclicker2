<script lang="ts">
	import Button from '../components/Button.svelte';
	import CurrentDayDisplay from '../components/CurrentDayDisplay.svelte';
	import { collectDaily } from '../game_logic/gameLogic';
	import { store } from '../store/store.svelte';
	import { formatSeconds, format } from '../util/number_formatting';

	const date = new Date();
	const currentDay = date.toDateString();

	let rewarded: number | null = $state(null);

	function collect() {
		rewarded = collectDaily(date);
	}

	function secondsToNextDay(): number {
		const now = new Date();
		const tomorrow = new Date(now);

		// Set to the next day at midnight
		tomorrow.setDate(now.getDate() + 1);
		tomorrow.setHours(0, 0, 0, 0);

		// Calculate the difference in seconds
		const diffMilliseconds = tomorrow.getTime() - now.getTime();
		return Math.floor(diffMilliseconds / 1000);
	}
	let secondsLeft = $state(secondsToNextDay());
	setInterval(() => {
		secondsLeft = Math.max(secondsLeft - 1, 0); // Prevent negative values
	}, 1000);
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	{#if currentDay != store.gameState.lastCollectedDailyDate}
		<Button class="bg-primary p-2 px-4 mt-3 rounded-md border border-secondary" onclick={collect}>Collect</Button>
	{:else if rewarded != null}
		<p>Yay! You got {format(rewarded, store.settings.formatting)} seeds!</p>
	{:else}
		✅ <CurrentDayDisplay {date} /> ✅
		<p>Come back again in</p>
		<h1 class="text-5xl"><strong>{formatSeconds(secondsLeft)}</strong></h1>
	{/if}
</div>
