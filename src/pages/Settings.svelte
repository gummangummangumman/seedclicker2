<script lang="ts">
	import { settings } from '../store/store';
	import { NumberFormatting } from '../types/settings';
	import { setBackground } from '../util/background';

	function handleThemeChange(event: Event) {
		$settings.theme = (event.target as HTMLSelectElement).value;
		setBackground($settings.theme);
	}

	function handleFormattingChange(event: Event) {
		$settings.formatting = (event.target as HTMLSelectElement).value as NumberFormatting;
	}
</script>

<div class="my-8">
	<p class="italic my-2">Settings are not stored between refreshes yet.</p>
	<p>
		Theme
		<select
			class="p-2 ml-2 border border-secondary bg-primary rounded-md"
			on:change={handleThemeChange}
			value={$settings.theme}
		>
			<option value="">System 🖥️</option>
			<option value="theme-light">Light 🌝</option>
			<option value="theme-dark">Dark 🌚</option>
		</select>
	</p>
	<p>
		Number formatting
		<select
			class="p-2 ml-2 border border-secondary bg-primary rounded-md"
			on:change={handleFormattingChange}
			value={$settings.formatting}
		>
			<option value={NumberFormatting.Normal}>{NumberFormatting.Normal}</option>
			<option value={NumberFormatting.Engineering}>{NumberFormatting.Engineering}</option>
		</select>
	</p>
</div>

<style>
	p {
		margin-top: 0.5em;
	}
</style>
