<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		value: string;
		percentage?: string;
		icon: Snippet;
		children: Snippet;
	}
	const { title, value, percentage, icon, children }: Props = $props();
</script>

<article class="bg-bg-secondary flex flex-col justify-start gap-1 rounded p-4">
	<div class="flex items-center justify-between">
		<h2 class="text-text text-sm font-medium">{title}</h2>
		{@render icon()}
	</div>
	<div class="flex flex-col">
		<p class="text-text text-2xl font-bold">{value}</p>
		<span class="text-xs text-green-400">{percentage}</span>
		<p class="text-text-secondary text-xs">{@render children()}</p>
	</div>
</article>
