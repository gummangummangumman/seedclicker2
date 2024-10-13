<script lang="ts">
	import { canBuy, requirementFulfilled, talentOwned } from '../../game_logic/talentLogic';
	import { gameState, settings } from '../../store/store';
	import type { GameState } from '../../types/gameState';
	import type { Talent } from '../../types/talent';
	import { isDarkMode } from '../../util/background';
	import Button from '../Button.svelte';

	export let talent: Talent;
	export let onClick;

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

<Button
	on:click={onClick}
	title={getTitle($gameState)}
	className="
            {requirementFulfilled($gameState, talent) || previouslyOwned($gameState)
		? 'mt-2 border border-black'
		: 'hidden'}
            {talentOwned($gameState, talent) && 'bg-secondary'}
            {canBuy($gameState, talent) && 'bg-primary'}
			border rounded-full relative
        "
>
	<img
		src={`/talents/${talent.name.replaceAll(' ', '_').toLowerCase()}.png`}
		alt={talent.name}
		class="rounded-full {isDarkMode($settings) ? 'invert' : ''}"
	/>
	<p class="absolute text-sm leading-tight">{talent.name}</p>
</Button>
