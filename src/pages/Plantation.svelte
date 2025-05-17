<script lang="ts">
	import Button from '../components/Button.svelte';
	import PlantationCrop from '../components/PlantationCrop.svelte';
	import {
		amountOfPlantations,
		cancelCrop,
		canPlantCrops,
		collectCrop,
		getGrowTime,
		plantCrops,
	} from '../game_logic/plantationLogic';
	import { store } from '../store/store.svelte';
	import { crops, type PlantedCrop } from '../types/plantation';
	import { formatSeconds } from '../util/number_formatting';
	import { timestampSeconds } from '../util/save';

	const arrayWithPlantationLength: null[] = new Array(amountOfPlantations()).fill(null);
	let plantedCrops: (PlantedCrop | null)[] = $derived(
		arrayWithPlantationLength.map((value, index) => {
			return store.gameState.current.plantedCrops[index] ?? null;
		}),
	);

	function cancel(index: number) {
		const plantedCrop = plantedCrops[index];
		if (plantedCrop == null) {
			console.warn("attempt to cancel crop index that doesn't exist: " + index);
			return;
		}
		if (timePassed(plantedCrop.plantedTime) > 180) {
			if (!window.confirm('are you sure?')) {
				return;
			}
		}
		cancelCrop(index);
	}

	function timePassed(plantedTime: number): number {
		return timestampSeconds() - plantedTime;
	}
</script>

<div class="my-8 mx-4 max-w-screen-sm sm:mx-auto">
	<p>You have {amountOfPlantations()} plantation{amountOfPlantations() > 1 ? 's' : ''}.</p>

	<div id="crop-types">
		{#each crops as crop}
			{#if crop.requirement == undefined || crop.requirement()}
				<Button disabled={!canPlantCrops()} onclick={() => plantCrops(crop)} class="px-4 mt-3 mx-1">
					<p>Plant {crop.name}</p>
					<p>⏱️ {formatSeconds(getGrowTime(crop))}</p>
				</Button>
			{/if}
		{/each}
	</div>

	<div id="plantations" class="mt-8 grid grid-cols-3 gap-4">
		{#each plantedCrops as plantation, index}
			<PlantationCrop {plantation} onCancel={() => cancel(index)} onCollect={() => collectCrop(index)} />
		{/each}
	</div>
</div>
