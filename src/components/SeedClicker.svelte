<script lang="ts">
	import { store } from '../store/store.svelte';
	import { click, harvest_multiplier, total_clickpower, total_sps } from '../game_logic/gameLogic';
	import { format } from '../util/number_formatting';
	import { getCurrencyName, getLongSpsName, getSpsName } from '../game_logic/dailyLogic';

	function onClick(this: HTMLButtonElement) {
		click();
		this.blur();
	}

	function getClass(clicks: number) {
		/*if (Math.random() < 0.01) {
			//TODO tenk på å gjør dette i click, gi ekstra belønning osv
			return 'crazy';
		}*/
		return clicks % 2 == 1 ? 'flipped' : '';
	}
</script>

<button onclick={onClick}>
	<img
		src="{store.gameState.daily.choice}.jpg"
		width="184px"
		alt="sunflower"
		class={'rounded-3xl ' + getClass(store.gameState.current.clicks)}
	/>
	<h1>
		{getCurrencyName()}:
		<span title={store.gameState.current.seeds.toString()} class="text-base">
			{format(store.gameState.current.seeds, store.settings.formatting)}
		</span>
	</h1>
	<h1>
		<span title={getLongSpsName()}>{getSpsName()}</span>:
		<span title={total_sps().toString()} class="text-base">
			{format(total_sps(), store.settings.formatting)}
		</span>
	</h1>
	<h1>
		<span title="Clickpower">Cp</span>:
		<span title={total_clickpower().toString()} class="text-base">
			{format(total_clickpower(), store.settings.formatting)}
		</span>
	</h1>
	{#if store.gameState.harvested.seeds > 0}
		<h2 class="text-sm">
			Harvest multiplier:
			<span title={harvest_multiplier(store.gameState.harvested.seeds).toString()}
				>{format(harvest_multiplier(store.gameState.harvested.seeds), store.settings.formatting)}</span
			>
		</h2>
	{/if}
</button>

<style>
	img {
		transform: scaleX(1);
		transform: scaleY(1);
	}
	.flipped {
		transform: scaleX(-1);
	}
	.crazy {
		transform: scaleY(-1);
	}
	h1 {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
