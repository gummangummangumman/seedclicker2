<script lang="ts">
	import { gameState } from '../store/store';
	import { format } from '../util/number_formatting';
</script>

<div class="my-8">
	<p>clicks: <strong>{format($gameState.clicks)}</strong></p>
	<p>peak seeds: <strong>{format($gameState.peakLifetimeSeeds)}</strong></p>
	<p>total seeds: <strong>{format($gameState.totalLifetimeSeeds)}</strong></p>
	<p>Time spent playing: <strong>{format($gameState.seconds)}</strong>s</p>
</div>
