<script lang="ts">
	import TalentInfo from '../components/TalentInfo.svelte';
	import TalentView from '../components/TalentView.svelte';
	import { getTalentCost } from '../game_logic/talentLogic';
	import { gameState, settings } from '../store/store';
	import { talentTree, type Talent } from '../types/talent';
	import { format } from '../util/number_formatting';

	let selectedTalent: Talent | null = null;
</script>

<div class="my-8">
	<p>It costs <strong>{format(getTalentCost($gameState), $settings.formatting)}</strong> seeds to upgrade.</p>
	<div class="my-8">
		{#if selectedTalent != null}
			<TalentInfo talent={selectedTalent} />
		{:else}
			<div class="h-36">
				<p>Choose wisely 🌻</p>
			</div>
		{/if}
		{#each talentTree.levels as level}
			<div class={`pb-12`}>
				{#each level.talents as talent}
					<TalentView {talent} onClick={() => (selectedTalent = talent)} />
				{/each}
			</div>
		{/each}
	</div>
</div>
