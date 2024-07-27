<script>
	import HarvestQuote from '../components/HarvestQuote.svelte';
</script>

<div class="my-8">
	<p>Harvest your seeds and abandon all of your earthly upgrades for deeper knowledge about the seed.</p>

	<HarvestQuote />

	<button class="p-2 border border-bg-dark bg-bg" on:click={() => alert('no')}>Harvest</button>
</div>

<style>
	p {
		margin-bottom: 2em;
	}
</style>
