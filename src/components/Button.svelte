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
		custom?: boolean;
		disabled?: boolean;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		children?: Snippet;
		[key: string]: any;
	}
	let { class: className = '', disabled = false, custom = false, onclick, children, ...rest }: Props = $props();
	const standardRounded = 'rounded-md';
	const standardStyle = 'p-2 bg-primary disabled:bg-bg border border-black ' + standardRounded;
	const roundedOptions = [
		'rounded-sm',
		'rounded-md',
		'rounded-lg',
		'rounded-xl',
		'rounded-2xl',
		'rounded-3xl',
		'rounded-full',
	];
	const rounded = custom ? roundedOptions.find((r) => className.includes(r)) : standardRounded;
</script>

<button {onclick} class="relative shadow-sm {custom ? '' : standardStyle} {className}" {disabled} {...rest}>
	{#if !disabled}
		<div
			class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-white active:bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-15
			{rounded}"
		></div>
	{/if}
	{@render children?.()}
</button>
