<script lang="ts">
	import { gameState } from '../store/store';
	import { addSeeds, oneSecondPassing } from '../game_logic/gameLogic';
	import { format } from '../util/number_formatting';
	import { onMount } from 'svelte';
	import Stats from '../pages/Stats.svelte';
	import Items from '../pages/Items.svelte';
	import type { Page } from '../types/page';
	import Talents from '../pages/Talents.svelte';
	import Harvest from '../pages/Harvest.svelte';
	import SaveAndLoad from '../pages/SaveAndLoad.svelte';
	import type { GameState } from '../types/gameState';
	import SeedClicker from '../components/SeedClicker.svelte';
	import { loadFromLocalStorage, saveToLocalStorage } from '../game_logic/browserStorage';

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
			component: Talents,
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

	setInterval(() => secondPassed(), 1000);

	function secondPassed() {
		$gameState = oneSecondPassing($gameState);
		saveToLocalStorage($gameState);
	}

	onMount(() => {
		$gameState = loadFromLocalStorage();
		document.addEventListener('keyup', (event) => {
			//midlertidig juks :^)
			switch (event.key) {
				case 'ø':
					$gameState = addSeeds($gameState, 15_000, false);
					break;
				case 'æ':
					$gameState = addSeeds($gameState, 500_000, false);
					break;
				case 'å':
					$gameState = addSeeds($gameState, 5_000_000, false);
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
	<SeedClicker />
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
