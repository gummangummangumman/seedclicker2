<script lang="ts">
	import { GAME_NAME } from '../util/constants';
	import { store } from '../store/store.svelte';
</script>

<div class="my-8 p-4 max-w-screen-sm sm:mx-auto">
	<h2>What is {GAME_NAME}?</h2>
	<p>
		{GAME_NAME} is a clicker/idle game. It is a sequel to
		<a
			class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
			target="_blank"
			href="https://gumman.one/seedclicker/"
		>
			Seedclicker</a
		>, which is a simple clicker game from ~2016. {GAME_NAME} was released almost a decade later, and is a full rewrite
		with new features. Both games are developed by
		<a
			class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
			target="_blank"
			href="https://gumman.one/">GuMMaN</a
		>.
	</p>
	<h2>What is new compared to Seedclicker?</h2>
	<ul class="list-disc list-inside">
		<li>Save files 💾</li>
		<li>Offline progress 🕒</li>
		<li>Mobile friendly design 📱</li>
		<li>Dark mode 🌙</li>
		<li>Gradual discovery of game upgrades ✨⬆️</li>
		<li>Several game features that you have to unlock by playing! 🎮🌻</li>
	</ul>
	{#if store.gameState.harvested.harvestCount > 0}
		<h2>Why is my harvest multiplier not working?</h2>
		<p>
			Harvest multiplier is not shown directly as SPS or clickpower, but it is applied. The multiplication is
			always rounded down to the nearest whole number. For example if you have a <strong>1.8</strong>
			harvest multiplier, <strong>2</strong> clickpower would only gr*nt you <strong>3</strong> seeds each click as
			opposed to 3.6.
		</p>
		<h2>What determines the harvest multiplier I get on harvesting?</h2>
		<p>Seeds collected. It doesn't matter whether they are spent on upgrades or not</p>
	{/if}
	<h2>Do I have to click with my mouse?</h2>
	<p>If you play on a computer, you can also use the space or enter key to click</p>
	<h2>Will my game collect seeds while I don't have the game open?</h2>
	<p>
		Yes, as long as you have some <span title="Seeds per second">sps</span>. You'll be greeted with a welcome screen
		upon opening the game again, saying how many seeds you've earned since last visit.
	</p>
	{#if store.gameState.harvested.talents.length > 0 || store.gameState.current.talents.length > 0}
		<h2>How do talents multiplications work?</h2>
		<p>
			Talents are always multiplicative, never additive. This means if you have 2 talents that both double your
			clickpower, you will have 4x. If you add another talent that adds 50%, you will have 4x+(50% * 4x) = 6x.
		</p>
	{/if}
	<h2>What can I do if I experience a bug?</h2>
	<p>
		You can get in touch with me on
		<a class="italic underline" href="mailto:seedclicker@gumman.one">seedclicker@gumman.one</a>, describe your bug,
		attach your game save if relevant, and I might look into it. No promises.
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
