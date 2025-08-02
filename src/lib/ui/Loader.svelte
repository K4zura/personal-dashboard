<script lang="ts">
	import { fade } from 'svelte/transition';

	export let unit: string = 'px';
	export let duration: string = '1.5s';
	export let size: string = '60';
	export let pause: boolean = false;
</script>

<span
	style="--size: {size}{unit}; --duration: {duration};"
	class:pause-animation={pause}
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 100 }}
>
	<div></div>
	<div></div>
	<div></div>
</span>

<style>
	span {
		width: var(--size);
		height: calc(var(--size) / 4);
		position: relative;
		display: block;
	}
	div {
		width: calc(var(--size) / 4);
		height: calc(var(--size) / 4);
		position: absolute;
		left: 0%;
		top: 0;
		border-radius: 2px;
		background: var(--color-primary);
		transform: translateX(-50%) rotate(45deg) scale(0);
		animation: diamonds var(--duration) linear infinite;
	}
	div:nth-child(1) {
		animation-delay: calc(var(--duration) * 2 / 3 * -1);
	}
	div:nth-child(2) {
		animation-delay: calc(var(--duration) * 2 / 3 * -2);
	}
	div:nth-child(3) {
		animation-delay: calc(var(--duration) * 2 / 3 * -3);
	}
	.pause-animation div {
		animation-play-state: paused;
	}

	@keyframes diamonds {
		50% {
			left: 50%;
			transform: translateX(-50%) rotate(45deg) scale(1);
		}
		100% {
			left: 100%;
			transform: translateX(-50%) rotate(45deg) scale(0);
		}
	}
</style>
