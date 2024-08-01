<script lang="ts">
	import Talent from '../components/Talent.svelte';
	import { gameState } from '../store/store';
	import type { GameState } from '../types/gameState';
	import { talentTree } from '../types/talent';
	import { format } from '../util/number_formatting';

	function getTalentCost(gameState: GameState) {
		return Math.pow(15_000_000, 1 + gameState.current.talents.length);
	}
</script>

<div class="my-8">
	<p>It costs <strong>{format(getTalentCost($gameState))}</strong> seeds to upgrade.</p>
	<div class="my-8 text-center flex space-x-4">
		{#each talentTree.specs as spec}
			<div class={`flex-1 flex flex-col`}>
				{#each spec.talents as talent}
					<Talent {talent} />
				{/each}
			</div>
		{/each}
	</div>
</div>
