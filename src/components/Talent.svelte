<script lang="ts">
	import { gameState } from '../store/store';
	import type { GameState } from '../types/gameState';
	import type { Talent } from '../types/talent';
	export let talent: Talent;

	function buyTalent(gameState: GameState) {
		gameState.talents.push(talent.name);
	}

	function owned(gameState: GameState): Boolean {
		return gameState.talents.includes(talent.name);
	}

	function requirementFulfilled(gameState: GameState): Boolean {
		return !talent.requires || gameState.talents.includes(talent.requires);
	}
</script>

<button
	disabled={$gameState.talents.includes(talent.name)}
	on:click={() => buyTalent($gameState)}
	class="
            {requirementFulfilled($gameState) ? 'mt-2 border border-black' : 'hidden'}
            {owned($gameState) && 'bg-bg-dark'}
        "
>
	<p>{talent.name}</p>
	<p class="text-sm">{talent.description}</p>
</button>
