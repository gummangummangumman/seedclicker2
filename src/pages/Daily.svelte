<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from '../components/Button.svelte';
	import CurrentDayDisplay from '../components/CurrentDayDisplay.svelte';
	import { collectDaily, getCurrencyName } from '../game_logic/dailyLogic';
	import { store } from '../store/store.svelte';
	import { formatSeconds, format } from '../util/number_formatting';
	import { DailyChoice } from '../types/gameState';

	const date = new Date();
	const currentDay = date.toDateString();

	let rewarded: number | null = $state(null);
	let recentlySwitched: Boolean = $state(false);

	const treasureChests = [DailyChoice.gumman, DailyChoice.lorrison, DailyChoice.pongo].sort(
		() => Math.random() - 0.5,
	);
	function collect(treasure: DailyChoice) {
		recentlySwitched = store.gameState.daily.choice != treasure;
		rewarded = collectDaily(date, treasure);
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
	const interval = setInterval(() => {
		secondsLeft = Math.max(secondsLeft - 1, 0); // Prevent negative values
	}, 1000);

	let isHoveringAChest = $state(false);

	function handleFocus() {
		const realSecondsLeft = secondsToNextDay();
		if (secondsLeft > realSecondsLeft + 3) {
			secondsLeft = realSecondsLeft;
		}
	}

	onMount(() => {
		window.addEventListener('focus', handleFocus);
	});

	onDestroy(() => {
		clearInterval(interval);
		window.removeEventListener('focus', handleFocus);
	});
</script>

<div class="my-8 mx-2 max-w-screen-sm sm:mx-auto">
	{#if currentDay != store.gameState.daily.date}
		<p>Choose wisely.</p>
		<div
			id="treasure-chest-container"
			class="mt-2"
			style="animation-play-state: {isHoveringAChest ? 'paused' : 'running'};"
		>
			{#each treasureChests as treasure}
				<div class="treasure-button">
					<Button
						onmouseover={() => (isHoveringAChest = true)}
						onmouseleave={() => (isHoveringAChest = false)}
						onclick={() => collect(treasure)}
						class="bg-primary border border-black rounded-full absolute"
					>
						<img
							src={`/${treasure}.jpg`}
							width="100px"
							alt={treasure + ' treasure chest'}
							class="rounded-full"
						/>
					</Button>
				</div>
			{/each}
		</div>
	{:else if rewarded != null}
		<p class="text-xl">Great choice! 👏</p>
		{#if recentlySwitched}
			<p>
				You have entered <strong>{store.gameState.daily.choice.toUpperCase()} MODE</strong>. You now prefer to
				call your seeds for <strong>{getCurrencyName().toUpperCase()}</strong>.
			</p>
		{/if}
		<br />
		<p>
			You are rewarded with <strong>{format(rewarded, store.settings.formatting)}</strong>
			{getCurrencyName().toLowerCase()}!
		</p>
	{:else}
		✅ <CurrentDayDisplay {date} /> ✅
		<p>Come back again in</p>
		<h1 class="text-5xl"><strong>{formatSeconds(secondsLeft)}</strong></h1>
	{/if}
</div>

<style>
	/* Container setup */
	#treasure-chest-container {
		position: relative;
		width: 240px;
		height: 240px;
		margin: 100px auto;
		animation: rotateTriangle 15s linear infinite;
	}

	/* Buttons positioned in a triangle */
	.treasure-button {
		position: absolute;
		width: 90px;
		height: 90px;
		border-radius: 50%;
		border: 2px solid black;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Position buttons in a triangle */
	.treasure-button:nth-child(1) {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.treasure-button:nth-child(2) {
		bottom: 0;
		left: 0;
	}

	.treasure-button:nth-child(3) {
		bottom: 0;
		right: 0;
	}

	/* Rotation Animation */
	@keyframes rotateTriangle {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
