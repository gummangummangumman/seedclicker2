<script lang="ts">
	import Talent from '../components/Talent.svelte';
	import { getTalentCost } from '../game_logic/talentLogic';
	import { gameState, settings } from '../store/store';
	import { talentTree } from '../types/talent';
	import { format } from '../util/number_formatting';
</script>

<div class="my-8">
	<p>It costs <strong>{format(getTalentCost($gameState), $settings.formatting)}</strong> seeds to upgrade.</p>
	<div class="my-8">
		{#each talentTree.levels as level}
			<div class={`pb-2`}>
				{#each level.talents as talent}
					<Talent {talent} />
				{/each}
			</div>
		{/each}
	</div>
</div>
