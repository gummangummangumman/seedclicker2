<script lang="ts">
	import { gameState } from '../store/store';
	import { format } from '../util/number_formatting';

	let isOpen = true;

	function toggleCard() {
		isOpen = !isOpen;
	}
</script>

<div class="my-8 bg-green-600" class:open={isOpen}>
	<button class="bg-green-400 py-2 w-full" on:click={toggleCard}>
		<strong>Stats</strong>
	</button>
	<div class="content">
		<p>clicks: <strong>{format($gameState.clicks)}</strong></p>
		<p>peak seeds: <strong>{format($gameState.peakLifetimeSeeds)}</strong></p>
		<p>total seeds: <strong>{format($gameState.totalLifetimeSeeds)}</strong></p>
	</div>
</div>

<style>
	.content {
		display: none;
	}

	.open .content {
		display: block;
	}
</style>
