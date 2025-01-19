<script lang="ts">
	import { store, updateGameState, updateSettings } from '../store/store.svelte';
	import { addSeeds, click, offlineProgress, oneSecondPassing } from '../game_logic/gameLogic';
	import { format } from '../util/number_formatting';
	import { onMount } from 'svelte';
	import Stats from '../pages/Stats.svelte';
	import Items from '../pages/Items.svelte';
	import type { Page } from '../types/page';
	import Talents from '../pages/Talents.svelte';
	import Harvest from '../pages/Harvest.svelte';
	import SaveAndLoad from '../pages/SaveAndLoad.svelte';
	import SeedClicker from '../components/SeedClicker.svelte';
	import {
		loadGameFromLocalStorage,
		loadSettingsFromLocalStorage,
		saveGameToLocalStorage,
	} from '../game_logic/browserStorage';
	import { HARVEST_BASE_SEEDS } from '../util/constants';
	import Settings from '../pages/Settings.svelte';
	import Faq from '../pages/Faq.svelte';
	import { setBackground } from '../util/background';
	import OfflineProgressPopup from '../components/OfflineProgressPopup.svelte';
	import type { OfflineProgress } from '../types/offlineProgress';

	const pages: Page[] = [
		{
			name: 'Items',
			component: Items,
		},
		{
			name: 'Talents',
			component: Talents,
			requirement: () => store.gameState.current.peakLifetimeSeeds > 15_000_000,
		},
		{
			name: 'Harvest',
			component: Harvest,
			requirement: () =>
				store.gameState.harvested.harvestCount > 0 ||
				store.gameState.current.peakLifetimeSeeds > HARVEST_BASE_SEEDS,
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
	let currentPage = $state(pages[0]);
	let offlineProgressAdded: OfflineProgress | null = $state(null);

	setInterval(() => secondPassed(), 1000);

	function secondPassed() {
		oneSecondPassing();
		saveGameToLocalStorage(store.gameState);
	}

	onMount(() => {
		updateGameState(loadGameFromLocalStorage());
		updateSettings(loadSettingsFromLocalStorage());
		setBackground(store.settings.theme);
		document.addEventListener('keyup', (event) => {
			switch (event.key) {
				case 'Enter':
				case ' ':
					click();
					break;
				//midlertidig juks :^)
				case 'ø':
					addSeeds(store.gameState, 15_000, false);
					break;
				case 'æ':
					addSeeds(store.gameState, store.gameState.current.seeds * 10, false);
					break;
				case 'å':
					addSeeds(store.gameState, 5_000_000, false);
					break;
				case 's':
					console.log($state.snapshot(store.gameState));
					break;
				case 'i':
					console.log($state.snapshot(store.settings));
					break;
			}
		});

		offlineProgressAdded = offlineProgress(store.gameState);
	});
</script>

<svelte:head>
	<title>SC 2 | {format(store.gameState.current.seeds, store.settings.formatting)}</title>
</svelte:head>

<section class="py-8 text-center bg-bg text-text {store.settings.theme}">
	<SeedClicker />
	<div class="my-2">
		{#each pages as page}
			{#if !page.requirement || page.requirement()}
				<button
					class="p-2 border border-secondary {currentPage.name == page.name
						? 'bg-secondary'
						: 'hover:bg-primary'}"
					onclick={() => (currentPage = page)}
					title={page.description}
				>
					{page.name}
				</button>
			{/if}
		{/each}
	</div>
	{#if offlineProgressAdded}
		<OfflineProgressPopup offlineProgress={offlineProgressAdded} onClose={() => (offlineProgressAdded = null)} />
	{/if}

	<currentPage.component />
</section>
