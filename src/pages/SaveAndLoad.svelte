<script lang="ts">
	import Button from '../components/Button.svelte';
	import { store, initialGameState, updateGameState } from '../store/store.svelte';
	import type { GameState } from '../types/gameState';
	import { getSave, loadSave } from '../util/save';

	let loadFile: HTMLInputElement;
	let loadText: HTMLTextAreaElement;

	let errorMessage: string = $state('');

	function hardReset() {
		updateGameState(structuredClone(initialGameState));
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
			errorMessage = '';
		}
	}

	function handleTextChange() {
		errorMessage = '';
		loadFile.value = '';
	}

	function load() {
		let save: GameState;
		try {
			save = loadSave(loadText.value);
		} catch (e: any) {
			errorMessage = e;
			return;
		}
		if (
			window.confirm(
				'Are you sure? Please note that this will remove your current progress and overwrite with your save file.',
			)
		) {
			updateGameState(save);
			loadFile.value = '';
			loadText.value = '';
		}
	}
</script>

<div class="my-8 w-full text-center">
	<div class="m-8 max-w-screen-sm sm:mx-auto">
		<p>Seedclicker 2 will do its best to save your game automatically in your browser.</p>
		<p>
			This is a convenient way to store your progress, but not the safest. For example, you might clear your
			browser data, change your device or browser, or you simply want to play on your computer at work and on your
			phone in the weekends. This is where saving manually comes in handy.
		</p>
		<p class="italic text-sm">
			Tip: Make a backup save every so often, especially when you've made progress you don't want to lose. Upload
			your save file to somewhere accessible to you from several devices, like an online cloud storage or a
			chatting application.
		</p>
	</div>
	<Button
		class="cursor-copy"
		onclick={() => {
			navigator.clipboard
				.writeText(getSave(store.gameState))
				.then(() => {
					console.log('Copied to clipboard successfully!');
				})
				.catch((err) => {
					console.error('Could not copy text: ', err);
				});
		}}
	>
		Save to clipboard
	</Button>
	<Button
		onclick={() => {
			const blob = new Blob([getSave(store.gameState)], { type: 'text/plain' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'save.seed'; //filename
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}}
	>
		Save as file
	</Button>
	<br />
	<div id="load" class="m-4 p-2 border border-secondary rounded-md">
		<p>Load by pasting your save into the text field, or simply upload the file.</p>
		<input type="file" id="loadfile" bind:this={loadFile} onchange={handleFileChange} />
		<br />
		<textarea
			id="load_input"
			placeholder="Save file"
			bind:this={loadText}
			onchange={handleTextChange}
			class="resize my-4 p-1 text-black"
		></textarea>
		<br />
		<p class="text-red-800 font-bold">
			{errorMessage}
		</p>
		<Button disabled={!!errorMessage} onclick={load}>Load</Button>
		<br />
	</div>
	<Button
		class="bg-red-600"
		onclick={() => {
			if (
				window.confirm(
					'Are you sure? It might be a good idea to save before doing this, in case you change your mind',
				)
			) {
				hardReset();
			}
		}}
	>
		💀 Hard reset 💀
	</Button>
</div>

<style>
	p {
		margin-bottom: 0.5em;
	}
</style>
