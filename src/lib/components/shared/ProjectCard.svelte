<script lang="ts">
	import type { Snippet } from 'svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { Calendar } from 'lucide-svelte';

	type Project = {
		title: string;
		description: string;
	};
	interface Props {
		project: Project;
	}
	const { project }: Props = $props();
</script>

<article class={`bg-surface relative flex flex-col justify-center gap-4 rounded p-4 lg:col-span-2`}>
	<div class="flex justify-between">
		<h1>{project.title}</h1>
		<Badge text="Completado" color="bg-success text-surface" rounded="-full" />
	</div>
	<p>
		{project.description}
	</p>
	<div class="flex flex-col">
		<div class="flex justify-between">
			<span>Tareas</span>
			<span>8/16</span>
		</div>
		<progress value="0.5"></progress>
	</div>
	<div class="flex items-center justify-between">
		<p class="flex gap-1 text-center">
			<Calendar class="size-4 -translate-y-0.5" />
			<span class="text-xs whitespace-nowrap">16 de Julio</span>
		</p>
		<div class="flex items-center gap-2">
			<Badge text="Desarrollo" />
			<Badge text="Infraestructura" />
		</div>
	</div>
	<!-- {@render children()} -->
</article>
