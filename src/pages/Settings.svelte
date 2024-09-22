<script lang="ts">
	import { settings } from '../store/store';
	import { setBackground } from '../util/background';

	function handleThemeChange(event: Event) {
		$settings = (event.target as HTMLSelectElement).value;
		setBackground($settings);
	}
</script>

<div class="my-8">
	<p class="italic my-4">Settings are not stored between refreshes yet.</p>
	<p>
		Theme
		<select class="p-2 ml-2 border border-secondary bg-primary rounded-md" on:change={handleThemeChange}>
			<option value="">System 🖥️</option>
			<option value="theme-light">Light 🌝</option>
			<option value="theme-dark">Dark 🌚</option>
		</select>
	</p>
</div>
