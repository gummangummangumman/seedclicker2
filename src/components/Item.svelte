<script lang="ts">
	import type { Item } from '../types/item';
	export let item: Item;
</script>

<div class="border">
	{item.name}
	<br />
	{item.cost}
</div>
