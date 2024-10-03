<script lang="ts">
	import { gameState, settings } from '../store/store';
	import { addSeeds, click, oneSecondPassing } from '../game_logic/gameLogic';
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
	import { HARVEST_BASE_SEEDS } from '../util/constants';
	import Settings from '../pages/Settings.svelte';
	import Faq from '../pages/Faq.svelte';
	import { setBackground } from '../util/background';

	const pages: Page[] = [
		{
			name: 'Items',
			component: Items,
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
				gameState.harvested.harvestCount > 0 || gameState.current.peakLifetimeSeeds > HARVEST_BASE_SEEDS,
		},
		{
			name: '📈',
			description: 'Stats',
			component: Stats,
		},
		{
			name: '⚙️',
			description: 'Settings',
			component: Settings,
		},
		{
			name: '❓',
			description: 'RAQ - Rarely asked questions',
			component: Faq,
		},
		{
			name: '💾',
			description: 'Save and load',
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
		setBackground($settings.theme);
		$gameState = loadFromLocalStorage();
		document.addEventListener('keyup', (event) => {
			switch (event.key) {
				case 'Enter':
				case ' ':
					$gameState = click($gameState);
					break;
				//midlertidig juks :^)
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
				case 'i':
					console.log($settings);
					break;
			}
		});
	});
</script>

<svelte:head>
	<title>Seedclicker 2 | {format($gameState.current.seeds, $settings.formatting)}</title>
</svelte:head>

<section class="p-2 py-8 text-center bg-bg text-text {$settings.theme}">
	<SeedClicker />
	<div class="my-2">
		{#each pages as page}
			{#if !page.requirement || page.requirement($gameState)}
				<button
					class="p-2 border border-secondary {currentPage == page ? 'bg-secondary' : 'hover:bg-primary'}"
					on:click={() => (currentPage = page)}
					title={page.description}
				>
					{page.name}
				</button>
			{/if}
		{/each}
	</div>

	<svelte:component this={currentPage.component} />
</section>
