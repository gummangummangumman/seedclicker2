<script lang="ts">
	import Item from '../components/Item.svelte';
	import { items } from '../types/item';
	import { gameState } from '../store/store';
	import type { GameState } from '../types/gameState';
	import { format } from '../util/number_formatting';

	let imgClass = 'transform: scaleX';

	function click(this: HTMLButtonElement) {
		$gameState.clicks++;
		$gameState.seeds += $gameState.clickPower;
		imgClass = getClass($gameState.clicks);
		this.blur();
	}

	function getClass(clicks: number) {
		if (Math.random() < 0.01) {
			//TODO tenk på å gjør dette i click, gi ekstra belønning osv
			return 'crazy';
		}
		return clicks % 2 == 1 ? 'flipped' : '';
	}

	setInterval(() => grantseeds(), 1000);

	function grantseeds() {
		$gameState.seeds += total_sps($gameState);
	}

	function total_sps(gameState: GameState) {
		return gameState.items.reduce(
			(accumulator, amountOfCurrentItem, index) => accumulator + items[index].sps * amountOfCurrentItem,
			0,
		);
	}
</script>

<svelte:head>
	<title>Seedclicker 2 | {$gameState.seeds}</title>
</svelte:head>

<section class="p-2 py-8 text-center bg-bg dark:bg-bg-dark">
	<button on:click={click}>
		<img src="gumman.jpg" alt="sunflower" class={'rounded-3xl ' + imgClass} />
		<h1 class="dark:text-white">Seeds: {format($gameState.seeds)}</h1>
		<h1 class="dark:text-white">Sps: {format(total_sps($gameState))}</h1>
	</button>

	<div class="grid">
		{#each items as item, index}
			<Item {item} {index} />
		{/each}
	</div>
</section>

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
