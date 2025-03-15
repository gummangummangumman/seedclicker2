<script lang="ts">
	import Button from '../components/Button.svelte';
	import { amountOfPlantations, cancelCrop, canPlantCrops, plantCrops } from '../game_logic/plantationLogic';
	import { store } from '../store/store.svelte';
	import { crops } from '../types/plantation';
	import { formatSeconds } from '../util/number_formatting';
	const plantationCountAsArray = new Array(amountOfPlantations()).fill(null);
	let filledArray = $derived(
		plantationCountAsArray.map((value, index) => {
			return store.gameState.current.plantedCrops[index] ?? null;
		}),
	);
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	<p>You have {amountOfPlantations()} plantation{amountOfPlantations() > 1 ? 's' : ''}.</p>

	<div id="crop-types">
		{#each crops as crop}
			{#if crop.requirement == undefined || crop.requirement()}
				<Button
					disabled={!canPlantCrops()}
					onclick={() => plantCrops(crop)}
					class="bg-primary p-2 px-4 mt-3 rounded-md border border-secondary"
				>
					<p>Plant {crop.name}</p>
					<p>⏱️ {formatSeconds(crop.growTime / 60)}</p>
				</Button>
			{/if}
		{/each}
	</div>

	<div id="plantations" class="mt-8">
		{#each filledArray as plantation, index}
			{#if plantation == null}
				<p>idle</p>
			{:else}
				<p>
					{plantation}
					<Button onclick={() => cancelCrop(index)}>cancel</Button>
				</p>
			{/if}
		{/each}
	</div>
</div>
