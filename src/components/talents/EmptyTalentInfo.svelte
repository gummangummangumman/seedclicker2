<script>
	import Button from '../Button.svelte';

	const MAX_SUNFLOWER_SIZE = 50;

	let sunflowerSize = 16;
	let seedSymbol = '🌱';

	function clickSunflower() {
		if (sunflowerSize < MAX_SUNFLOWER_SIZE) {
			sunflowerSize++;
		} else {
			seedSymbol = '🌻';
		}
	}
</script>

<div class="h-36">
	<p>
		Choose wisely <Button
			disabled={seedSymbol == '🌻'}
			style="font-size: {sunflowerSize}px"
			on:click={clickSunflower}>{seedSymbol}</Button
		>
	</p>
</div>
