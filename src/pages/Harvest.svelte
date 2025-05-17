<script lang="ts">
	import Button from '../components/Button.svelte';
	import HarvestQuote from '../components/HarvestQuote.svelte';
	import { getCurrencyName } from '../game_logic/dailyLogic';
	import { harvest_multiplier } from '../game_logic/gameLogic';
	import { initialCurrentGameState } from '../game_logic/gameState';
	import { store, updateGameState } from '../store/store.svelte';
	import { format } from '../util/number_formatting';

	function harvest() {
		if (!confirm('are you sure?')) {
			return;
		}
		const gameState = store.gameState;
		updateGameState({
			...gameState,
			current: structuredClone(initialCurrentGameState),
			harvested: {
				harvestCount: gameState.harvested.harvestCount + 1,
				clicks: gameState.harvested.clicks + gameState.current.clicks,
				seeds: gameState.harvested.seeds + gameState.current.totalLifetimeSeeds,
				cropsCollected: gameState.harvested.cropsCollected + gameState.current.cropsCollected,
				seconds: gameState.harvested.seconds + gameState.current.seconds,
				talents: Array.from(new Set(gameState.harvested.talents.concat(gameState.current.talents))),
			},
		});
	}
</script>

<div class="my-8 mx-2 max-w-screen-sm sm:mx-auto">
	<p>
		Harvest your {getCurrencyName().toLowerCase()} and abandon all of your earthly upgrades for greater mastery of the
		seed.
	</p>

	<p>
		Current income multiplier is <strong>
			{format(harvest_multiplier(store.gameState.harvested.seeds), store.settings.formatting)}
		</strong>. If you harvest now, you'll have
		<strong>
			{format(
				harvest_multiplier(store.gameState.harvested.seeds + store.gameState.current.totalLifetimeSeeds),
				store.settings.formatting,
			)}
		</strong>
	</p>

	<HarvestQuote />

	<Button onclick={harvest} disabled={store.gameState.current.totalLifetimeSeeds == 0}>Harvest</Button>
</div>

<style>
	p {
		margin-bottom: 2em;
	}
</style>
