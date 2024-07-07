<script lang="ts">
	import Item from '../components/Item.svelte';
	import { items } from '../types/item';
	import { gameState } from '../store/store';
	import { addSeeds, type GameState } from '../types/gameState';
	import { format } from '../util/number_formatting';
	import { onMount } from 'svelte';
	import Stats from '../components/Stats.svelte';

	let imgClass = 'transform: scaleX';

	function click(this: HTMLButtonElement) {
		$gameState.clicks++;
		$gameState = addSeeds($gameState, $gameState.clickPower);
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
		$gameState = addSeeds($gameState, total_sps($gameState));
	}

	function total_sps(gameState: GameState) {
		return gameState.items.reduce(
			(accumulator, amountOfCurrentItem, index) => accumulator + items[index].sps * amountOfCurrentItem[1],
			0,
		);
	}

	onMount(() => {
		document.addEventListener('keyup', (event) => {
			//midlertidig juks :^)
			switch (event.key) {
				case 'ø':
					$gameState = addSeeds($gameState, 15_000);
					break;
				case 'æ':
					$gameState = addSeeds($gameState, 500_000);
					break;
				case 'å':
					$gameState = addSeeds($gameState, 5_000_000);
					break;
			}
		});
	});
</script>

<svelte:head>
	<title>Seedclicker 2 | {format($gameState.seeds)}</title>
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

	<Stats />
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
