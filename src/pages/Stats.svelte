<script lang="ts">
	import { gameState, settings } from '../store/store';
	import { format, formatSeconds } from '../util/number_formatting';
</script>

<div class="my-8">
	{#if $gameState.harvested.harvestCount > 0}
		<h3 class="font-bold underline text-lg">Unharvested stats</h3>
	{/if}
	<p>total seeds: <strong>{format($gameState.current.totalLifetimeSeeds, $settings.formatting)}</strong></p>
	<p>peak seeds: <strong>{format($gameState.current.peakLifetimeSeeds, $settings.formatting)}</strong></p>
	<p>clicks: <strong>{format($gameState.current.clicks, $settings.formatting)}</strong></p>
	<p>Time spent playing: <strong>{formatSeconds($gameState.current.seconds)}</strong></p>

	{#if $gameState.harvested.harvestCount > 0}
		<h3 class="pt-4 font-bold underline text-lg">All time</h3>
		<p>Harvests: <strong>{format($gameState.harvested.harvestCount, $settings.formatting)}</strong></p>
		<p>
			Seeds:
			<strong>
				{format($gameState.harvested.seeds + $gameState.current.totalLifetimeSeeds, $settings.formatting)}
			</strong>
		</p>
		<p>
			Clicks:
			<strong>{format($gameState.harvested.clicks + $gameState.current.clicks, $settings.formatting)}</strong>
		</p>

		<p class="pt-4">
			Total time spent playing: <strong>
				{formatSeconds($gameState.harvested.seconds + $gameState.current.seconds)}
			</strong>
		</p>
	{/if}
</div>
