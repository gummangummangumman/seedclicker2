<script lang="ts">
	import HarvestQuote from '../components/HarvestQuote.svelte';
	import { gameState } from '../store/store';
	import { items } from '../types/item';

	function harvest() {
		if (!confirm('are you sure?')) {
			return;
		}
		$gameState = {
			...$gameState,
			seeds: 0,
			peakLifetimeSeeds: 0,
			totalLifetimeSeeds: 0,
			items: items.map((item) => [item.name, 0]) as [string, number][],
			clickPower: 1,
			talents: [],
			harvested: {
				harvestCount: $gameState.harvested.harvestCount + 1,
				clicks: $gameState.harvested.clicks + $gameState.clicks,
				seeds: $gameState.harvested.seeds + $gameState.totalLifetimeSeeds,
				seconds: $gameState.harvested.seconds + $gameState.seconds,
			},
		};
	}
</script>

<div class="my-8">
	<p>Harvest your seeds and abandon all of your earthly upgrades for deeper knowledge about the seed.</p>

	<HarvestQuote />

	<button class="p-2 border border-bg-dark bg-bg" on:click={harvest} disabled={$gameState.totalLifetimeSeeds == 0}>
		Harvest
	</button>
</div>

<style>
	p {
		margin-bottom: 2em;
	}
</style>
