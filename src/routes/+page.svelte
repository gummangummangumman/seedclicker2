<script lang="ts">
	import { gameState } from '../store/store';
	import { addSeeds, click, oneSecondPassing, total_sps, type GameState } from '../types/gameState';
	import { format } from '../util/number_formatting';
	import { onMount } from 'svelte';
	import Stats from '../pages/Stats.svelte';
	import Items from '../pages/Items.svelte';
	import type { Page } from '../types/page';
	import Upgrades from '../pages/Upgrades.svelte';
	import Harvest from '../pages/Harvest.svelte';
	import SaveAndLoad from '../pages/SaveAndLoad.svelte';

	let imgClass = 'transform: scaleX';

	const pages: Page[] = [
		{
			name: 'Items',
			component: Items,
		},
		{
			name: 'Stats',
			component: Stats,
		},
		{
			name: 'Talents',
			component: Upgrades,
			requirement: (gameState: GameState) => gameState.current.peakLifetimeSeeds > 15_000_000,
		},
		{
			name: 'Harvest',
			component: Harvest,
			requirement: (gameState: GameState) =>
				gameState.harvested.harvestCount > 0 || gameState.current.peakLifetimeSeeds > 5_000,
		},
		{
			name: 'Save',
			component: SaveAndLoad,
		},
	];
	let currentPage = pages[0];

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

	setInterval(() => secondPassed(), 1000);

	function secondPassed() {
		$gameState = oneSecondPassing($gameState);
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
				case 's':
					console.log($gameState);
					break;
			}
		});
	});
</script>

<svelte:head>
	<title>Seedclicker 2 | {format($gameState.current.seeds)}</title>
</svelte:head>

<section class="p-2 py-8 text-center bg-bg dark:bg-bg-dark">
	<button on:click={onClick}>
		<img src="gumman.jpg" alt="sunflower" class={'rounded-3xl ' + imgClass} />
		<h1 class="dark:text-white">
			Seeds: <span title={$gameState.current.seeds.toString()}>{format($gameState.current.seeds)}</span>
		</h1>
		<h1 class="dark:text-white">
			Sps: <span title={total_sps($gameState).toString()}>{format(total_sps($gameState))}</span>
		</h1>
	</button>

	<div class="my-2">
		{#each pages as page}
			{#if !page.requirement || page.requirement($gameState)}
				<button
					class="p-2 border border-bg-dark {currentPage == page ? 'bg-bg-dark' : ''}"
					on:click={() => (currentPage = page)}
				>
					{page.name}
				</button>
			{/if}
		{/each}
	</div>

	<svelte:component this={currentPage.component} />
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
