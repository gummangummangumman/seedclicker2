<script lang="ts">
	import { store } from '../store/store.svelte';
	import { click, harvest_multiplier, total_clickpower, total_sps } from '../game_logic/gameLogic';
	import { format } from '../util/number_formatting';

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
	<img src="gumman.jpg" alt="sunflower" class={'rounded-3xl ' + getClass(store.gameState.current.clicks)} />
	<h1>
		Seeds: <span title={store.gameState.current.seeds.toString()}
			>{format(store.gameState.current.seeds, store.settings.formatting)}</span
		>
	</h1>
	<h1>
		<span title="Seeds per second">Sps</span>:
		<span title={total_sps().toString()}>{format(total_sps(), store.settings.formatting)}</span>
	</h1>
	<h1>
		<span title="Clickpower">Cp</span>:
		<span title={total_clickpower().toString()}>{format(total_clickpower(), store.settings.formatting)}</span>
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
</style>
