<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import { canBuy, requirementFulfilled, talentOwned } from '../../game_logic/talentLogic';
	import { store } from '../../store/store.svelte';
	import type { Talent } from '../../types/talent';
	import { isDarkMode } from '../../util/background';
	import Button from '../Button.svelte';

	interface Props {
		talent: Talent;
		onclick: MouseEventHandler<HTMLButtonElement>;
	}

	let { talent, onclick }: Props = $props();

	function previouslyOwned(): Boolean {
		return store.gameState.harvested.talents.includes(talent.name);
	}

	function getTitle(): string | null {
		if (!requirementFulfilled(talent)) {
			return `${talent.name} - ⚠️ requires ${talent.requires}`;
		} else if (!talentOwned(talent) && !canBuy(talent)) {
			return `${talent.name} - ⚠️ can not afford`;
		}
		return talent.name;
	}
</script>

{#if !requirementFulfilled(talent) && !previouslyOwned()}
	<div></div>
{:else}
	<Button
		{onclick}
		title={getTitle()}
		class="
            {talentOwned(talent) && 'bg-secondary'}
            {canBuy(talent) && 'bg-primary'}
			mt-2 border border-black rounded-full relative
        "
	>
		<img
			src={`/talents/${talent.name.replaceAll(' ', '_').toLowerCase()}.png`}
			alt={talent.name}
			class="rounded-full {isDarkMode(store.settings) ? 'invert' : ''}"
		/>
		<p class="absolute text-sm leading-tight">{talent.name}</p>
	</Button>
{/if}
