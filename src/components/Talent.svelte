<script lang="ts">
	import { buyTalent, canBuy } from '../game_logic/talentLogic';
	import { gameState } from '../store/store';
	import type { GameState } from '../types/gameState';
	import type { Talent } from '../types/talent';
	export let talent: Talent;

	function owned(gameState: GameState): Boolean {
		return gameState.current.talents.includes(talent.name);
	}

	function requirementFulfilled(gameState: GameState): Boolean {
		return !talent.requires || gameState.current.talents.includes(talent.requires);
	}
</script>

<button
	disabled={!canBuy($gameState, talent)}
	on:click={() => ($gameState = buyTalent($gameState, talent))}
	class="
            {requirementFulfilled($gameState) ? 'mt-2 border border-black' : 'hidden'}
            {owned($gameState) && 'bg-bg-dark'}
        "
>
	<p>{talent.name}</p>
	<p class="text-sm">{talent.description}</p>
</button>

<style>
	button:disabled {
		border-color: gray;
	}
</style>
