<script lang="ts">
	import { gameState, initialGameState } from '../store/store';

	let loadFile: HTMLInputElement;
	let loadText: HTMLTextAreaElement;

	function hardReset() {
		gameState.update(() => {
			return structuredClone(initialGameState);
		});
	}

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];

			const reader = new FileReader();

			reader.onload = () => {
				loadText.value = reader.result as string;
			};

			reader.onerror = () => {
				console.error('Could not read the file');
			};

			reader.readAsText(file);
		}
	}

	function handleTextChange() {
		loadFile.value = '';
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
		<p class="italic text-sm">
			Tip: Make a backup save every so often, especially when you've made progress you don't want to lose. Upload
			your save file to an online cloud storage or a chatting application, or anywhere accessible to you from
			several devices.
		</p>
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
			link.download = 'save.seed'; //filename
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}}
	>
		Save as file
	</button>
	<br />
	<div id="load" class="m-4 p-2 border border-black">
		<p>Load by pasting your save into the text field, or simply upload the file.</p>
		<input type="file" id="loadfile" bind:this={loadFile} on:change={handleFileChange} />
		<br />
		<textarea
			id="load_input"
			placeholder="Save file"
			bind:this={loadText}
			on:change={handleTextChange}
			class="resize my-4"
		/>
		<br />
		<button
			class="border border-black p-2"
			on:click={() => {
				const save = JSON.parse(loadText.value);
				console.log('loading save', loadText.value, save);
				alert('not implemented');
			}}
		>
			Load
		</button>
		<br />
	</div>
	<button
		class="border border-black p-2 bg-red-600"
		on:click={() => {
			if (window.confirm('Are you sure?')) {
				hardReset();
			}
		}}
	>
		Hard reset 💀
	</button>
</div>

<style>
	button {
		margin-bottom: 2em;
	}
	p {
		margin-bottom: 0.5em;
	}
</style>
