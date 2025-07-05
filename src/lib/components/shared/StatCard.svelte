<script lang="ts">
	import type { Component } from 'lucide-svelte';

	export let title: string;
	export let value: string;
	export let percentage: string;
	export let icon: Component;
</script>

<article class="bg-surface flex flex-col justify-start gap-1 rounded p-4">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium">{title}</h2>
		{icon}
	</div>
	<div class="flex flex-col">
		<p class="text-2xl font-bold">{value}</p>
		<span class="text-xs text-green-400">{percentage}</span>
		<p class="text-xs text-gray-300"><slot /></p>
	</div>
</article>
