<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import { canBuy, requirementFulfilled, talentOwned } from '../../game_logic/talentLogic';
	import { gameState, settings } from '../../store/store';
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

{#if !requirementFulfilled($gameState, talent) && !previouslyOwned($gameState)}
	<div></div>
{:else}
	<Button
		{onclick}
		title={getTitle($gameState)}
		class="
            {talentOwned($gameState, talent) && 'bg-secondary'}
            {canBuy($gameState, talent) && 'bg-primary'}
			mt-2 border border-black rounded-full relative
        "
	>
		<img
			src={`/talents/${talent.name.replaceAll(' ', '_').toLowerCase()}.png`}
			alt={talent.name}
			class="rounded-full {isDarkMode($settings) ? 'invert' : ''}"
		/>
		<p class="absolute text-sm leading-tight">{talent.name}</p>
	</Button>
{/if}
