<script lang="ts">
	import { saveSettingsToLocationStorage } from '../game_logic/browserStorage';
	import { store } from '../store/store.svelte';
	import { ItemView, NumberFormatting, Theme } from '../types/settings';
	import { setBackground } from '../util/background';

	function handleThemeChange(event: Event) {
		store.settings.theme = (event.target as HTMLSelectElement).value;
		setBackground(store.settings.theme);
		saveSettingsToLocationStorage(store.settings);
	}

	function handleFormattingChange(event: Event) {
		store.settings.formatting = (event.target as HTMLSelectElement).value as NumberFormatting;
		saveSettingsToLocationStorage(store.settings);
	}

	function handleItemViewChange(event: Event) {
		store.settings.itemView = (event.target as HTMLSelectElement).value as ItemView;
		saveSettingsToLocationStorage(store.settings);
	}
</script>

<div class="my-8">
	<p class="italic mb-4">Settings are saved locally, they are not part of a game save.</p>
	<!-- //TODO consider making a <table> or similar to have good looking centering -->
	<p>
		<strong>Theme</strong>
		<select
			class="p-2 ml-2 border border-secondary bg-primary rounded-md"
			onchange={handleThemeChange}
			value={store.settings.theme}
		>
			<option value={Theme.System}>System 🖥️</option>
			<option value={Theme.Light}>Light 🌝</option>
			<option value={Theme.Dark}>Dark 🌚</option>
		</select>
	</p>
	<p>
		<strong>Number formatting</strong>
		<select
			class="p-2 ml-2 border border-secondary bg-primary rounded-md"
			onchange={handleFormattingChange}
			value={store.settings.formatting}
		>
			<option value={NumberFormatting.Normal}>Normal</option>
			<option value={NumberFormatting.Engineering}>Engineering 🥼</option>
		</select>
	</p>
	<p>
		<strong>Item view</strong>
		<select
			class="p-2 ml-2 border border-secondary bg-primary rounded-md"
			onchange={handleItemViewChange}
			value={store.settings.itemView}
		>
			<option value={ItemView.Picture}>With picture 🖼️</option>
			<option value={ItemView.NoPicture}>Simple number 8️⃣</option>
		</select>
	</p>
</div>

<style>
	p {
		margin-top: 0.5em;
	}
</style>
