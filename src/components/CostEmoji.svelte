<!--
	@component
	The [cost emoji](https://emojipedia.org/hand-with-index-finger-and-thumb-crossed) shown as svg in normal text size.
    Need to use svg if it's not firefox since it's not supported in many OSes.
-->
<script>
	const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');
</script>

{#if isFirefox}
	🫰
{:else}
	<img src="cost-emoji.svg" alt="🫰" class="emoji" />
{/if}

<style>
	.emoji {
		display: inline-block;
		vertical-align: baseline;
		height: 1em;
		width: auto;
	}
</style>
