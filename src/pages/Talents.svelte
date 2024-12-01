<script lang="ts">
	import EmptyTalentInfo from '../components/talents/EmptyTalentInfo.svelte';
	import TalentInfo from '../components/talents/TalentInfo.svelte';
	import TalentView from '../components/talents/TalentView.svelte';
	import { getTalentCost } from '../game_logic/talentLogic';
	import { store } from '../store/store.svelte';
	import { talentTree, type Talent } from '../types/talent';
	import { format } from '../util/number_formatting';

	let selectedTalent: Talent | null = $state(null);
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	<p>
		It costs <strong>{format(getTalentCost(), store.settings.formatting)}</strong> seeds to upgrade.
	</p>
	<div class="my-8">
		{#if selectedTalent != null}
			<TalentInfo talent={selectedTalent} />
		{:else}
			<EmptyTalentInfo />
		{/if}
		{#each talentTree.levels as level}
			<div class={`pb-12 flex justify-evenly`}>
				{#each level.talents as talent}
					<TalentView {talent} onclick={() => (selectedTalent = talent)} />
				{/each}
			</div>
		{/each}
	</div>
</div>
