<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		filter?: Snippet;
		children: Snippet;
		title: string;
		subtitle: string;
		colSpan: string;
	}
	const { filter, children, title, subtitle, colSpan }: Props = $props();
</script>

<article class={`bg-surface relative flex flex-col justify-center ${colSpan} gap-4 rounded p-4`}>
	<div class="flex items-center justify-between">
		<div class="flex flex-col justify-between">
			<h2 class="text-2xl font-semibold">{title}</h2>
			<p class="text-sm text-gray-300">{subtitle}</p>
		</div>
		{@render filter?.()}
	</div>
	{@render children()}
</article>
