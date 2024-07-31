<script lang="ts">
	import { gameState } from '../store/store';
	import { format } from '../util/number_formatting';
</script>

<div class="my-8">
	{#if $gameState.harvested.harvestCount > 0}
		<h3 class="font-bold underline text-lg">Unharvested stats</h3>
	{/if}
	<p>total seeds: <strong>{format($gameState.totalLifetimeSeeds)}</strong></p>
	<p>peak seeds: <strong>{format($gameState.peakLifetimeSeeds)}</strong></p>
	<p>clicks: <strong>{format($gameState.clicks)}</strong></p>
	<p>Time spent playing: <strong>{format($gameState.seconds)}</strong>s</p>
	{#if $gameState.harvested.harvestCount > 0}
		<h3 class="pt-4 font-bold underline text-lg">All time</h3>
		<p>Harvests: <strong>{format($gameState.harvested.harvestCount)}</strong></p>
		<p>
			Seeds:
			<strong>{format($gameState.harvested.seeds + $gameState.totalLifetimeSeeds)}</strong>
		</p>
		<p>
			Clicks:
			<strong>{format($gameState.harvested.clicks + $gameState.clicks)}</strong>
		</p>

		<p class="pt-4">
			Total time spent playing: <strong>{format($gameState.harvested.seconds + $gameState.seconds)}s</strong>
		</p>
	{/if}
</div>
