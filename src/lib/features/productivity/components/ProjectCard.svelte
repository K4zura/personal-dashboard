<script lang="ts">
	import { Badge, ProgressBar } from '$lib/ui';
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

<article class={`bg-card-bg relative flex flex-col justify-center gap-4 rounded p-4 lg:col-span-2`}>
	<div class="flex justify-between">
		<h1 class="text-lg font-semibold">{project.title}</h1>
		<Badge text="Completado" color="bg-success text-card-bg font-semibold" rounded="rounded-full" />
	</div>
	<p class="text-sm max-w-xl text-text-secondary">
		{project.description}
	</p>
	<div class="flex flex-col">
		<div class="flex justify-between text-sm font-medium">
			<span>Tareas</span>
			<span>8/16</span>
		</div>
		<ProgressBar totalSpent={5} totalBudget={10} type="number" />
	</div>
	<div class="flex items-center justify-between">
		<p class="flex gap-1 text-center">
			<Calendar class="size-4 -translate-y-0.5" />
			<span class="text-xs whitespace-nowrap">16 de Julio</span>
		</p>
		<div class="flex items-center gap-2">
			<Badge color="bg-secondary text-card-bg font-medium" rounded="rounded" text="Desarrollo" />
			<Badge color="bg-secondary text-card-bg font-medium" rounded="rounded" text="Infraestructura" />
		</div>
	</div>
	<!-- {@render children()} -->
</article>
