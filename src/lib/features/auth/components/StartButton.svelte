<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<button
	class="bg-button-bg group relative my-3 w-full cursor-pointer overflow-hidden rounded py-1 font-bold not-sm:text-sm sm:py-2"
>
	<p class="text-button-text relative z-10">{@render children()}</p>
	<div
		class="bg-primary-hover absolute inset-0 h-full w-0 transition-all duration-300 group-hover:w-full"
	></div>
</button>
