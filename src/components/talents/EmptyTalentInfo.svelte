<script>
	import Button from '../Button.svelte';

	const MAX_SUNFLOWER_SIZE = 50;

	let sunflowerSize = $state(16);
	let seedSymbol = $state('🌱');

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
			onclick={clickSunflower}>{seedSymbol}</Button
		>
	</p>
</div>
