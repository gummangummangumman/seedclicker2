<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import type { PlantedCrop } from '../types/plantation';
	import { formatSeconds } from '../util/number_formatting';
	import { timestampSeconds } from '../util/save';
	import Button from './Button.svelte';
	import { onDestroy } from 'svelte';

	interface Props {
		plantation: PlantedCrop | null;
		onCancel?: MouseEventHandler<HTMLButtonElement>;
		onCollect?: MouseEventHandler<HTMLButtonElement>;
	}
	let { plantation, onCancel, onCollect }: Props = $props();

	function timeLeft(grownTime: number): number {
		const diffSeconds = grownTime - timestampSeconds();
		return Math.max(0, diffSeconds);
	}

	let secondsLeft = $state(timeLeft(plantation?.finishTime ?? 0));
	const interval = setInterval(() => {
		secondsLeft = timeLeft(plantation?.finishTime ?? 0);
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="relative border rounded-lg p-1">
	{#if plantation == null}
		<p>idle</p>
	{:else}
		<div>
			<p>
				{plantation.name}
			</p>
			<br />
			{#if secondsLeft > 0}
				<div class="absolute right-1 top-1">
					<Button onclick={onCancel} class="bg-primary border border-secondary w-6 h-6 rounded-full text-sm">
						x
					</Button>
				</div>
				<p>{formatSeconds(secondsLeft)}</p>
			{:else}
				<Button onclick={onCollect}>collect</Button>
			{/if}
		</div>
	{/if}
</div>
