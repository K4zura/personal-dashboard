<script lang="ts">
	import ProjectCard from '$lib/components/shared/ProjectCard.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import { AlertCircle, CalendarIcon, CheckCircle, Clock, FolderOpen } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	type Project = {
		title: string;
		description: string;
	};

	const project: Project = {
		title: 'Creation of Dashboard',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi provident autem pariatur aut ratione tempore eaque soluta sint veniam!'
	};
</script>

<h1>{$_('title')}</h1>

<h1 class="text-primary text-xl font-bold">{$_('productivity.projects.title')}</h1>

<!-- <p>{$t('greeting', { values: { name: 'Carlos' } })}</p> -->
<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard title={$_('productivity.projects.total_projects')} value="4">
		{#snippet icon()}
			<FolderOpen class="size-4 text-gray-300" />
		{/snippet}
		3 {$_('productivity.projects.active_projects').toLowerCase()}
	</StatCard>
	<StatCard title={$_('common.completed')} value="4">
		{#snippet icon()}
			<CheckCircle class="size-4 text-gray-300" />
		{/snippet}
		25% {$_('productivity.projects.completed_percent').toLowerCase()}
	</StatCard>
	<StatCard title={$_('productivity.projects.inprogress')} value="4">
		{#snippet icon()}
			<Clock class="size-4 text-gray-300" />
		{/snippet}
		{$_('productivity.projects.attention_required')}
	</StatCard>
	<StatCard title={$_('productivity.projects.delayed')} value="4">
		{#snippet icon()}
			<AlertCircle class="size-4 text-gray-300" />
		{/snippet}
		{$_('productivity.projects.need_action_urgent')}
	</StatCard>
	<!--  -->
	<!-- CARD SECTIONS -->
	<ProjectCard {project}></ProjectCard>
	<ProjectCard {project}></ProjectCard>
	<ProjectCard {project}></ProjectCard>
	<ProjectCard {project}></ProjectCard>
	<!-- <SectionCard title="Creation of Dashboard" subtitle="mini project" colSpan="">a</SectionCard> -->
</div>
