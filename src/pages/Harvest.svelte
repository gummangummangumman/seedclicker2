<script lang="ts">
	import HarvestQuote from '../components/HarvestQuote.svelte';
	import { harvest_multiplier } from '../game_logic/gameLogic';
	import { gameState, initialCurrentGameState } from '../store/store';
	import { format } from '../util/number_formatting';

	function harvest() {
		if (!confirm('are you sure?')) {
			return;
		}
		$gameState = {
			...$gameState,
			current: structuredClone(initialCurrentGameState),
			harvested: {
				harvestCount: $gameState.harvested.harvestCount + 1,
				clicks: $gameState.harvested.clicks + $gameState.current.clicks,
				seeds: $gameState.harvested.seeds + $gameState.current.totalLifetimeSeeds,
				seconds: $gameState.harvested.seconds + $gameState.current.seconds,
			},
		};
	}
</script>

<div class="my-8">
	<p>Harvest your seeds and abandon all of your earthly upgrades for deeper knowledge about the seed.</p>

	<p>
		Current income multiplier is <strong>{format(harvest_multiplier($gameState.harvested.seeds))}</strong>. If you
		harvest now, you'll have
		<strong>{format(harvest_multiplier($gameState.harvested.seeds + $gameState.current.seeds))}</strong>
	</p>

	<HarvestQuote />

	<button
		class="p-2 border bg-primary border-secondary rounded-sm"
		on:click={harvest}
		disabled={$gameState.current.totalLifetimeSeeds == 0}
	>
		Harvest
	</button>
</div>

<style>
	p {
		margin-bottom: 2em;
	}
</style>
