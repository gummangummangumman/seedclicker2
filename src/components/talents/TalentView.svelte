<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import { canBuy, requirementFulfilled, talentOwned } from '../../game_logic/talentLogic';
	import { store } from '../../store/store.svelte';
	import type { GameState } from '../../types/gameState';
	import type { Talent } from '../../types/talent';
	import { isDarkMode } from '../../util/background';
	import Button from '../Button.svelte';

	interface Props {
		talent: Talent;
		onclick: MouseEventHandler<HTMLButtonElement>;
	}

	let { talent, onclick }: Props = $props();

	function previouslyOwned(gameState: GameState): Boolean {
		return gameState.harvested.talents.includes(talent.name);
	}

	function getTitle(gameState: GameState): string | null {
		if (!requirementFulfilled(gameState, talent)) {
			return `${talent.name} - ⚠️ requires ${talent.requires}`;
		} else if (!talentOwned(gameState, talent) && !canBuy(gameState, talent)) {
			return `${talent.name} - ⚠️ can not afford`;
		}
		return talent.name;
	}
</script>

{#if !requirementFulfilled(store.gameState, talent) && !previouslyOwned(store.gameState)}
	<div></div>
{:else}
	<Button
		{onclick}
		title={getTitle(store.gameState)}
		class="
            {talentOwned(store.gameState, talent) && 'bg-secondary'}
            {canBuy(store.gameState, talent) && 'bg-primary'}
			mt-2 border border-black rounded-full relative
        "
	>
		<img
			src={`/talents/${talent.name.replaceAll(' ', '_').toLowerCase()}.png`}
			alt={talent.name}
			class="rounded-full {isDarkMode(store.settings) ? 'invert' : ''}"
		/>
		<p class="absolute text-sm leading-tight">{talent.name}</p>
	</Button>
{/if}
