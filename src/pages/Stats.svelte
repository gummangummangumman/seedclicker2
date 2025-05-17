<script lang="ts">
	import { getCurrencyName } from '../game_logic/dailyLogic';
	import { store } from '../store/store.svelte';
	import { format, formatSeconds } from '../util/number_formatting';
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	{#if store.gameState.harvested.harvestCount > 0}
		<h3 class="font-bold text-lg">Unharvested</h3>
	{/if}
	<p>
		Total {getCurrencyName().toLowerCase()}:
		<strong>{format(store.gameState.current.totalLifetimeSeeds, store.settings.formatting)}</strong>
	</p>
	<p>
		Peak {getCurrencyName().toLowerCase()}:
		<strong>{format(store.gameState.current.peakLifetimeSeeds, store.settings.formatting)}</strong>
	</p>
	<p>Clicks: <strong>{format(store.gameState.current.clicks, store.settings.formatting)}</strong></p>
	{#if store.gameState.current.cropsCollected > 0 || store.gameState.harvested.cropsCollected > 0}
		<p>
			Crops collected:
			<strong>
				{format(store.gameState.current.cropsCollected, store.settings.formatting)}
			</strong>
		</p>
	{/if}
	<p>Time spent playing: <strong>{formatSeconds(store.gameState.current.seconds)}</strong></p>

	{#if store.gameState.harvested.harvestCount > 0}
		<h3 class="mt-8 font-bold text-lg">All time</h3>
		<p>Harvests: <strong>{format(store.gameState.harvested.harvestCount, store.settings.formatting)}</strong></p>
		<p>
			{getCurrencyName()}:
			<strong>
				{format(
					store.gameState.harvested.seeds + store.gameState.current.totalLifetimeSeeds,
					store.settings.formatting,
				)}
			</strong>
		</p>
		<p>
			Clicks:
			<strong
				>{format(
					store.gameState.harvested.clicks + store.gameState.current.clicks,
					store.settings.formatting,
				)}</strong
			>
		</p>
		{#if store.gameState.current.cropsCollected > 0 || store.gameState.harvested.cropsCollected > 0}
			<p>
				Crops collected:
				<strong>
					{format(
						store.gameState.harvested.cropsCollected + store.gameState.current.cropsCollected,
						store.settings.formatting,
					)}
				</strong>
			</p>
		{/if}
		<p>
			Total time spent playing: <strong>
				{formatSeconds(store.gameState.harvested.seconds + store.gameState.current.seconds)}
			</strong>
		</p>
	{/if}

	{#if store.gameState.daily.totalCollections > 0}
		<p class="mt-8">Dailies collected: <strong>{store.gameState.daily.totalCollections}</strong></p>
	{/if}
</div>
