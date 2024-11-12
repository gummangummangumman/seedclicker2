<script lang="ts">
	import Button from '../components/Button.svelte';
	import { store, initialGameState, updateGameState } from '../store/store.svelte';
	import type { GameState } from '../types/gameState';
	import { hash, verifyGameSave } from '../util/hash';

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
			save = JSON.parse(loadText.value);
		} catch (e) {
			errorMessage = '⚠️ Something went wrong trying to read the save! ⚠️';
			return;
		}
		console.log('loading save', save);
		//TODO first verify that save is a proper GameState object, so that the cheating errorMessage is justifiably given
		if (!verifyGameSave(save)) {
			errorMessage = '💀 Cheating detected! 💀';
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
			browser data, change your device or browser, or you simply want to play on your computer at work and your
			phone in the weekends. This is where saving manually comes in handy.
		</p>
		<p class="italic text-sm">
			Tip: Make a backup save every so often, especially when you've made progress you don't want to lose. Upload
			your save file to an online cloud storage or a chatting application, or anywhere accessible to you from
			several devices.
		</p>
	</div>
	<Button
		class="bg-primary border border-black p-2 cursor-copy"
		onclick={() => {
			navigator.clipboard
				.writeText(JSON.stringify({ ...store.gameState, antiCheatToken: hash(store.gameState) }))
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
		class="bg-primary border border-black p-2"
		onclick={() => {
			const blob = new Blob([JSON.stringify({ ...store.gameState, antiCheatToken: hash(store.gameState) })], {
				type: 'text/plain',
			});
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
		<Button class="bg-primary border border-black p-2" disabled={!!errorMessage} onclick={load}>Load</Button>
		<br />
	</div>
	<Button
		class="border border-black p-2 bg-red-600"
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
