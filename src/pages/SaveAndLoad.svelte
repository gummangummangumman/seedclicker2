<script lang="ts">
	function hardReset() {
		alert('not implemented yet');
	}
</script>

<div class="my-8">
	<button
		class="border border-black p-2 bg-red-600"
		on:click={() => {
			if (window.confirm('Are you SURE???????')) {
				hardReset();
			}
		}}>Hard reset</button
	>
</div>
