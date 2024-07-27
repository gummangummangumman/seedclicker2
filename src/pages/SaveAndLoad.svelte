<script lang="ts">
	import { gameState } from '../store/store';
	function hardReset() {
		alert('not implemented yet');
	}
</script>

<div class="my-8 w-full text-center">
	<div class="m-8 max-w-lg md:mx-auto">
		<p>Seedclicker 2 will do its best to save your game automatically in your browser.</p>
		<p>
			This is a convenient way to store your progress, but not the safest. For example, you might clear your
			browser data, change your device or browser, or you simply want to play on your computer at work and your
			phone in the weekends. This is where saving manually comes in handy.
		</p>
		<p>If you'd like to play on more than one device, simply change your save file.</p>
	</div>
	<button
		class="border border-black p-2 cursor-copy"
		on:click={() => {
			navigator.clipboard
				.writeText(JSON.stringify($gameState))
				.then(() => {
					console.log('Copied to clipboard successfully!');
				})
				.catch((err) => {
					console.error('Could not copy text: ', err);
				});
		}}
	>
		Save to clipboard
	</button>
	<button
		class="border border-black p-2"
		on:click={() => {
			const blob = new Blob([JSON.stringify($gameState)], { type: 'text/plain' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'seedclicker2_save.txt';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}}
	>
		Save as a text file
	</button>
	<br />
	<button
		class="border border-black p-2"
		on:click={() => {
			//TODO open textinput field
			alert('not implemented');
		}}
	>
		Load
	</button>
	<br />
	<button
		class="border border-black p-2 bg-red-600"
		on:click={() => {
			if (window.confirm('Are you SURE???????')) {
				hardReset();
			}
		}}>Hard reset</button
	>
</div>

<style>
	button {
		margin-bottom: 2em;
	}
	p {
		margin-bottom: 0.5em;
	}
</style>
