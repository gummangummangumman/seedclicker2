<script lang="ts">
	import type { Item } from '../types/item';
	export let item: Item;
</script>

<div class="border border-black">
	{item.name}
	<br />
	{item.cost}
</div>
