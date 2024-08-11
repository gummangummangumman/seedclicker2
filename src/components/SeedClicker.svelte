<script lang="ts">
	import { gameState } from '../store/store';
	import { click, harvest_multiplier, total_sps } from '../game_logic/gameLogic';
	import { format } from '../util/number_formatting';

	let imgClass = 'transform: scaleX';

	function onClick(this: HTMLButtonElement) {
		$gameState = click($gameState);
		imgClass = getClass($gameState.current.clicks);
		this.blur();
	}

	function getClass(clicks: number) {
		if (Math.random() < 0.01) {
			//TODO tenk på å gjør dette i click, gi ekstra belønning osv
			return 'crazy';
		}
		return clicks % 2 == 1 ? 'flipped' : '';
	}
</script>

<button on:click={onClick}>
	<img src="gumman.jpg" alt="sunflower" class={'rounded-3xl ' + imgClass} />
	<h1 class="dark:text-white">
		Seeds: <span title={$gameState.current.seeds.toString()}>{format($gameState.current.seeds)}</span>
	</h1>
	<h1 class="dark:text-white">
		Sps: <span title={total_sps($gameState).toString()}>{format(total_sps($gameState))}</span>
	</h1>
	{#if $gameState.harvested.seeds > 0}
		<h2 class="dark:text-white text-sm">Harvest multiplier: {harvest_multiplier($gameState.harvested.seeds)}</h2>
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
