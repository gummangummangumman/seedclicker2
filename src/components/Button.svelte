<!--
	@component
	Wrapper class to give effect on hover and pressing.
	Hovering makes it lighter, and pressing makes it darker.

	Only difference in use compared to normal `<button>` tag is using attribute `className` rather than `class`
-->
<script lang="ts">
	export let className: string = '';
	export let disabled: boolean = false;
</script>

<button on:click class="relative {className}" {disabled} {...$$restProps}>
	{#if !disabled}
		<div
			class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-white active:bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-15
			{className.includes('rounded-full') ? 'rounded-full' : ''}"
		></div>
	{/if}
	<slot></slot>
</button>
