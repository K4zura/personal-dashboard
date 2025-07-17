<script lang="ts">
	import { onMount } from 'svelte';
	import { TIMING_DURATION } from '../data/constants';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	let yIn = $state(12);
	let yOut = $state(-12);

	interface Props {
		refresh?: string | boolean;
		span?: boolean;
		transitonIn?: boolean;
		transitonOut?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		refresh = '',
		span = false,
		transitonIn = true,
		transitonOut = true,
		children
	}: Props = $props();

	onMount(() => {
		const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (isReduced) {
			yIn = 0;
			yOut = 0;
		}
	});
</script>

{#key refresh}
	<main
		class="flex flex-col gap-4 overflow-y-auto px-6 py-4 transition-all [grid-area:main] not-md:p-6"
		in:fly|global={{
			y: yIn,
			duration: transitonIn ? TIMING_DURATION : 0,
			delay: transitonIn ? TIMING_DURATION : 0,
			easing: cubicOut
		}}
		out:fly|global={{ y: yOut, duration: transitonOut ? TIMING_DURATION : 0, easing: cubicIn }}
	>
		{@render children?.()}
	</main>
{/key}

<style>
	main {
		--sb-track-color: #0000;
		--sb-thumb-color: var(--color-primary);
		--sb-size: 6px;
	}

	main::-webkit-scrollbar {
		width: var(--sb-size);
	}

	main::-webkit-scrollbar-track {
		background: var(--sb-track-color);
		border-radius: 3px;
	}

	main::-webkit-scrollbar-thumb {
		background: var(--sb-thumb-color);
		border-radius: 3px;
	}

	@supports not selector(::-webkit-scrollbar) {
		main {
			scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
		}
	}
</style>
