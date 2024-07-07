<script lang="ts">
	import Item from '../components/Item.svelte';
	import { items } from '../types/item';
</script>

{#each items as item, index}
	<Item {item} {index} />
{/each}
