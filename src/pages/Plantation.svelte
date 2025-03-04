<script lang="ts">
	import Button from '../components/Button.svelte';
	import { store } from '../store/store.svelte';
	const plantationCount = store.gameState.current.items[5][1];
	//TODO this whole game system
</script>

<div class="my-8 max-w-screen-sm sm:mx-auto">
	<p>You have {plantationCount} plantation{plantationCount > 1 ? 's' : ''}.</p>
	<Button class="bg-primary p-2 px-4 mt-3 rounded-md border border-secondary">Pick flowers</Button>
</div>
