<script lang="ts">
	import { GAME_NAME } from '../util/constants';
	import { gameState } from '../store/store';
</script>

<div class="my-8">
	<h2>What is {GAME_NAME}?</h2>
	<p>
		{GAME_NAME} is a clicker/idle game. It is a sequel to
		<a
			class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
			target="_blank"
			href="https://gumman.one/seedclicker/"
		>
			Seedclicker</a
		>, which is a simple clicker game from ~2016. {GAME_NAME} was released almost a decade later, and is developed by
		<a
			class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
			target="_blank"
			href="https://gumman.one/">GuMMaN</a
		>.
	</p>
	<h2>What is new compared to Seedclicker?</h2>
	<ul class="list-disc list-inside">
		<li>Save files 💾</li>
		<li>Mobile friendly design 📱</li>
		<li>Dark mode 🌙</li>
		<li>Gradual discovery of game upgrades ✨⬆️</li>
		<li>Several game features that you have to unlock by playing! 🎮🌻</li>
	</ul>
	{#if $gameState.harvested.harvestCount > 0}
		<h2>Why is my harvest multiplier not working?</h2>
		<p>
			Harvest multiplier is not shown directly as SPS or clickpower, but it is applied. Additionally, the
			multiplication is always rounded down to the nearest whole number. For example if you have a <strong
				>1.8</strong
			>
			harvest multiplier, <strong>2</strong> clickpower would only gr*nt you <strong>3</strong> seed as opposed to
			3.6.
		</p>
		<h2>What determines the harvest multiplier I get on harvesting?</h2>
		<p>Seeds collected. It doesn't matter whether they are spent on upgrades or not</p>
	{/if}
	<h2>Do I have to click with my mouse?</h2>
	<p>If you play on a computer, you can also use the space or enter key to click</p>
	<h2>What can I do if I experience a bug?</h2>
	<p>
		You can get in touch with me on <a class="italic underline" href="mailto:gumman@gumman.one">gumman@gumman.one</a
		>, describe your bug and I'll see what I can do
	</p>
</div>

<style>
	h2 {
		font-weight: bold;
	}
	p,
	ul {
		margin-bottom: 2em;
	}
</style>
