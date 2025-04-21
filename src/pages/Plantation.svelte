<script lang="ts">
	import Button from '../components/Button.svelte';
	import {
		amountOfPlantations,
		cancelCrop,
		canPlantCrops,
		collectCrop,
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

	function timeLeft(grownTime: number): number {
		const diffSeconds = grownTime - timestampSeconds();
		return Math.max(0, diffSeconds);
	}
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

	<div id="plantations" class="mt-8 grid grid-cols-3 gap-4">
		{#each plantedCrops as plantation, index}
			{#if plantation == null}
				<p>idle</p>
			{:else}
				<div>
					<p>
						{plantation.name}
					</p>
					<br />
					{#if timeLeft(plantation.finishTime) > 0}
						<Button onclick={() => cancel(index)}>cancel</Button>
						<p>{formatSeconds(timeLeft(plantation.finishTime))}</p>
					{:else}
						<Button onclick={() => collectCrop(index)}>collect</Button>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</div>
