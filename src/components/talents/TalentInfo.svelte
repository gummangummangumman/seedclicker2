<script lang="ts">
	import { buyTalent, canBuy, requirementFulfilled, talentOwned } from '../../game_logic/talentLogic';
	import { gameState } from '../../store/store';
	import type { Talent } from '../../types/talent';
	import Button from '../Button.svelte';

	interface Props {
		talent: Talent;
	}

	let { talent }: Props = $props();
</script>

<div class="h-36 p-4">
	<h1>{talent.name}</h1>
	<p class="font-bo">{talent.description}</p>
	{#if canBuy($gameState, talent)}
		<Button
			onclick={() => ($gameState = buyTalent($gameState, talent))}
			class="bg-primary p-2 px-4 mt-3 rounded-md"
		>
			Buy
		</Button>
	{:else if talentOwned($gameState, talent)}
		<p class="pt-3 text-lg">✅</p>
	{:else if !requirementFulfilled($gameState, talent)}
		<p class="pt-3 text-sm">⚠️ Requires {talent.requires} ⚠️</p>
	{:else}
		<p class="pt-3 text-sm">⚠️ You can not afford upgrading yet ⚠️</p>
	{/if}
</div>

<style>
	h1 {
		font-size: larger;
		font-weight: bold;
	}
</style>
