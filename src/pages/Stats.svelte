<script lang="ts">
	import { store } from '../store/store.svelte';
	import { format, formatSeconds } from '../util/number_formatting';
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	{#if store.gameState.harvested.harvestCount > 0}
		<h3 class="font-bold underline text-lg">Unharvested stats</h3>
	{/if}
	<p>total seeds: <strong>{format(store.gameState.current.totalLifetimeSeeds, store.settings.formatting)}</strong></p>
	<p>peak seeds: <strong>{format(store.gameState.current.peakLifetimeSeeds, store.settings.formatting)}</strong></p>
	<p>clicks: <strong>{format(store.gameState.current.clicks, store.settings.formatting)}</strong></p>
	<p>Time spent playing: <strong>{formatSeconds(store.gameState.current.seconds)}</strong></p>

	{#if store.gameState.harvested.harvestCount > 0}
		<h3 class="pt-4 font-bold underline text-lg">All time</h3>
		<p>Harvests: <strong>{format(store.gameState.harvested.harvestCount, store.settings.formatting)}</strong></p>
		<p>
			Seeds:
			<strong>
				{format(
					store.gameState.harvested.seeds + store.gameState.current.totalLifetimeSeeds,
					store.settings.formatting,
				)}
			</strong>
		</p>
		store.gameState
		<p>
			Clicks:
			<strong
				>{format(
					store.gameState.harvested.clicks + store.gameState.current.clicks,
					store.settings.formatting,
				)}</strong
			>
		</p>
		store.gameState

		<p class="pt-4">
			Total time spent playing: <strong>
				{formatSeconds(store.gameState.harvested.seconds + store.gameState.current.seconds)}
			</strong>
		</p>
	{/if}
</div>
