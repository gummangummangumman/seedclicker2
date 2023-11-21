<script lang="ts">
	import Item from '../components/Item.svelte';

	let seeds = 0;
	let clicks = 0;
	let imgClass = 'transform: scaleX';

	function click() {
		seeds += 1;
		clicks += 1;
		imgClass = getClass(clicks);
	}

	function getClass(clicks: number) {
		if (Math.random() < 0.01) {
			//TODO tenk på å gjør dette i click, gi ekstra belønning osv
			return 'crazy';
		}
		return clicks % 2 == 1 ? 'flipped' : '';
	}
</script>

<svelte:head>
	<title>Seedclicker 2 | {seeds}</title>
</svelte:head>

<section class="p-2 py-8 text-center">
	<button on:click={click}>
		<img src="https://gumman.one/pics/gumman.jpg" alt="sunflower" class={imgClass} />
		<h1>Seeds: {seeds}</h1>
	</button>

	<div class="grid">
		{#each { length: 3 } as _, i}
			<Item name="lmfsdg" />
		{/each}
	</div>
</section>

<style>
	img {
		transform: scaleX(1);
		transform: scaleY(1);
	}
	.flipped {
		transform: scaleX(-1);
	}

	.crazy {
		transform: scaleY(-1);
	}
</style>
