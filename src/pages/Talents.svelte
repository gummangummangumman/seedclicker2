<script lang="ts">
	import EmptyTalentInfo from '../components/talents/EmptyTalentInfo.svelte';
	import TalentInfo from '../components/talents/TalentInfo.svelte';
	import TalentView from '../components/talents/TalentView.svelte';
	import { getTalentCost } from '../game_logic/talentLogic';
	import { store } from '../store/store.svelte';
	import { talentTree, type Talent } from '../types/talent';
	import { format } from '../util/number_formatting';

	let selectedTalent: Talent | null = $state(null);

	function colSpanForLevel(talents: Talent[]) {
		switch (talents.length) {
			case 1:
				return 'col-span-4';
			case 2:
				return 'col-span-2';
			case 4:
			default:
				return '';
		}
	}
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
		<div class="grid grid-cols-4 gap-x-4 gap-y-16 pb-12">
			{#each talentTree.levels as level}
				{#each level.talents as talent}
					<div class={colSpanForLevel(level.talents)}>
						<TalentView {talent} onclick={() => (selectedTalent = talent)} />
					</div>
				{/each}
			{/each}
		</div>
	</div>
</div>
