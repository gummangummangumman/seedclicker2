<script lang="ts">
	import Talent from '../components/Talent.svelte';
	import { getTalentCost } from '../game_logic/talentLogic';
	import { gameState, settings } from '../store/store';
	import { talentTree } from '../types/talent';
	import { format } from '../util/number_formatting';
</script>

<div class="my-8">
	<p>It costs <strong>{format(getTalentCost($gameState), $settings.formatting)}</strong> seeds to upgrade.</p>
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
