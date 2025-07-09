<script lang="ts">
	import GoalCard from '$lib/components/finance/GoalCard.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import { _ } from 'svelte-i18n';

	const t = _;

	const goals = [
		{
			title: 'House',
			color: 'red',
			category: 'Housing',
			priority: 'High',
			total: 25000,
			saved: 8500,
			monthly: 800,
			deadline: '2025-11-30'
		},
		{
			title: 'New Motorcycle',
			color: 'purple',
			category: 'Transport',
			priority: 'Low',
			total: 40000000,
			saved: 6000000,
			monthly: 1200000,
			deadline: '2024-12-31'
		},
		{
			title: 'PC Build',
			color: 'blue',
			category: 'Technology',
			priority: 'Medium',
			total: 1900000,
			saved: 1250000,
			monthly: 50000,
			deadline: '2025-12-31'
		}
	];
</script>

<h1>{$t('title')}</h1>

<h1 class="text-primary text-xl font-bold">{$t('finances.savings.title')}</h1>

<!-- <p>{$t('greeting', { values: { name: 'Carlos' } })}</p> -->
<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard title="Total Saved" value="$20000" percentage="+8.2%">vs Previous Month</StatCard>
	<StatCard title="Total Goal" value="$45000">
		<ProgressBar />
	</StatCard>
	<StatCard title="Monthly Savings" value="$2200">Sum of All Goals</StatCard>
	<StatCard title="Active Goals" value="5">0 Completed</StatCard>
	{#each goals as goal}
		<SectionCard title={goal.title} subtitle={goal.category} colSpan="sm:col-span-2">
			{#snippet filter()}{/snippet}
			<GoalCard {goal} />
		</SectionCard>
	{/each}
</div>
