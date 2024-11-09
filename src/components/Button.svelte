<!--
	@component
	Wrapper class to give effect on hover and pressing.
	Hovering makes it lighter, and pressing makes it darker.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		class?: string;
		disabled?: boolean;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		children?: Snippet;
		[key: string]: any;
	}
	let { class: className = '', disabled = false, onclick, children, ...rest }: Props = $props();
</script>

<button {onclick} class="relative {className}" {disabled} {...rest}>
	{#if !disabled}
		<div
			class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-white active:bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-15
			{className.includes('rounded-full') ? 'rounded-full' : ''}"
		></div>
	{/if}
	{@render children?.()}
</button>
