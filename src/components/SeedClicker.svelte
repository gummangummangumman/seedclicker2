<script lang="ts">
	import { gameState, settings } from '../store/store';
	import { click, harvest_multiplier, total_clickpower, total_sps } from '../game_logic/gameLogic';
	import { format } from '../util/number_formatting';

	function onClick(this: HTMLButtonElement) {
		$gameState = click($gameState);
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
	<img src="gumman.jpg" alt="sunflower" class={'rounded-3xl ' + getClass($gameState.current.clicks)} />
	<h1>
		Seeds: <span title={$gameState.current.seeds.toString()}
			>{format($gameState.current.seeds, $settings.formatting)}</span
		>
	</h1>
	<h1>
		<span title="Seeds per second">Sps</span>:
		<span title={total_sps($gameState).toString()}>{format(total_sps($gameState), $settings.formatting)}</span>
	</h1>
	<h1>
		Clickpower:
		<span title={total_clickpower($gameState).toString()}
			>{format(total_clickpower($gameState), $settings.formatting)}</span
		>
	</h1>
	{#if $gameState.harvested.seeds > 0}
		<h2 class="text-sm">
			Harvest multiplier:
			<span title={harvest_multiplier($gameState.harvested.seeds).toString()}
				>{format(harvest_multiplier($gameState.harvested.seeds), $settings.formatting)}</span
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
